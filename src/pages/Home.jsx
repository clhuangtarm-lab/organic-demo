import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'

export default function Home() {
  const navigate = useNavigate()

  return (
    <>
      <StatusBar />
      <div className="page-scroll">
        {/* Hero */}
        <div style={{
          background: 'linear-gradient(160deg, #1b4332 0%, #2d6a4f 50%, #52b788 100%)',
          padding: '40px 24px 48px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative circles */}
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

          {/* PWA scan hint */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 999, padding: '6px 14px',
            width: 'fit-content', marginBottom: 28
          }}>
            <span style={{ fontSize: '0.75rem', color: '#d8f3dc' }}>📲 掃碼即開 · PWA 體驗</span>
          </div>

          <h1 style={{
            fontSize: '2rem', fontWeight: 900, color: '#fff',
            lineHeight: 1.2, marginBottom: 12
          }}>
            有機生活<br />數位體驗
          </h1>
          <p style={{ color: '#b7e4c7', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 32 }}>
            完成知識任務，獲得專屬優惠，<br />讓有機更簡單、更貼近你的生活。
          </p>

          <button
            className="btn btn-amber btn-lg"
            onClick={() => navigate('/scenario')}
            style={{ fontSize: '1.05rem', padding: '16px 36px' }}
          >
            🚀 立即開始體驗
          </button>
        </div>

        {/* Features strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          gap: 1, background: '#e9ecef', margin: '0'
        }}>
          {[
            { icon: '🌿', text: '有機知識' },
            { icon: '🎯', text: '趣味問答' },
            { icon: '🎁', text: '獲得折價券' },
          ].map(f => (
            <div key={f.text} style={{
              background: '#fff', padding: '16px 8px', textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>{f.icon}</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#2d6a4f' }}>{f.text}</div>
            </div>
          ))}
        </div>

        {/* Info cards */}
        <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1b4332' }}>
            🌱 關於本次活動
          </h2>

          {[
            {
              icon: '📅', title: '活動期間', desc: '即日起至 2026/04/30',
              tag: '進行中', tagColor: 'tag-green'
            },
            {
              icon: '🏷️', title: '折價優惠', desc: '完成任務可領 NT$50 有機體驗券',
              tag: '限量', tagColor: 'tag-amber'
            },
            {
              icon: '🛒', title: '適用通路', desc: '全聯、主婦聯盟、有機田',
              tag: '全台適用', tagColor: 'tag-blue'
            },
          ].map(item => (
            <div key={item.title} className="card" style={{ display: 'flex', gap: 16, padding: '16px' }}>
              <span style={{ fontSize: '1.8rem', flexShrink: 0, lineHeight: 1 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1b4332' }}>{item.title}</span>
                  <span className={`tag ${item.tagColor}`}>{item.tag}</span>
                </div>
                <p style={{ fontSize: '0.83rem', color: '#495057', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </div>
          ))}

          {/* My coupon shortcut */}
          <div
            style={{
              background: 'linear-gradient(135deg, #f0faf4, #d8f3dc)',
              border: '1.5px dashed #52b788',
              borderRadius: 16, padding: '16px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/my-coupons')}
          >
            <div>
              <div style={{ fontWeight: 700, color: '#1b4332', marginBottom: 2 }}>我的折價券</div>
              <div style={{ fontSize: '0.78rem', color: '#2d6a4f' }}>查看已領取的優惠</div>
            </div>
            <span style={{ fontSize: '1.5rem' }}>🎟️</span>
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
