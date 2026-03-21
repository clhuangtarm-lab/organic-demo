import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import TopNav from '../components/TopNav'
import ProgressBar from '../components/ProgressBar'
import { getScenarioData } from '../data/scenarioData'

// ──────────────────────────────────────────────
// QuizPage: reads scenario, renders 2 questions
// ──────────────────────────────────────────────
export default function QuizPage() {
  const navigate = useNavigate()
  const scenario = getScenarioData()
  const questions = scenario.quiz
  const [qIdx, setQIdx] = useState(0)
  const [scores, setScores] = useState([])

  const handleQuestionDone = (passed) => {
    const next = [...scores, passed]
    setScores(next)
    if (qIdx < questions.length - 1) {
      setQIdx(i => i + 1)
    } else {
      // all done — go to task complete
      const totalScore = next.filter(Boolean).length
      navigate('/task-complete', { state: { score: totalScore, total: questions.length } })
    }
  }

  const q = questions[qIdx]
  const stepBase = 3 // progress step starts at 3

  return (
    <>
      <StatusBar />
      <TopNav title={`互動任務 ${qIdx + 1} / ${questions.length}`} back="/knowledge/2" />
      <ProgressBar
        step={stepBase + qIdx}
        total={5}
        label={`任務 ${qIdx + 1} / ${questions.length}`}
      />

      {q.type === 'swipe'       && <SwipeQuestion q={q} onDone={handleQuestionDone} />}
      {q.type === 'keyword'     && <KeywordQuestion q={q} onDone={handleQuestionDone} />}
      {q.type === 'scenario2'   && <Scenario2Question q={q} onDone={handleQuestionDone} />}
      {q.type === 'drag'        && <DragQuestion q={q} onDone={handleQuestionDone} />}
      {q.type === 'multiselect' && <MultiselectQuestion q={q} onDone={handleQuestionDone} />}
    </>
  )
}

// ──────────────────────────────────────────────
// SWIPE — 左右判斷
// ──────────────────────────────────────────────
function SwipeQuestion({ q, onDone }) {
  const [cardIdx, setCardIdx] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [userAnswer, setUserAnswer] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [allDone, setAllDone] = useState(false)
  const [doneScores, setDoneScores] = useState([]) // per card result

  const card = q.cards[cardIdx]
  const isCorrect = userAnswer === card?.answer

  const handleAnswer = (val) => {
    if (revealed) return
    setUserAnswer(val)
    setRevealed(true)
  }

  const handleNext = () => {
    const correct = userAnswer === card.answer
    const newCount = correctCount + (correct ? 1 : 0)
    const newScores = [...doneScores, correct]
    setCorrectCount(newCount)
    setDoneScores(newScores)

    if (cardIdx < q.cards.length - 1) {
      setCardIdx(i => i + 1)
      setRevealed(false)
      setUserAnswer(null)
    } else {
      setAllDone(true)
    }
  }

  if (allDone) {
    const passed = correctCount >= Math.ceil(q.cards.length / 2)
    return (
      <div className="page-scroll" style={{ background: '#fff', padding: '28px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>
            {passed ? '🎉' : '💪'}
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#212529', marginBottom: 6 }}>
            {passed ? '判斷成功！' : '還不錯！'}
          </h3>
          <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>
            答對 <strong style={{ color: '#468f37' }}>{correctCount}</strong> / {q.cards.length} 題
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {q.cards.map((c, i) => (
            <div key={i} style={{
              display: 'flex', gap: 10, alignItems: 'center',
              padding: '10px 14px', borderRadius: 10,
              background: doneScores[i] ? '#e2f3dc' : '#fde9e7',
              border: `1px solid ${doneScores[i] ? '#c6e8bc' : '#f8c6bf'}`
            }}>
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>{doneScores[i] ? '✅' : '❌'}</span>
              <span style={{ fontSize: '0.83rem', color: '#212529', lineHeight: 1.45 }}>{c.text}</span>
              <span style={{
                marginLeft: 'auto', flexShrink: 0, fontSize: '0.75rem', fontWeight: 700,
                color: c.answer ? '#468f37' : '#f05d4d'
              }}>
                {c.answer ? '正確' : '不正確'}
              </span>
            </div>
          ))}
        </div>

        <button className="btn btn-primary btn-full btn-lg" onClick={() => onDone(passed)}>
          {passed ? '繼續下一題 →' : '繼續下一題 →'}
        </button>
      </div>
    )
  }

  return (
    <div className="page-scroll" style={{ background: '#fff' }}>
      {/* Header */}
      <div style={{
        background: '#f6fbf4', padding: '20px 20px 16px',
        borderBottom: '1px solid #e2f3dc'
      }}>
        <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#212529', marginBottom: 4 }}>
          {q.title}
        </h3>
        <p style={{ fontSize: '0.78rem', color: '#6c757d' }}>{q.subtitle}</p>
      </div>

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
          {q.cards.map((_, i) => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: '50%',
              background: i < cardIdx ? '#468f37' : i === cardIdx ? '#fec126' : '#e9ecef',
              transition: '0.3s'
            }} />
          ))}
        </div>

        {/* Counter */}
        <div style={{ textAlign: 'center' }}>
          <span style={{
            background: '#e2f3dc', color: '#468f37',
            borderRadius: 999, padding: '4px 14px',
            fontSize: '0.78rem', fontWeight: 700
          }}>
            {cardIdx + 1} / {q.cards.length}
          </span>
        </div>

        {/* Swipe card */}
        <div className={`swipe-card ${revealed ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
          <p style={{
            fontSize: '1rem', fontWeight: 600, color: '#212529',
            lineHeight: 1.6, textAlign: 'center'
          }}>
            {card.text}
          </p>
        </div>

        {/* Feedback */}
        {revealed && (
          <div style={{
            textAlign: 'center',
            padding: '12px 16px',
            borderRadius: 12,
            background: isCorrect ? '#e2f3dc' : '#fde9e7',
            border: `1.5px solid ${isCorrect ? '#468f37' : '#f05d4d'}`
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>
              {isCorrect ? '✅' : '❌'}
            </div>
            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#212529' }}>
              這句話是
              <strong style={{ color: card.answer ? '#468f37' : '#f05d4d' }}>
                {card.answer ? '「正確」' : '「不正確」'}
              </strong>
            </p>
          </div>
        )}

        {/* Action buttons */}
        {!revealed ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <button
              onClick={() => handleAnswer(false)}
              style={{
                padding: '16px', borderRadius: 14,
                border: '2px solid #f05d4d', background: '#fff',
                cursor: 'pointer', fontWeight: 700, fontSize: '1rem',
                color: '#f05d4d', transition: '0.18s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>✗</span>
              <span>不正確</span>
            </button>
            <button
              onClick={() => handleAnswer(true)}
              style={{
                padding: '16px', borderRadius: 14,
                border: '2px solid #468f37', background: '#fff',
                cursor: 'pointer', fontWeight: 700, fontSize: '1rem',
                color: '#468f37', transition: '0.18s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>✓</span>
              <span>正確</span>
            </button>
          </div>
        ) : (
          <button className="btn btn-primary btn-full btn-lg" onClick={handleNext}>
            {cardIdx < q.cards.length - 1 ? '下一張 →' : '查看結果'}
          </button>
        )}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// KEYWORD — 點選關鍵字
// ──────────────────────────────────────────────
function KeywordQuestion({ q, onDone }) {
  // filled: array of length blanks.length, each is option text or null
  const [filled, setFilled] = useState(Array(q.blanks.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const usedOptions = filled.filter(Boolean)
  const allFilled = filled.every(Boolean)

  const handleOptionClick = (opt) => {
    if (submitted) return
    if (usedOptions.includes(opt)) return
    // fill the next empty slot
    const nextEmpty = filled.findIndex(f => f === null)
    if (nextEmpty === -1) return
    const next = [...filled]
    next[nextEmpty] = opt
    setFilled(next)
  }

  const handleBlankClick = (i) => {
    if (submitted) return
    const next = [...filled]
    next[i] = null
    setFilled(next)
  }

  const handleSubmit = () => {
    if (!allFilled) return
    setSubmitted(true)
  }

  const results = filled.map((f, i) => f === q.blanks[i])
  const allCorrect = results.every(Boolean)

  // Rebuild template: q.template is array alternating text / blank-placeholder ('')
  // blanks occur at odd indices in the template array (indices 1,3,5,...)
  const blankIndices = []
  let blankCounter = 0
  const templateParts = q.template.map((part, i) => {
    if (part === '') {
      const idx = blankCounter++
      blankIndices.push(idx)
      return { type: 'blank', idx }
    }
    return { type: 'text', text: part }
  })

  if (submitted) {
    return (
      <div className="page-scroll" style={{ background: '#fff' }}>
        <div style={{ padding: '24px 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>
              {allCorrect ? '🎉' : '💡'}
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#212529', marginBottom: 6 }}>
              {allCorrect ? '完全正確！' : '答案揭曉'}
            </h3>
          </div>

          {/* Show correct sentence */}
          <div style={{
            background: '#e2f3dc', border: '1.5px solid #468f37',
            borderRadius: 14, padding: '16px 18px', marginBottom: 20,
            fontSize: '0.92rem', color: '#212529', lineHeight: 2
          }}>
            {templateParts.map((part, i) => {
              if (part.type === 'text') return <span key={i}>{part.text}</span>
              const correctAns = q.blanks[part.idx]
              const userAns = filled[part.idx]
              const correct = userAns === correctAns
              return (
                <span key={i} style={{
                  background: correct ? '#468f37' : '#f05d4d',
                  color: '#fff', padding: '2px 10px', borderRadius: 6,
                  margin: '0 2px', fontWeight: 700
                }}>
                  {correctAns}
                </span>
              )
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {filled.map((f, i) => (
              <div key={i} style={{
                display: 'flex', gap: 8, alignItems: 'center',
                padding: '8px 12px', borderRadius: 10,
                background: results[i] ? '#e2f3dc' : '#fde9e7'
              }}>
                <span>{results[i] ? '✅' : '❌'}</span>
                <span style={{ fontSize: '0.82rem', color: '#6c757d' }}>空格 {i + 1}：</span>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#212529' }}>
                  {q.blanks[i]}
                </span>
              </div>
            ))}
          </div>

          <button className="btn btn-primary btn-full btn-lg" onClick={() => onDone(allCorrect)}>
            繼續 →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-scroll" style={{ background: '#fff' }}>
      {/* Header */}
      <div style={{
        background: '#f6fbf4', padding: '20px 20px 16px',
        borderBottom: '1px solid #e2f3dc'
      }}>
        <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#212529', marginBottom: 4 }}>
          {q.title}
        </h3>
        <p style={{ fontSize: '0.78rem', color: '#6c757d' }}>{q.subtitle}</p>
      </div>

      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Sentence with blanks */}
        <div style={{
          background: '#fff', border: '1.5px solid #e2f3dc',
          borderRadius: 14, padding: '20px 16px',
          fontSize: '0.92rem', lineHeight: 2.2, color: '#212529'
        }}>
          {templateParts.map((part, i) => {
            if (part.type === 'text') return <span key={i}>{part.text}</span>
            const val = filled[part.idx]
            return (
              <span
                key={i}
                className={`keyword-blank ${val ? '' : 'empty'}`}
                onClick={() => val && handleBlankClick(part.idx)}
                style={{ cursor: val ? 'pointer' : 'default' }}
              >
                {val || '　　　　'}
              </span>
            )
          })}
        </div>

        {/* Hint */}
        <p style={{ fontSize: '0.78rem', color: '#6c757d' }}>
          點選下方詞語依序填入 → 點選已填入的詞語可取消
        </p>

        {/* Option chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              className={`keyword-option ${usedOptions.includes(opt) ? 'used' : ''}`}
              onClick={() => handleOptionClick(opt)}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Submit */}
        <button
          className="btn btn-primary btn-full btn-lg"
          onClick={handleSubmit}
          disabled={!allFilled}
          style={{ marginTop: 8 }}
        >
          確認答案
        </button>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// SCENARIO2 — 情境式二選一
// ──────────────────────────────────────────────
function Scenario2Question({ q, onDone }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  const handleSelect = (i) => {
    if (revealed) return
    setSelected(i)
  }

  const handleConfirm = () => {
    if (selected === null) return
    setRevealed(true)
  }

  const opt = selected !== null ? q.options[selected] : null

  return (
    <div className="page-scroll" style={{ background: '#fff' }}>
      {/* Header */}
      <div style={{
        background: '#fff8e0', padding: '20px 20px 16px',
        borderBottom: '1px solid #fec126'
      }}>
        <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#212529', marginBottom: 6 }}>
          {q.title}
        </h3>
        <div style={{
          background: '#fff', borderRadius: 10, padding: '12px 14px',
          border: '1px solid #fde9bc', fontSize: '0.9rem', color: '#495057', lineHeight: 1.6
        }}>
          📍 {q.scenario}
        </div>
      </div>

      <div style={{ padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Options */}
        {q.options.map((opt, i) => {
          let bg = '#fff', border = '#e9ecef', color = '#212529'
          if (selected === i && !revealed) { bg = '#fff8e0'; border = '#fec126' }
          if (revealed && selected === i) {
            bg = opt.isCorrect ? '#e2f3dc' : '#fde9e7'
            border = opt.isCorrect ? '#468f37' : '#f05d4d'
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              style={{
                background: bg, border: `2px solid ${border}`,
                borderRadius: 16, padding: '18px 16px',
                textAlign: 'left', cursor: revealed ? 'default' : 'pointer',
                transition: '0.18s', width: '100%', fontFamily: 'inherit'
              }}
            >
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: selected === i ? (revealed ? (opt.isCorrect ? '#468f37' : '#f05d4d') : '#fec126') : '#f0f0f0',
                  color: selected === i ? '#fff' : '#6c757d',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', fontWeight: 800
                }}>
                  {revealed && selected === i ? (opt.isCorrect ? '✓' : '✗') : opt.label}
                </span>
                <span style={{ fontSize: '0.9rem', color, lineHeight: 1.55, fontWeight: 500 }}>
                  {opt.text}
                </span>
              </div>
            </button>
          )
        })}

        {/* Feedback */}
        {revealed && opt && (
          <div style={{
            background: opt.isCorrect ? '#e2f3dc' : '#fde9e7',
            border: `1.5px solid ${opt.isCorrect ? '#468f37' : '#f05d4d'}`,
            borderRadius: 12, padding: '14px 16px'
          }}>
            <div style={{
              fontWeight: 700, color: '#212529', marginBottom: 6, fontSize: '0.9rem'
            }}>
              {opt.isCorrect ? '✅ 很棒的選擇！' : '💡 換個角度想想'}
            </div>
            <p style={{ fontSize: '0.83rem', color: '#495057', lineHeight: 1.6 }}>
              {opt.feedback}
            </p>
          </div>
        )}

        {/* Buttons */}
        {!revealed ? (
          <button
            className="btn btn-primary btn-full btn-lg"
            onClick={handleConfirm}
            disabled={selected === null}
            style={{ marginTop: 8 }}
          >
            確認選擇
          </button>
        ) : (
          <button
            className="btn btn-primary btn-full btn-lg"
            onClick={() => onDone(opt?.isCorrect ?? false)}
            style={{ marginTop: 8 }}
          >
            繼續 →
          </button>
        )}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// DRAG — 拖曳配對 (click-based)
// ──────────────────────────────────────────────
function DragQuestion({ q, onDone }) {
  // shuffled right items
  const shuffled = useMemo(() => {
    const arr = q.pairs.map((p, i) => ({ text: p.right, origIdx: i }))
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [])

  const [leftActive, setLeftActive] = useState(null)  // index of selected left item
  const [matches, setMatches] = useState({})           // leftIdx → shuffled right idx
  const [submitted, setSubmitted] = useState(false)

  const matchedRight = Object.values(matches)

  const handleLeftClick = (i) => {
    if (submitted) return
    if (leftActive === i) { setLeftActive(null); return }
    setLeftActive(i)
  }

  const handleRightClick = (shuffledIdx) => {
    if (submitted) return
    if (leftActive === null) return

    // if this right is already matched to same left → unmatch
    const existingLeft = Object.entries(matches).find(([, rv]) => rv === shuffledIdx)
    if (existingLeft && parseInt(existingLeft[0]) === leftActive) {
      const next = { ...matches }
      delete next[leftActive]
      setMatches(next)
      setLeftActive(null)
      return
    }

    // remove any existing match for this left
    const next = { ...matches }
    // also remove if right was matched to another left
    Object.keys(next).forEach(k => { if (next[k] === shuffledIdx) delete next[k] })
    next[leftActive] = shuffledIdx
    setMatches(next)
    setLeftActive(null)
  }

  const handleRemoveMatch = (leftIdx) => {
    if (submitted) return
    const next = { ...matches }
    delete next[leftIdx]
    setMatches(next)
  }

  const allMatched = Object.keys(matches).length === q.pairs.length

  const handleSubmit = () => {
    if (!allMatched) return
    setSubmitted(true)
  }

  // Check results
  const results = q.pairs.map((pair, i) => {
    const rightShuffledIdx = matches[i]
    if (rightShuffledIdx === undefined) return false
    return shuffled[rightShuffledIdx].origIdx === i
  })
  const allCorrect = results.every(Boolean)

  if (submitted) {
    return (
      <div className="page-scroll" style={{ background: '#fff', padding: '24px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>
            {allCorrect ? '🎉' : '💡'}
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#212529', marginBottom: 6 }}>
            {allCorrect ? '全部配對正確！' : '答案揭曉'}
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {q.pairs.map((pair, i) => (
            <div key={i} style={{
              display: 'flex', gap: 10, alignItems: 'center',
              padding: '12px 14px', borderRadius: 12,
              background: results[i] ? '#e2f3dc' : '#fde9e7',
              border: `1px solid ${results[i] ? '#c6e8bc' : '#f8c6bf'}`
            }}>
              <span>{results[i] ? '✅' : '❌'}</span>
              <div style={{ flex: 1, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{
                  background: '#468f37', color: '#fff',
                  padding: '3px 10px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 700
                }}>{pair.left}</span>
                <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>→</span>
                <span style={{ fontSize: '0.83rem', color: '#212529', fontWeight: 500 }}>
                  {pair.right}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-primary btn-full btn-lg" onClick={() => onDone(allCorrect)}>
          繼續 →
        </button>
      </div>
    )
  }

  return (
    <div className="page-scroll" style={{ background: '#fff' }}>
      {/* Header */}
      <div style={{
        background: '#f6fbf4', padding: '20px 20px 16px',
        borderBottom: '1px solid #e2f3dc'
      }}>
        <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#212529', marginBottom: 4 }}>
          {q.title}
        </h3>
        <p style={{ fontSize: '0.78rem', color: '#6c757d' }}>{q.subtitle}</p>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Status hint */}
        {leftActive !== null && (
          <div style={{
            background: '#fff8e0', border: '1px solid #fec126',
            borderRadius: 10, padding: '10px 14px',
            fontSize: '0.82rem', color: '#6b4800', fontWeight: 600
          }}>
            已選：「{q.pairs[leftActive].left}」→ 點選右欄配對
          </div>
        )}

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{
              fontSize: '0.72rem', fontWeight: 700, color: '#6c757d',
              marginBottom: 2, textAlign: 'center'
            }}>概念</div>
            {q.pairs.map((pair, i) => {
              const isMatched = i in matches
              const isActive = leftActive === i
              return (
                <div
                  key={i}
                  className={`match-item ${isActive ? 'active' : ''} ${isMatched && !isActive ? 'matched' : ''}`}
                  onClick={() => isMatched ? handleRemoveMatch(i) : handleLeftClick(i)}
                >
                  {pair.left}
                  {isMatched && <div style={{ fontSize: '0.65rem', color: '#468f37', marginTop: 3 }}>
                    ✓ 已配對
                  </div>}
                </div>
              )
            })}
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{
              fontSize: '0.72rem', fontWeight: 700, color: '#6c757d',
              marginBottom: 2, textAlign: 'center'
            }}>說明</div>
            {shuffled.map((item, si) => {
              const isUsed = matchedRight.includes(si)
              // find which left it's matched to
              const matchedLeft = Object.entries(matches).find(([, rv]) => rv === si)
              return (
                <div
                  key={si}
                  className={`match-item ${isUsed ? 'matched' : ''} ${leftActive !== null && !isUsed ? 'active' : ''}`}
                  onClick={() => handleRightClick(si)}
                  style={{ cursor: leftActive !== null ? 'pointer' : isUsed ? 'pointer' : 'default' }}
                >
                  {item.text}
                  {isUsed && matchedLeft && (
                    <div style={{ fontSize: '0.65rem', color: '#468f37', marginTop: 3 }}>
                      ← {q.pairs[parseInt(matchedLeft[0])].left}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <button
          className="btn btn-primary btn-full btn-lg"
          onClick={handleSubmit}
          disabled={!allMatched}
        >
          確認配對
        </button>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// MULTISELECT — 多選辨識
// ──────────────────────────────────────────────
function MultiselectQuestion({ q, onDone }) {
  const [selected, setSelected] = useState(new Set())
  const [submitted, setSubmitted] = useState(false)

  const toggle = (i) => {
    if (submitted) return
    const next = new Set(selected)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    setSelected(next)
  }

  const handleSubmit = () => {
    if (selected.size === 0) return
    setSubmitted(true)
  }

  const correctSet = new Set(q.options.map((o, i) => o.correct ? i : -1).filter(i => i >= 0))
  const isAllCorrect = submitted && [...correctSet].every(i => selected.has(i)) &&
    [...selected].every(i => correctSet.has(i))

  return (
    <div className="page-scroll" style={{ background: '#fff' }}>
      {/* Header */}
      <div style={{
        background: '#f6fbf4', padding: '20px 20px 16px',
        borderBottom: '1px solid #e2f3dc'
      }}>
        <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#212529', marginBottom: 4 }}>
          {q.title}
        </h3>
        <p style={{ fontSize: '0.78rem', color: '#6c757d' }}>{q.subtitle}</p>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Option grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {q.options.map((opt, i) => {
            let bg = '#fff', border = '#e9ecef', color = '#212529'
            if (!submitted && selected.has(i)) {
              bg = '#e2f3dc'; border = '#468f37'; color = '#2f6624'
            }
            if (submitted) {
              if (opt.correct && selected.has(i)) { bg = '#e2f3dc'; border = '#468f37'; color = '#2f6624' }
              else if (!opt.correct && selected.has(i)) { bg = '#fde9e7'; border = '#f05d4d'; color = '#b53a2c' }
              else if (opt.correct && !selected.has(i)) { bg = '#fff8e0'; border = '#fec126'; color = '#6b4800' }
            }
            return (
              <button
                key={i}
                onClick={() => toggle(i)}
                style={{
                  padding: '10px 18px', borderRadius: 999,
                  border: `2px solid ${border}`, background: bg, color,
                  cursor: submitted ? 'default' : 'pointer',
                  fontFamily: 'inherit', fontSize: '0.88rem', fontWeight: 600,
                  transition: '0.18s', display: 'flex', alignItems: 'center', gap: 6
                }}
              >
                {submitted && opt.correct && selected.has(i) && <span>✅</span>}
                {submitted && !opt.correct && selected.has(i) && <span>❌</span>}
                {submitted && opt.correct && !selected.has(i) && <span>💡</span>}
                {!submitted && selected.has(i) && <span>✓</span>}
                {opt.text}
              </button>
            )
          })}
        </div>

        {submitted && (
          <div style={{
            background: isAllCorrect ? '#e2f3dc' : '#fde9e7',
            border: `1.5px solid ${isAllCorrect ? '#468f37' : '#f05d4d'}`,
            borderRadius: 12, padding: '14px 16px'
          }}>
            <div style={{ fontWeight: 700, color: '#212529', marginBottom: 6 }}>
              {isAllCorrect ? '✅ 全部正確！' : '💡 正確答案如下'}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {q.options.filter(o => o.correct).map((o, i) => (
                <span key={i} style={{
                  background: '#468f37', color: '#fff',
                  padding: '3px 12px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 700
                }}>✓ {o.text}</span>
              ))}
            </div>
          </div>
        )}

        {!submitted ? (
          <button
            className="btn btn-primary btn-full btn-lg"
            onClick={handleSubmit}
            disabled={selected.size === 0}
          >
            確認選擇
          </button>
        ) : (
          <button
            className="btn btn-primary btn-full btn-lg"
            onClick={() => onDone(isAllCorrect)}
          >
            繼續 →
          </button>
        )}
      </div>
    </div>
  )
}
