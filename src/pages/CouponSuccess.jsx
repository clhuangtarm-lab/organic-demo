import { useNavigate, useLocation } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import QRCode from '../components/QRCode'

export default function CouponSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const coupon = location.state?.coupon

  if (!coupon) {
    navigate('/my-coupons')
    return null
  }

  return (
    <>
      <StatusBar />

      <div className="page-scroll" style={{ background: '#f0faf4' }}>
        {/* Success top */}
        <div style={{
          background: 'linear-gradient(135deg, #1b4332, #2d6a4f)',
          padding: '28px 24px 48px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute', bottom: -28, left: '50%', transform: 'translateX(-50%)',
            width: 56, height: 56, background: '#d8f3dc',
            borderRadius: '50%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '1.6rem',
            border: '4px solid #f0faf4', boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>✅</div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginBottom: 6 }}>
            🎉 領券成功！
          </h2>
          <p style={{ color: '#b7e4c7', fontSize: '0.9rem' }}>
            折價券已存入您的帳戶
          </p>
        </div>

        {/* Coupon card */}
        <div style={{ padding: '48px 20px 24px' }}>
          <div style={{
            background: '#fff',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            position: 'relative'
          }}>
            {/* Coupon top */}
            <div style={{
              background: 'linear-gradient(135deg, #2d6a4f, #52b788)',
              padding: '24px 20px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute', top: 12, right: 12,
                background: 'rgba(255,255,255,0.2)',
                color: '#fff', borderRadius: 999,
                padding: '3px 10px', fontSize: '0.7rem', fontWeight: 700
              }}>未使用</div>

              <div style={{ color: '#d8f3dc', fontSize: '0.85rem', marginBottom: 4 }}>有機體驗折價券</div>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                NT$50
              </div>
              <div style={{ color: '#b7e4c7', fontSize: '0.8rem', marginTop: 6 }}>
                滿 NT$300 可使用
              </div>
            </div>

            {/* Dashed divider with holes */}
            <div style={{ position: 'relative', height: 0, overflow: 'visible' }}>
              <div style={{
                position: 'absolute', left: -12, top: -12,
                width: 24, height: 24, borderRadius: '50%',
                background: '#f0faf4'
              }} />
              <div style={{
                position: 'absolute', right: -12, top: -12,
                width: 24, height: 24, borderRadius: '50%',
                background: '#f0faf4'
              }} />
              <div style={{
                borderTop: '2px dashed #e9ecef',
                margin: '0 16px'
              }} />
            </div>

            {/* QR Section */}
            <div style={{ padding: '24px 20px', textAlign: 'center' }}>
              <div style={{ marginBottom: 12 }}>
                <QRCode data={coupon.qrData} size={140} />
              </div>
              <div style={{ fontSize: '0.72rem', color: '#adb5bd', fontFamily: 'monospace', marginBottom: 16 }}>
                {coupon.qrData}
              </div>

              {/* Info grid */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: 12, textAlign: 'left'
              }}>
                {[
                  { label: '📅 有效期限', val: coupon.expiry },
                  { label: '💳 狀態', val: '✅ 未使用' },
                  { label: '🛒 適用通路', val: coupon.channels.join('、'), full: true },
                ].map(info => (
                  <div
                    key={info.label}
                    style={{
                      background: '#f8f9fa',
                      borderRadius: 10, padding: '10px 12px',
                      gridColumn: info.full ? '1/-1' : 'auto'
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', color: '#6c757d', marginBottom: 3 }}>{info.label}</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#212529', lineHeight: 1.4 }}>
                      {info.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How to use */}
            <div style={{
              borderTop: '1px solid #f0f0f0',
              padding: '14px 20px',
              background: '#f8f9fa'
            }}>
              <div style={{ fontSize: '0.78rem', color: '#6c757d', fontWeight: 700, marginBottom: 6 }}>
                📋 使用說明
              </div>
              <ul style={{ paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  '結帳時出示此 QR Code 給收銀員掃描',
                  '每張券限用一次，折抵後不找零',
                  '不可與其他折扣活動同時使用',
                ].map(t => (
                  <li key={t} style={{ fontSize: '0.78rem', color: '#6c757d', lineHeight: 1.5 }}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div style={{ padding: '4px 20px 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            className="btn btn-primary btn-full btn-lg"
            onClick={() => navigate('/my-coupons')}
          >
            查看我的折價券 🎟️
          </button>
          <button
            className="btn btn-secondary btn-full"
            onClick={() => navigate('/')}
          >
            回到首頁
          </button>
        </div>
      </div>
    </>
  )
}
