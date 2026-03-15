import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import TopNav from '../components/TopNav'
import GeoIcon from '../components/GeoIcon'

const SCENARIOS = [
  {
    id: 'event',
    iconType: 'burst',
    badge: '活動限定',
    badgeColor: '#c9889a',
    title: '活動限定體驗',
    desc: '掃描現場 QR Code 解鎖，完成有機知識挑戰，限時獲得獨家優惠。',
    highlight: '限時限量',
    highlightColor: '#fceef5',
    highlightText: '#c9889a',
    bg: 'linear-gradient(135deg, #fdf4f7, #f2cedd)',
    border: '#c9889a',
  },
  {
    id: 'member',
    iconType: 'crown',
    badge: '會員專屬',
    badgeColor: '#628d3d',
    title: '會員專屬有機知識任務',
    desc: '針對會員設計的深度有機農業知識課程，通過測驗即可獲得額外點數與折券。',
    highlight: '會員加倍',
    highlightColor: '#eef3d8',
    highlightText: '#628d3d',
    bg: 'linear-gradient(135deg, #f5f7e8, #dfeaa6)',
    border: '#96b23c',
  },
  {
    id: 'product',
    iconType: 'shopping',
    badge: '商品推薦',
    badgeColor: '#665048',
    title: '立即認識今日選購商品',
    desc: '了解今日主打有機商品的產地、農法與營養知識，知識測驗後享購買優惠。',
    highlight: '今日特選',
    highlightColor: '#f0ebe6',
    highlightText: '#665048',
    bg: 'linear-gradient(135deg, #f4f0ec, #e8ddd6)',
    border: '#665048',
  },
]

export default function ScenarioSelect() {
  const navigate = useNavigate()

  const handleSelect = (scenario) => {
    localStorage.setItem('organic_scenario', JSON.stringify(scenario))
    navigate('/knowledge/1')
  }

  return (
    <>
      <StatusBar />
      <TopNav title="選擇入口情境" back="/" />

      <div className="page-scroll">
        <div style={{ padding: '20px 20px 8px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#665048', marginBottom: 6 }}>
            您想透過哪種方式體驗？
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#6c757d', lineHeight: 1.5 }}>
            選擇最符合您目前狀況的情境，開啟專屬有機知識旅程。
          </p>
        </div>

        <div style={{ padding: '12px 20px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {SCENARIOS.map((s, i) => (
            <div
              key={s.id}
              onClick={() => handleSelect(s)}
              style={{
                background: s.bg,
                border: `2px solid ${s.border}`,
                borderRadius: 20,
                padding: '20px',
                cursor: 'pointer',
                transition: '0.2s',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Entrance number */}
              <span style={{
                position: 'absolute', top: 14, right: 14,
                width: 28, height: 28,
                background: 'rgba(0,0,0,0.06)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 700, color: '#555'
              }}>
                {i + 1}
              </span>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ flexShrink: 0, marginTop: 2 }}>
                  <GeoIcon type={s.iconType} size={44} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span style={{
                      background: s.badgeColor, color: '#fff',
                      fontSize: '0.7rem', fontWeight: 700,
                      padding: '3px 10px', borderRadius: 999
                    }}>{s.badge}</span>
                    <span style={{
                      background: s.highlightColor, color: s.highlightText,
                      fontSize: '0.7rem', fontWeight: 600,
                      padding: '3px 10px', borderRadius: 999
                    }}>{s.highlight}</span>
                  </div>

                  <h3 style={{
                    fontSize: '1rem', fontWeight: 800,
                    color: '#665048', marginBottom: 6, lineHeight: 1.3
                  }}>{s.title}</h3>

                  <p style={{
                    fontSize: '0.82rem', color: '#495057',
                    lineHeight: 1.55
                  }}>{s.desc}</p>
                </div>
              </div>

              {/* Bottom action row */}
              <div style={{
                marginTop: 14, paddingTop: 12,
                borderTop: '1px solid rgba(0,0,0,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.77rem', color: '#555' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <GeoIcon type="book" size={16} /> 2頁知識
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <GeoIcon type="quiz" size={16} /> 3道問答
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <GeoIcon type="gift" size={16} /> NT$50券
                  </span>
                </div>
                <span style={{
                  background: s.badgeColor, color: '#fff',
                  borderRadius: 999, padding: '6px 16px',
                  fontSize: '0.82rem', fontWeight: 700
                }}>選擇 →</span>
              </div>
            </div>
          ))}

          {/* Tips */}
          <div style={{
            background: '#f5f7e8',
            border: '1px solid #dfeaa6',
            borderRadius: 14,
            padding: '14px 16px',
            display: 'flex', gap: 10, alignItems: 'flex-start'
          }}>
            <GeoIcon type="leaf" size={20} />
            <p style={{ fontSize: '0.8rem', color: '#6c757d', lineHeight: 1.55 }}>
              三種情境完成後均可獲得 <strong style={{ color: '#628d3d' }}>NT$50 有機體驗折價券</strong>，
              每人限領一次，可於里仁、主婦聯盟等指定通路使用。
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
