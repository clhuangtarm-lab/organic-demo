import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import SproutCharacter from '../components/SproutCharacter'
import GeoIcon from '../components/GeoIcon'
import { loadCharacterStage, loadBadges, BADGE_DEFS } from '../data/scenarioData'

export default function Home() {
  const navigate = useNavigate()
  const charStage = loadCharacterStage()
  const badges = loadBadges()
  const earnedBadges = Object.entries(badges).filter(([, v]) => v.version > 0)

  return (
    <>
      <StatusBar />
      <div className="page-scroll" style={{ background: '#fff' }}>

        {/* ── Hero ── */}
        <div style={{
          background: '#468f37',
          padding: '36px 24px 40px',
          position: 'relative', overflow: 'hidden'
        }}>
          {/* subtle circle decoration */}
          <div style={{
            position: 'absolute', top: -50, right: -50,
            width: 180, height: 180, borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)'
          }} />
          <div style={{
            position: 'absolute', bottom: -30, left: -20,
            width: 120, height: 120, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)'
          }} />

          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', marginBottom: 24
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(255,255,255,0.18)',
                borderRadius: 999, padding: '5px 14px',
                marginBottom: 20
              }}>
                <span style={{ fontSize: '0.75rem', color: '#e2f3dc', fontWeight: 600 }}>
                  📲 掃碼即開 · PWA 體驗
                </span>
              </div>
              <h1 style={{
                fontSize: '1.9rem', fontWeight: 900, color: '#fff',
                lineHeight: 1.2, marginBottom: 10
              }}>
                有機生活<br />數位體驗
              </h1>
              <p style={{ color: '#c4e8b8', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 28 }}>
                完成知識任務，養成小芽芽，<br />獲得專屬折價券。
              </p>
              <button
                className="btn btn-amber btn-lg"
                onClick={() => navigate('/scenario')}
                style={{ fontSize: '1rem' }}
              >
                立即開始 →
              </button>
            </div>

            {/* Character preview */}
            <div style={{ flexShrink: 0, marginLeft: 8 }}>
              <div style={{
                background: 'rgba(255,255,255,0.12)',
                borderRadius: 20, padding: '12px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                border: '1.5px solid rgba(255,255,255,0.2)'
              }}>
                <SproutCharacter stage={charStage} size={72} />
                <span style={{ fontSize: '0.7rem', color: '#c4e8b8', fontWeight: 600 }}>
                  小芽芽
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature strip ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          gap: 1, background: '#e9ecef'
        }}>
          {[
            { icon: 'leaf', text: '有機知識' },
            { icon: 'quiz', text: '趣味互動' },
            { icon: 'coupon', text: '折價券' },
          ].map(f => (
            <div key={f.text} style={{
              background: '#fff', padding: '16px 8px', textAlign: 'center'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                <GeoIcon type={f.icon} size={36} />
              </div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#468f37' }}>{f.text}</div>
            </div>
          ))}
        </div>

        {/* ── Info cards ── */}
        <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#212529' }}>
            關於本次活動
          </h2>

          {[
            {
              icon: 'calendar', title: '活動期間', desc: '即日起至 2026/04/30',
              tag: '進行中', tagColor: 'tag-green'
            },
            {
              icon: 'tag', title: '折價優惠', desc: '完成任務可領 NT$50 有機體驗券',
              tag: '限量', tagColor: 'tag-yellow'
            },
            {
              icon: 'store', title: '適用通路', desc: '里仁、主婦聯盟',
              tag: '全台適用', tagColor: 'tag-green'
            },
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

          {/* ── Earned badges section (if any) ── */}
          {earnedBadges.length > 0 && (
            <div style={{
              background: '#f6fbf4',
              border: '1.5px solid #e2f3dc',
              borderRadius: 14, padding: '14px 16px'
            }}>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#2f6624', marginBottom: 10 }}>
                🏅 已獲得的徽章
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {earnedBadges.map(([id, v]) => {
                  const def = BADGE_DEFS[id]
                  if (!def) return null
                  const vLabel = ['', '發芽', '長葉', '開花'][v.version] || ''
                  return (
                    <div key={id} style={{
                      background: '#fff', borderRadius: 10, padding: '8px 12px',
                      border: '1.5px solid #e2f3dc',
                      display: 'flex', alignItems: 'center', gap: 8
                    }}>
                      <span style={{ fontSize: '1.2rem' }}>
                        {v.version === 3 ? '🌸' : v.version === 2 ? '🌿' : '🌱'}
                      </span>
                      <div>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#212529' }}>{def.name}</div>
                        <div style={{ fontSize: '0.68rem', color: '#468f37' }}>V{v.version} · {vLabel}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── My coupons shortcut ── */}
          <div
            style={{
              background: '#fff', border: '1.5px dashed #468f37',
              borderRadius: 14, padding: '14px 18px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/my-coupons')}
          >
            <div>
              <div style={{ fontWeight: 700, color: '#212529', marginBottom: 2 }}>我的折價券</div>
              <div style={{ fontSize: '0.78rem', color: '#468f37' }}>查看已領取的優惠</div>
            </div>
            <GeoIcon type="ticket" size={34} />
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div style={{ padding: '4px 20px 36px' }}>
          <button
            className="btn btn-primary btn-full btn-lg"
            onClick={() => navigate('/scenario')}
          >
            選擇體驗情境 →
          </button>
        </div>
      </div>
    </>
  )
}
