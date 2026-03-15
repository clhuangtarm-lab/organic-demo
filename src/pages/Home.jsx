import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import GeoIcon from '../components/GeoIcon'

export default function Home() {
  const navigate = useNavigate()

  return (
    <>
      <StatusBar />
      <div className="page-scroll">
        {/* Hero */}
        <div style={{
          background: 'linear-gradient(160deg, #665048 0%, #628d3d 50%, #96b23c 100%)',
          padding: '40px 24px 48px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative shapes */}
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 180, height: 180, borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)'
          }} />
          <div style={{
            position: 'absolute', bottom: -20, left: -20,
            width: 120, height: 120, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)'
          }} />
          {/* Accent blob */}
          <div style={{
            position: 'absolute', top: 20, right: 20,
            width: 60, height: 60,
            background: 'rgba(223,234,166,0.15)',
            borderRadius: '40% 60% 55% 45%'
          }} />

          {/* PWA scan hint */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 999, padding: '6px 14px',
            width: 'fit-content', marginBottom: 28
          }}>
            <span style={{ fontSize: '0.75rem', color: '#dfeaa6' }}>📲 掃碼即開 · PWA 體驗</span>
          </div>

          <h1 style={{
            fontSize: '2rem', fontWeight: 900, color: '#fff',
            lineHeight: 1.2, marginBottom: 12
          }}>
            有機生活<br />數位體驗
          </h1>
          <p style={{ color: '#dfeaa6', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 32 }}>
            完成知識任務，獲得專屬優惠，<br />讓有機更簡單、更貼近你的生活。
          </p>

          <button
            className="btn btn-amber btn-lg"
            onClick={() => navigate('/scenario')}
            style={{ fontSize: '1.05rem', padding: '16px 36px' }}
          >
            立即開始體驗 →
          </button>
        </div>

        {/* Features strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          gap: 1, background: '#e2e8c0', margin: '0'
        }}>
          {[
            { icon: 'leaf', text: '有機知識' },
            { icon: 'quiz', text: '趣味問答' },
            { icon: 'coupon', text: '獲得折價券' },
          ].map(f => (
            <div key={f.text} style={{
              background: '#fff', padding: '16px 8px', textAlign: 'center'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                <GeoIcon type={f.icon} size={36} />
              </div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#628d3d' }}>{f.text}</div>
            </div>
          ))}
        </div>

        {/* Info cards */}
        <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#665048' }}>
            關於本次活動
          </h2>

          {[
            {
              icon: 'calendar', title: '活動期間', desc: '即日起至 2026/04/30',
              tag: '進行中', tagColor: 'tag-green'
            },
            {
              icon: 'tag', title: '折價優惠', desc: '完成任務可領 NT$50 有機體驗券',
              tag: '限量', tagColor: 'tag-amber'
            },
            {
              icon: 'store', title: '適用通路', desc: '里仁、主婦聯盟',
              tag: '全台適用', tagColor: 'tag-blue'
            },
          ].map(item => (
            <div key={item.title} className="card" style={{ display: 'flex', gap: 16, padding: '16px' }}>
              <div style={{ flexShrink: 0, lineHeight: 1 }}>
                <GeoIcon type={item.icon} size={40} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#665048' }}>{item.title}</span>
                  <span className={`tag ${item.tagColor}`}>{item.tag}</span>
                </div>
                <p style={{ fontSize: '0.83rem', color: '#495057', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </div>
          ))}

          {/* My coupon shortcut */}
          <div
            style={{
              background: 'linear-gradient(135deg, #f5f7e8, #dfeaa6)',
              border: '1.5px dashed #96b23c',
              borderRadius: 16, padding: '16px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/my-coupons')}
          >
            <div>
              <div style={{ fontWeight: 700, color: '#665048', marginBottom: 2 }}>我的折價券</div>
              <div style={{ fontSize: '0.78rem', color: '#628d3d' }}>查看已領取的優惠</div>
            </div>
            <GeoIcon type="ticket" size={36} />
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ padding: '8px 20px 32px' }}>
          <button
            className="btn btn-primary btn-full btn-lg"
            onClick={() => navigate('/scenario')}
          >
            選擇入口情境 →
          </button>
        </div>
      </div>
    </>
  )
}
