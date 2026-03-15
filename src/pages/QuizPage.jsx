import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import TopNav from '../components/TopNav'
import ProgressBar from '../components/ProgressBar'

const QUESTIONS = [
  {
    q: '有機農業的核心原則是什麼？',
    options: [
      '使用最新型化學農藥以提升產量',
      '禁用化學農藥與合成肥料，維持生態平衡',
      '只要標示天然即符合有機標準',
      '價格越高代表越有機',
    ],
    answer: 1,
    explain: '有機農業的核心是禁止使用化學農藥與合成肥料，以自然方式耕作，維護生態系統健康。',
  },
  {
    q: '台灣有機農產品的官方認證是由哪個機關核發？',
    options: [
      '衛生福利部食藥署',
      '消費者保護委員會',
      '農業部（前農委會）',
      '環境部',
    ],
    answer: 2,
    explain: '台灣有機農產品認證依《有機農業促進法》由農業部主管，並透過第三方驗證機構辦理。',
  },
  {
    q: '以下哪個標示不等同於通過有機認證？',
    options: [
      '農業部有機農產品標章',
      'USDA Organic',
      '天然、無農藥',
      'EU Organic',
    ],
    answer: 2,
    explain: '"天然"或"無農藥"只是廣告用語，並不代表通過第三方機構的有機認證，購買時務必確認官方標章。',
  },
]

export default function QuizPage() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [wrongCount, setWrongCount] = useState(0)

  const q = QUESTIONS[current]
  const isCorrect = selected === q.answer

  const handleSelect = (i) => {
    if (confirmed) return
    setSelected(i)
  }

  const handleConfirm = () => {
    if (selected === null) return
    setConfirmed(true)
    if (selected === q.answer) {
      setScore(s => s + 1)
    } else {
      setWrongCount(c => c + 1)
    }
  }

  const handleNext = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent(c => c + 1)
      setSelected(null)
      setConfirmed(false)
    } else {
      setShowResult(true)
    }
  }

  const handleClaim = () => {
    const finalScore = score + (confirmed && isCorrect ? 0 : 0)
    if (score >= 2) {
      navigate('/task-complete', { state: { score } })
    }
  }

  if (showResult) {
    const passed = score >= 2
    return (
      <>
        <StatusBar />
        <TopNav title="問答結果" back={false} />
        <div className="page-scroll">
          <div style={{
            background: passed
              ? 'linear-gradient(135deg, #665048, #628d3d)'
              : 'linear-gradient(135deg, #c0392b, #e74c3c)',
            padding: '48px 24px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: 16 }}>
              {passed ? '🎉' : '😢'}
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginBottom: 8 }}>
              {passed ? '挑戰成功！' : '再試一次！'}
            </h2>
            <p style={{ color: passed ? '#dfeaa6' : '#ffc9c9', fontSize: '0.95rem' }}>
              {passed ? `答對 ${score} / ${QUESTIONS.length} 題，達標！` : `答對 ${score} / ${QUESTIONS.length} 題，需答對 2 題以上`}
            </p>
          </div>

          <div style={{ padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Score breakdown */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              gap: 12, textAlign: 'center'
            }}>
              {[
                { label: '答對', val: score, color: '#628d3d', bg: '#dfeaa6' },
                { label: '答錯', val: wrongCount, color: '#c0392b', bg: '#fce8ef' },
                { label: '總題數', val: QUESTIONS.length, color: '#628d3d', bg: '#eef3d8' },
              ].map(s => (
                <div key={s.label} style={{
                  background: s.bg, borderRadius: 14, padding: '16px 8px'
                }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: '0.75rem', color: '#555', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {passed ? (
              <>
                <div className="card card-pad" style={{ borderLeft: '4px solid #96b23c' }}>
                  <h4 style={{ fontWeight: 700, color: '#665048', marginBottom: 6 }}>恭喜！您已解鎖</h4>
                  <p style={{ fontSize: '0.85rem', color: '#495057' }}>
                    NT$50 有機體驗折價券，可於里仁、主婦聯盟等指定通路使用。
                  </p>
                </div>
                <button
                  className="btn btn-primary btn-full btn-lg"
                  onClick={() => navigate('/task-complete', { state: { score } })}
                >
                  領取折價券 🎁
                </button>
              </>
            ) : (
              <>
                <div className="card card-pad" style={{ borderLeft: '4px solid #c9889a' }}>
                  <h4 style={{ fontWeight: 700, color: '#c9889a', marginBottom: 6 }}>加油！</h4>
                  <p style={{ fontSize: '0.85rem', color: '#495057' }}>
                    回到知識頁重新學習，再次挑戰即可領取折價券。
                  </p>
                </div>
                <button
                  className="btn btn-secondary btn-full btn-lg"
                  onClick={() => navigate('/knowledge/1')}
                >
                  重新學習 📖
                </button>
              </>
            )}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <StatusBar />
      <TopNav title={`問答挑戰 ${current + 1} / ${QUESTIONS.length}`} back="/knowledge/2" />
      <ProgressBar step={3 + current} total={5} label={`問題 ${current + 1} / ${QUESTIONS.length}`} />

      <div className="page-scroll">
        {/* Question */}
        <div style={{
          background: 'linear-gradient(135deg, #665048, #628d3d)',
          padding: '24px 20px'
        }}>
          <div style={{
            display: 'flex', gap: 10, alignItems: 'flex-start'
          }}>
            <span style={{
              background: 'rgba(255,255,255,0.15)',
              color: '#fff', fontWeight: 800, fontSize: '0.8rem',
              borderRadius: 8, padding: '4px 10px', flexShrink: 0, marginTop: 2
            }}>Q{current + 1}</span>
            <h2 style={{
              fontSize: '1.05rem', fontWeight: 700,
              color: '#fff', lineHeight: 1.55
            }}>{q.q}</h2>
          </div>
        </div>

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Options */}
          {q.options.map((opt, i) => {
            let bg = '#fff', border = '#e9ecef', color = '#212529', icon = null
            if (confirmed) {
              if (i === q.answer) {
                bg = '#dfeaa6'; border = '#96b23c'; color = '#665048'; icon = '✅'
              } else if (i === selected && i !== q.answer) {
                bg = '#fce8ef'; border = '#c9889a'; color = '#665048'; icon = '❌'
              }
            } else if (selected === i) {
              bg = '#f5f7e8'; border = '#628d3d'; color = '#665048'
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                style={{
                  background: bg,
                  border: `2px solid ${border}`,
                  borderRadius: 14,
                  padding: '14px 16px',
                  textAlign: 'left',
                  cursor: confirmed ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: 12,
                  transition: '0.18s', width: '100%',
                  fontFamily: 'inherit'
                }}
              >
                <span style={{
                  width: 28, height: 28, flexShrink: 0,
                  borderRadius: '50%',
                  background: selected === i && !confirmed ? '#628d3d' : 'rgba(0,0,0,0.06)',
                  color: selected === i && !confirmed ? '#fff' : '#555',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700
                }}>
                  {icon || String.fromCharCode(65 + i)}
                </span>
                <span style={{ fontSize: '0.9rem', color, lineHeight: 1.45, fontWeight: 500 }}>{opt}</span>
              </button>
            )
          })}

          {/* Explanation */}
          {confirmed && (
            <div style={{
              background: isCorrect ? '#dfeaa6' : '#fce8ef',
              border: `1.5px solid ${isCorrect ? '#96b23c' : '#c9889a'}`,
              borderRadius: 14, padding: '14px 16px',
              marginTop: 4
            }}>
              <div style={{ fontWeight: 700, color: isCorrect ? '#665048' : '#665048', marginBottom: 6 }}>
                {isCorrect ? '✅ 答對了！' : '❌ 答錯了'}
              </div>
              <p style={{ fontSize: '0.83rem', color: '#495057', lineHeight: 1.55 }}>{q.explain}</p>
            </div>
          )}

          {/* Actions */}
          {!confirmed ? (
            <button
              className="btn btn-primary btn-full btn-lg"
              onClick={handleConfirm}
              disabled={selected === null}
              style={{
                marginTop: 8,
                opacity: selected === null ? 0.5 : 1,
                cursor: selected === null ? 'not-allowed' : 'pointer'
              }}
            >
              確認答案
            </button>
          ) : (
            <button
              className="btn btn-primary btn-full btn-lg"
              onClick={handleNext}
              style={{ marginTop: 8 }}
            >
              {current < QUESTIONS.length - 1 ? '下一題 →' : '查看結果 🎯'}
            </button>
          )}

          {/* Progress dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 4 }}>
            {QUESTIONS.map((_, i) => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: '50%',
                background: i < current ? '#96b23c' : i === current ? '#628d3d' : '#e9ecef',
                transition: '0.3s'
              }} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
