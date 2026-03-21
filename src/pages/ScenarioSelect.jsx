import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import TopNav from '../components/TopNav'
import GeoIcon from '../components/GeoIcon'
import SproutCharacter from '../components/SproutCharacter'
import { loadCharacterStage } from '../data/scenarioData'

const SCENARIOS = [
  {
    id: 'event',
    icon: '⚡',
    badge: '活動限定',
    badgeColor: '#f05d4d',
    title: '活動限定體驗',
    subtitle: '30 秒認識有機農業的關鍵',
    desc: '完成這個小任務，一起了解有機農業為什麼受到重視。',
    interactionHint: '左右滑動 · 點選關鍵字',
    earnBadge: '體驗先鋒',
    accentColor: '#f05d4d',
    borderColor: '#fde9e7',
    bg: '#fff',
  },
  {
    id: 'member',
    icon: '🌿',
    badge: '會員專屬',
    badgeColor: '#468f37',
    title: '會員專屬有機任務',
    subtitle: '從日常選擇，認識有機生活',
    desc: '你每天的消費選擇，也可能影響土地與生產方式。',
    interactionHint: '情境二選一 · 拖曳配對',
    earnBadge: '有機生活家',
    accentColor: '#468f37',
    borderColor: '#e2f3dc',
    bg: '#fff',
  },
  {
    id: 'product',
    icon: '🛒',
    badge: '商品推薦',
    badgeColor: '#fec126',
    badgeTextColor: '#6b4800',
    title: '立即認識今日有機商品',
    subtitle: '選購有機商品，先看懂這幾件事',
    desc: '在購買之前，先學會看懂有機商品的重要資訊。',
    interactionHint: '點選辨識 · 情境二選一',
    earnBadge: '消費高手',
    accentColor: '#fec126',
    borderColor: '#fff8e0',
    bg: '#fff',
  },
]

export default function ScenarioSelect() {
  const navigate = useNavigate()
  const charStage = loadCharacterStage()

  const handleSelect = (s) => {
    localStorage.setItem('organic_scenario', JSON.stringify({ id: s.id }))
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
            今天想從哪一種任務開始？每完成一次任務，我都會長大唷。
          </p>
        </div>

        <div style={{ padding: '16px 20px 8px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#212529', marginBottom: 6 }}>
            選擇你的體驗方式
          </h2>
          <p style={{ fontSize: '0.83rem', color: '#6c757d', lineHeight: 1.55 }}>
            三種情境各有不同題組與徽章，完成後均可獲得折價券。
          </p>
        </div>

        <div style={{ padding: '12px 20px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {SCENARIOS.map((s, i) => (
            <div
              key={s.id}
              onClick={() => handleSelect(s)}
              style={{
                background: s.bg,
                border: `2px solid ${s.borderColor}`,
                borderRadius: 18,
                padding: '18px',
                cursor: 'pointer',
                transition: '0.2s',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* top row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                {/* icon */}
                <div style={{
                  width: 48, height: 48, flexShrink: 0,
                  background: s.borderColor, borderRadius: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  {s.icon}
                </div>

                <div style={{ flex: 1 }}>
                  {/* badge + number */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span style={{
                      background: s.badgeColor, color: s.badgeTextColor || '#fff',
                      fontSize: '0.68rem', fontWeight: 700,
                      padding: '3px 10px', borderRadius: 999
                    }}>{s.badge}</span>
                    <span style={{
                      fontSize: '0.68rem', fontWeight: 600, color: '#6c757d'
                    }}>No.{i + 1}</span>
                  </div>

                  <h3 style={{
                    fontSize: '0.97rem', fontWeight: 800,
                    color: '#212529', marginBottom: 4, lineHeight: 1.3
                  }}>{s.title}</h3>

                  <p style={{ fontSize: '0.8rem', color: '#495057', lineHeight: 1.55 }}>
                    {s.desc}
                  </p>
                </div>
              </div>

              {/* bottom row */}
              <div style={{
                marginTop: 14, paddingTop: 12,
                borderTop: '1px solid #f0f0f0',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '0.75rem', color: '#6c757d', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <GeoIcon type="book" size={14} /> 2頁知識
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#6c757d', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <GeoIcon type="quiz" size={14} /> 互動任務
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#6c757d', display: 'flex', alignItems: 'center', gap: 4 }}>
                    🏅 {s.earnBadge}
                  </span>
                </div>
                <div style={{
                  background: s.accentColor, color: s.badgeTextColor || '#fff',
                  borderRadius: 999, padding: '5px 16px',
                  fontSize: '0.82rem', fontWeight: 700
                }}>選擇 →</div>
              </div>

              {/* interaction hint tag */}
              <div style={{
                position: 'absolute', top: 12, right: 14,
                background: '#f6fbf4', borderRadius: 999,
                padding: '3px 10px', fontSize: '0.65rem',
                color: '#468f37', fontWeight: 600,
                border: '1px solid #e2f3dc'
              }}>
                {s.interactionHint}
              </div>
            </div>
          ))}

          {/* tips */}
          <div style={{
            background: '#f6fbf4', border: '1px solid #e2f3dc',
            borderRadius: 12, padding: '12px 14px',
            display: 'flex', gap: 10, alignItems: 'flex-start'
          }}>
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: '0.78rem', color: '#6c757d', lineHeight: 1.55 }}>
              完成任意一組任務可獲得 <strong style={{ color: '#468f37' }}>NT$50 有機體驗折價券</strong>，
              適用於里仁、主婦聯盟。每組完成後角色成長，徽章也會升級。
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
