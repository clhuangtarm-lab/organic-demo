import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import SproutCharacter from '../components/SproutCharacter'
import GeoIcon from '../components/GeoIcon'
import { loadBadges, BADGE_DEFS, computeCharacterStage, getCharacterStageLabel } from '../data/scenarioData'

const HOME_ANIM = `
@keyframes charFloat {
  0%, 100% { transform: translateY(0) rotate(-1.2deg); }
  50%       { transform: translateY(-11px) rotate(1.2deg); }
}
@keyframes shadowPulse {
  0%, 100% { transform: scaleX(1);    opacity: 0.35; }
  50%       { transform: scaleX(0.8); opacity: 0.18; }
}
@keyframes stripBounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-3px); }
}
.home-char       { animation: charFloat    3.8s ease-in-out infinite; }
.home-shadow     { animation: shadowPulse  3.8s ease-in-out infinite; }
.strip-card:hover { transform: translateY(-2px); transition: transform 0.2s; }
`

const STRIPS = [
  {
    icon: 'leaf', text: '有機知識',
    sub: '農業入口網',
    action: () => window.open('https://epv.afa.gov.tw', '_blank'),
    bg: '#e2f3dc', color: '#2f6624',
  },
  {
    icon: 'quiz', text: '趣味互動',
    sub: '完成任務',
    action: 'scenario',
    bg: '#fff8e0', color: '#6b4800',
  },
  {
    icon: 'coupon', text: '折價券',
    sub: '我的優惠',
    action: 'my-coupons',
    bg: '#fde9e7', color: '#9b2b1e',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const badges = loadBadges()
  const charStage = computeCharacterStage(badges)
  const earnedBadges = Object.entries(badges).filter(([, v]) => v.version > 0)

  const handleStrip = (a) => {
    if (typeof a === 'function') a()
    else navigate('/' + a)
  }

  return (
    <>
      <style>{HOME_ANIM}</style>
      <StatusBar />
      <div className="page-scroll" style={{ background: '#fff' }}>

        {/* ── Hero ── */}
        <div style={{
          background: '#468f37', padding: '32px 22px 36px',
          position: 'relative', overflow: 'hidden'
        }}>
          {/* Subtle decoration circles */}
          <div style={{ position: 'absolute', top: -50, right: -50, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', bottom: -30, left: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 8 }}>
            {/* Text side */}
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(255,255,255,0.18)', borderRadius: 999,
                padding: '5px 14px', marginBottom: 18
              }}>
                <span style={{ fontSize: '0.75rem', color: '#e2f3dc', fontWeight: 600 }}>
                  📲 掃碼即開 · PWA 體驗
                </span>
              </div>
              <h1 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 10 }}>
                有機生活<br />數位體驗
              </h1>
              <p style={{ color: '#c4e8b8', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: 26 }}>
                完成知識任務，小芽芽會成長，<br />還能獲得專屬折價券。
              </p>
              <button className="btn btn-amber btn-lg" onClick={() => navigate('/scenario')} style={{ fontSize: '1rem' }}>
                立即開始 →
              </button>
            </div>

            {/* Character — enlarged + animated */}
            <div style={{
              flexShrink: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 0, paddingBottom: 4
            }}>
              <div className="home-char">
                <SproutCharacter stage={charStage} size={112} />
              </div>
              <div className="home-shadow" style={{
                width: 52, height: 9, background: '#2f6624',
                borderRadius: '50%', opacity: 0.3, marginTop: -4
              }} />
              <span style={{ fontSize: '0.72rem', color: '#c4e8b8', fontWeight: 600, marginTop: 6 }}>
                小芽芽 · {getCharacterStageLabel(charStage)}
              </span>
            </div>
          </div>
        </div>

        {/* ── Character speech ── */}
        <div style={{
          margin: '16px 20px 0',
          background: '#f6fbf4', borderRadius: 12, padding: '11px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
          border: '1px solid #e2f3dc'
        }}>
          <SproutCharacter stage={charStage} size={36} />
          <p style={{ fontSize: '0.82rem', color: '#495057', lineHeight: 1.6 }}>
            我是小芽芽，陪你一起認識有機生活。
          </p>
        </div>

        {/* ── Feature strip — clickable ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          gap: 1, background: '#e9ecef', margin: '16px 0 0'
        }}>
          {STRIPS.map(f => (
            <button
              key={f.text}
              className="strip-card"
              onClick={() => handleStrip(f.action)}
              style={{
                background: '#fff', padding: '16px 8px', textAlign: 'center',
                border: 'none', cursor: 'pointer', transition: '0.18s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: f.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4
              }}>
                <GeoIcon type={f.icon} size={26} />
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#212529' }}>{f.text}</div>
              <div style={{ fontSize: '0.68rem', color: f.color, fontWeight: 600 }}>{f.sub}</div>
            </button>
          ))}
        </div>

        {/* ── Info cards ── */}
        <div style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#212529' }}>關於本次活動</h2>

          {[
            { icon: 'calendar', title: '活動期間',   desc: '即日起至 2026/04/30',       tag: '進行中',  tagColor: 'tag-green' },
            { icon: 'tag',      title: '折價優惠',   desc: '完成任務可領 NT$50 有機體驗券', tag: '限量',    tagColor: 'tag-yellow' },
            { icon: 'store',    title: '適用通路',   desc: '里仁、主婦聯盟',             tag: '全台適用', tagColor: 'tag-green' },
          ].map(item => (
            <div key={item.title} className="card" style={{ display: 'flex', gap: 14, padding: '14px 16px' }}>
              <div style={{ flexShrink: 0, lineHeight: 1, paddingTop: 2 }}>
                <GeoIcon type={item.icon} size={38} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#212529' }}>{item.title}</span>
                  <span className={`tag ${item.tagColor}`}>{item.tag}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#495057', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </div>
          ))}

          {/* Earned badges */}
          {earnedBadges.length > 0 && (
            <div style={{ background: '#f6fbf4', border: '1.5px solid #e2f3dc', borderRadius: 14, padding: '14px 16px' }}>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#2f6624', marginBottom: 10 }}>🏅 已獲得的徽章</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {earnedBadges.map(([id, v]) => {
                  const def = BADGE_DEFS[id]
                  if (!def) return null
                  return (
                    <div key={id} style={{ background: '#fff', borderRadius: 10, padding: '8px 12px', border: '1.5px solid #e2f3dc', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '1.2rem' }}>{v.version === 3 ? '🌸' : v.version === 2 ? '🌿' : '🌱'}</span>
                      <div>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#212529' }}>{def.name}</div>
                        <div style={{ fontSize: '0.68rem', color: '#468f37' }}>V{v.version}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

        </div>

        {/* ── Bottom CTA ── */}
        <div style={{ padding: '4px 20px 36px' }}>
          <button className="btn btn-primary btn-full btn-lg" onClick={() => navigate('/scenario')}>
            選擇體驗情境 →
          </button>
        </div>
      </div>
    </>
  )
}
