import { useNavigate, useLocation } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import ProgressBar from '../components/ProgressBar'
import GeoIcon from '../components/GeoIcon'

export default function TaskComplete() {
  const navigate = useNavigate()
  const location = useLocation()
  const score = location.state?.score ?? 3

  const handleClaim = () => {
    const coupon = {
      id: 'CPN' + Date.now(),
      title: 'NT$50 有機體驗折價券',
      discount: 50,
      minOrder: 300,
      channels: ['里仁', '主婦聯盟生活消費合作社'],
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
        background: 'linear-gradient(160deg, #665048 0%, #628d3d 40%, #96b23c 100%)',
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
            borderRadius: '38% 62% 55% 45% / 45% 40% 60% 55%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 24,
            border: '3px solid rgba(255,255,255,0.3)'
          }}>
            <GeoIcon type="trophy" size={64} />
          </div>

          <h1 style={{
            fontSize: '2rem', fontWeight: 900,
            color: '#fff', marginBottom: 10, lineHeight: 1.2
          }}>任務完成！</h1>
          <p style={{ color: '#dfeaa6', fontSize: '1rem', marginBottom: 28 }}>
            答對 <strong style={{ color: '#fff', fontSize: '1.3rem' }}>{score}</strong> / 3 題
          </p>

          {/* Stars */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ opacity: i <= score ? 1 : 0.3 }}>
                <GeoIcon type={i <= score ? 'star' : 'starEmpty'} size={36} />
              </div>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, justifyContent: 'center' }}>
              <GeoIcon type="gift" size={20} />
              <span style={{ fontSize: '1rem', color: '#dfeaa6' }}>您已獲得</span>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', marginBottom: 6 }}>
              NT$50
            </div>
            <div style={{ fontSize: '0.9rem', color: '#dfeaa6', marginBottom: 12 }}>
              有機體驗折價券
            </div>
            <div style={{
              display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap'
            }}>
              {['里仁', '主婦聯盟'].map(c => (
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
              { iconType: 'book', label: '知識學習者', desc: '完成 2 頁知識' },
              { iconType: 'quiz', label: '問答達人', desc: `答對 ${score}/3 題` },
              { iconType: 'organic', label: '有機先鋒', desc: '初次體驗有機任務' },
              { iconType: 'gift', label: '優惠獵人', desc: '解鎖折價券' },
            ].map(a => (
              <div key={a.label} style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 14, padding: '12px',
                display: 'flex', gap: 10, alignItems: 'center',
                border: '1px solid rgba(255,255,255,0.15)'
              }}>
                <GeoIcon type={a.iconType} size={28} />
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff' }}>{a.label}</div>
                  <div style={{ fontSize: '0.7rem', color: '#dfeaa6' }}>{a.desc}</div>
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
            立即領取折價券
          </button>
        </div>
      </div>
    </>
  )
}
