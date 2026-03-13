import { useNavigate, useLocation } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import ProgressBar from '../components/ProgressBar'

export default function TaskComplete() {
  const navigate = useNavigate()
  const location = useLocation()
  const score = location.state?.score ?? 3

  const handleClaim = () => {
    // Create coupon in localStorage
    const coupon = {
      id: 'CPN' + Date.now(),
      title: 'NT$50 有機體驗折價券',
      discount: 50,
      minOrder: 300,
      channels: ['全聯福利中心', '主婦聯盟生活消費合作社', '有機田'],
      expiry: '2026/06/30',
      status: 'unused',
      createdAt: new Date().toISOString(),
      qrData: 'ORGANIC-COUPON-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
    }
    const existing = JSON.parse(localStorage.getItem('organic_coupons') || '[]')
    existing.push(coupon)
    localStorage.setItem('organic_coupons', JSON.stringify(existing))
    navigate('/coupon-success', { state: { coupon } })
  }

  return (
    <>
      <StatusBar />
      <ProgressBar step={5} total={5} label="任務完成 🎉" />

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        background: 'linear-gradient(160deg, #1b4332 0%, #2d6a4f 40%, #52b788 100%)',
        minHeight: 'calc(100dvh - 94px)',
        padding: '0 0 32px'
      }}>
        {/* Celebration */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '40px 28px 20px', textAlign: 'center'
        }}>
          {/* Animated badge */}
          <div style={{
            width: 120, height: 120,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3.5rem',
            marginBottom: 24,
            border: '3px solid rgba(255,255,255,0.3)'
          }}>
            🏆
          </div>

          <h1 style={{
            fontSize: '2rem', fontWeight: 900,
            color: '#fff', marginBottom: 10, lineHeight: 1.2
          }}>任務完成！</h1>
          <p style={{ color: '#b7e4c7', fontSize: '1rem', marginBottom: 28 }}>
            答對 <strong style={{ color: '#fff', fontSize: '1.3rem' }}>{score}</strong> / 3 題
          </p>

          {/* Stars */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
            {[1, 2, 3].map(i => (
              <span key={i} style={{
                fontSize: '2rem',
                opacity: i <= score ? 1 : 0.3,
                filter: i <= score ? 'drop-shadow(0 0 8px #ffd700)' : 'none'
              }}>⭐</span>
            ))}
          </div>

          {/* Reward card */}
          <div style={{
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(10px)',
            borderRadius: 20,
            padding: '24px',
            border: '1.5px solid rgba(255,255,255,0.25)',
            width: '100%', maxWidth: 320, marginBottom: 8
          }}>
            <div style={{ fontSize: '1rem', color: '#d8f3dc', marginBottom: 8 }}>🎁 您已獲得</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', marginBottom: 6 }}>
              NT$50
            </div>
            <div style={{ fontSize: '0.9rem', color: '#b7e4c7', marginBottom: 12 }}>
              有機體驗折價券
            </div>
            <div style={{
              display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap'
            }}>
              {['全聯', '主婦聯盟', '有機田'].map(c => (
                <span key={c} style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: '#fff', borderRadius: 999,
                  padding: '3px 12px', fontSize: '0.75rem'
                }}>{c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div style={{ padding: '0 20px', marginBottom: 20 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 10
          }}>
            {[
              { icon: '📖', label: '知識學習者', desc: '完成 2 頁知識' },
              { icon: '🎯', label: '問答達人', desc: `答對 ${score}/3 題` },
              { icon: '🌱', label: '有機先鋒', desc: '初次體驗有機任務' },
              { icon: '🎁', label: '優惠獵人', desc: '解鎖折價券' },
            ].map(a => (
              <div key={a.label} style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 14, padding: '12px',
                display: 'flex', gap: 10, alignItems: 'center',
                border: '1px solid rgba(255,255,255,0.15)'
              }}>
                <span style={{ fontSize: '1.4rem' }}>{a.icon}</span>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff' }}>{a.label}</div>
                  <div style={{ fontSize: '0.7rem', color: '#b7e4c7' }}>{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: '0 20px' }}>
          <button
            className="btn btn-amber btn-full btn-lg"
            onClick={handleClaim}
            style={{ fontSize: '1.1rem' }}
          >
            立即領取折價券 🎁
          </button>
        </div>
      </div>
    </>
  )
}
