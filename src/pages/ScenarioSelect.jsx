import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import TopNav from '../components/TopNav'
import SproutCharacter from '../components/SproutCharacter'
import { loadBadges, getCurrentStageForScenario, computeCharacterStage } from '../data/scenarioData'

const SCENARIOS = [
  {
    id: 'event', badgeId: 'pioneer',
    icon: '⚡', badge: '活動限定', badgeColor: '#f05d4d',
    title: '活動限定體驗', subtitle: '30 秒認識有機農業的關鍵',
    desc: '完成這個小任務，一起了解有機農業為什麼受到重視。',
    interactionHint: '左右滑動 · 點選關鍵字',
    earnBadge: '體驗先鋒',
    accentColor: '#f05d4d', borderColor: '#fde9e7',
  },
  {
    id: 'member', badgeId: 'lifestyle',
    icon: '🌿', badge: '會員專屬', badgeColor: '#468f37',
    title: '會員專屬有機任務', subtitle: '從日常選擇，認識有機生活',
    desc: '你每天的消費選擇，也可能影響土地與生產方式。',
    interactionHint: '情境二選一 · 拖曳配對',
    earnBadge: '有機生活家',
    accentColor: '#468f37', borderColor: '#e2f3dc',
  },
  {
    id: 'product', badgeId: 'shopper',
    icon: '🛒', badge: '商品推薦', badgeColor: '#fec126', badgeTextColor: '#6b4800',
    title: '立即認識今日有機商品', subtitle: '選購有機商品，先看懂這幾件事',
    desc: '在購買之前，先學會看懂有機商品的重要資訊。',
    interactionHint: '點選辨識 · 情境二選一',
    earnBadge: '消費高手',
    accentColor: '#fec126', borderColor: '#fff8e0',
  },
]


export default function ScenarioSelect() {
  const navigate = useNavigate()
  const badges = loadBadges()
  const charStage = computeCharacterStage(badges)

  const handleSelect = (s) => {
    const stage = getCurrentStageForScenario(s.badgeId)
    localStorage.setItem('organic_scenario', JSON.stringify({ id: s.id, stage }))
    navigate('/knowledge/1')
  }

  return (
    <>
      <StatusBar />
      <TopNav title="選擇情境" back="/" />
      <div className="page-scroll" style={{ background: '#fff' }}>

        {/* Character message */}
        <div style={{
          margin: '16px 20px 0',
          background: '#f6fbf4', borderRadius: 12, padding: '12px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
          border: '1px solid #e2f3dc'
        }}>
          <SproutCharacter stage={charStage} size={40} />
          <p style={{ fontSize: '0.82rem', color: '#495057', lineHeight: 1.55 }}>
            今天想從哪一種任務開始？每完成一組任務，小芽芽會成長。
          </p>
        </div>

        <div style={{ padding: '16px 20px 8px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#212529', marginBottom: 4 }}>
            選擇你的體驗方式
          </h2>
          <p style={{ fontSize: '0.83rem', color: '#6c757d', lineHeight: 1.55 }}>
            3 組題組 × 3 個成長階段，完成每一階段可獲得徽章升級與折價券。
          </p>
        </div>

        <div style={{ padding: '12px 20px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {SCENARIOS.map((s, i) => {
            const currentVersion = badges[s.badgeId]?.version || 0
            const nextStage = Math.min(3, currentVersion + 1)
            const isMaxed = currentVersion >= 3

            return (
              <div
                key={s.id}
                onClick={() => handleSelect(s)}
                style={{
                  background: '#fff',
                  border: `2px solid ${s.borderColor}`,
                  borderRadius: 18, padding: '18px',
                  cursor: 'pointer', transition: '0.2s',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Interaction hint tag */}
                <div style={{
                  position: 'absolute', top: 12, right: 14,
                  background: '#f6fbf4', borderRadius: 999,
                  padding: '3px 10px', fontSize: '0.65rem',
                  color: '#468f37', fontWeight: 600, border: '1px solid #e2f3dc'
                }}>
                  {s.interactionHint}
                </div>

                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{
                    width: 48, height: 48, flexShrink: 0,
                    background: s.borderColor, borderRadius: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    {s.icon}
                  </div>
                  <div style={{ flex: 1, paddingRight: 60 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                      <span style={{
                        background: s.badgeColor, color: s.badgeTextColor || '#fff',
                        fontSize: '0.68rem', fontWeight: 700, padding: '3px 10px', borderRadius: 999
                      }}>{s.badge}</span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#6c757d' }}>No.{i + 1}</span>
                    </div>
                    <h3 style={{ fontSize: '0.97rem', fontWeight: 800, color: '#212529', marginBottom: 4, lineHeight: 1.3 }}>
                      {s.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#495057', lineHeight: 1.55 }}>{s.desc}</p>
                  </div>
                </div>

                {/* Progress + badge level + button */}
                <div style={{
                  marginTop: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <div style={{
                      background: currentVersion > 0 ? s.borderColor : '#f8f9fa',
                      border: `1.5px solid ${currentVersion > 0 ? s.accentColor : '#e9ecef'}`,
                      borderRadius: 8, padding: '5px 12px',
                      fontSize: '0.8rem', fontWeight: 700,
                      color: currentVersion > 0 ? '#212529' : '#adb5bd',
                    }}>
                      {currentVersion} / 3 完成
                    </div>
                    {currentVersion > 0 && (
                      <span style={{
                        background: '#fff8e0', color: '#6b4800',
                        fontSize: '0.7rem', fontWeight: 700,
                        padding: '4px 10px', borderRadius: 999,
                        border: '1px solid #fec126',
                      }}>
                        V{currentVersion}
                      </span>
                    )}
                  </div>
                  <div style={{
                    background: isMaxed ? '#468f37' : s.accentColor,
                    color: s.badgeTextColor || '#fff',
                    borderRadius: 999, padding: '6px 18px',
                    fontSize: '0.82rem', fontWeight: 700, flexShrink: 0,
                  }}>
                    {isMaxed ? '再挑戰 →' : currentVersion === 0 ? '開始挑戰 →' : `第 ${nextStage} 階段 →`}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Tips */}
          <div style={{
            background: '#f6fbf4', border: '1px solid #e2f3dc',
            borderRadius: 12, padding: '12px 14px',
            display: 'flex', gap: 10, alignItems: 'flex-start'
          }}>
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: '0.78rem', color: '#6c757d', lineHeight: 1.55 }}>
              每完成一個階段可獲得 <strong style={{ color: '#468f37' }}>NT$50 有機體驗折價券</strong>，
              適用於里仁、主婦聯盟。每組完成 3 階段後，小芽芽也會開花。
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
