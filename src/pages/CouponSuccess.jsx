import { useNavigate, useLocation } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import QRCode from '../components/QRCode'
import GeoIcon from '../components/GeoIcon'
import SproutCharacter from '../components/SproutCharacter'

export default function CouponSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const coupon = location.state?.coupon
  const newStage = location.state?.newStage ?? 1
  const newVersion = location.state?.newVersion ?? 1
  const badgeDef = location.state?.badgeDef

  if (!coupon) {
    navigate('/my-coupons')
    return null
  }

  return (
    <>
      <StatusBar />

      <div className="page-scroll" style={{ background: '#f6fbf4' }}>
        {/* Success top */}
        <div style={{
          background: '#468f37',
          padding: '28px 24px 52px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute', top: 12, right: 16,
            width: 50, height: 50,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '60% 40% 55% 45%'
          }} />

          <div style={{
            position: 'absolute', bottom: -26, left: '50%',
            transform: 'translateX(-50%)',
            width: 52, height: 52, background: '#e2f3dc',
            borderRadius: '50%', display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid #f6fbf4', boxShadow: '0 3px 10px rgba(0,0,0,0.12)'
          }}>
            <span style={{ fontSize: '1.4rem' }}>✅</span>
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', marginBottom: 6 }}>
            領券成功！
          </h2>
          <p style={{ color: '#c4e8b8', fontSize: '0.88rem' }}>
            折價券已存入，記得去使用。
          </p>
        </div>

        {/* Character message */}
        <div style={{
          margin: '44px 20px 0',
          background: '#fff', borderRadius: 12, padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: 10,
          border: '1px solid #e2f3dc',
          boxShadow: '0 1px 6px rgba(0,0,0,0.06)'
        }}>
          <SproutCharacter stage={newStage} size={40} />
          <p style={{ fontSize: '0.83rem', color: '#495057', lineHeight: 1.55 }}>
            這張體驗券，是送給你的完成獎勵。
          </p>
        </div>

        {/* Badge display */}
        {badgeDef && (
          <div style={{
            margin: '12px 20px 0',
            background: '#fff8e0', borderRadius: 12, padding: '12px 16px',
            display: 'flex', alignItems: 'center', gap: 12,
            border: '1px solid #fec126'
          }}>
            <span style={{ fontSize: '1.6rem' }}>
              {newVersion === 3 ? '🌸' : newVersion === 2 ? '🌿' : '🌱'}
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#212529' }}>
                {badgeDef.name} V{newVersion}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#6b4800' }}>
                恭喜獲得新徽章。
              </div>
            </div>
          </div>
        )}

        {/* Coupon card */}
        <div style={{ padding: '16px 20px 8px' }}>
          <div style={{
            background: '#fff', borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 6px 24px rgba(0,0,0,0.10)',
            border: '1px solid #e2f3dc'
          }}>
            {/* Top */}
            <div style={{
              background: '#468f37',
              padding: '20px', textAlign: 'center', position: 'relative'
            }}>
              <div style={{
                position: 'absolute', top: 10, right: 12,
                background: 'rgba(255,255,255,0.2)', color: '#fff',
                borderRadius: 999, padding: '2px 10px',
                fontSize: '0.68rem', fontWeight: 700
              }}>未使用</div>

              <div style={{ color: '#c4e8b8', fontSize: '0.82rem', marginBottom: 2 }}>
                有機體驗折價券
              </div>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                NT$50
              </div>
              <div style={{ color: '#c4e8b8', fontSize: '0.78rem', marginTop: 6 }}>
                滿 NT$300 可使用
              </div>
            </div>

            {/* Dashed divider */}
            <div style={{ position: 'relative', height: 0, overflow: 'visible' }}>
              <div style={{
                position: 'absolute', left: -10, top: -10,
                width: 20, height: 20, borderRadius: '50%', background: '#f6fbf4'
              }} />
              <div style={{
                position: 'absolute', right: -10, top: -10,
                width: 20, height: 20, borderRadius: '50%', background: '#f6fbf4'
              }} />
              <div style={{ borderTop: '2px dashed #e2f3dc', margin: '0 14px' }} />
            </div>

            {/* QR */}
            <div style={{ padding: '24px 20px', textAlign: 'center' }}>
              <div style={{ marginBottom: 10 }}>
                <QRCode data={coupon.qrData} size={130} />
              </div>
              <div style={{
                fontSize: '0.68rem', color: '#adb5bd',
                fontFamily: 'monospace', marginBottom: 16
              }}>
                {coupon.qrData}
              </div>

              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, textAlign: 'left'
              }}>
                {[
                  { label: '有效期限', val: coupon.expiry, icon: 'calendar' },
                  { label: '狀態', val: '未使用', icon: 'check' },
                  { label: '適用通路', val: '里仁、主婦聯盟', full: true, icon: 'store' },
                ].map(info => (
                  <div
                    key={info.label}
                    style={{
                      background: '#f6fbf4', borderRadius: 10, padding: '10px 12px',
                      gridColumn: info.full ? '1/-1' : 'auto'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <GeoIcon type={info.icon} size={14} />
                      <span style={{ fontSize: '0.7rem', color: '#6c757d' }}>{info.label}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#212529' }}>
                      {info.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              borderTop: '1px solid #e2f3dc', padding: '12px 20px', background: '#f6fbf4'
            }}>
              <div style={{ fontSize: '0.72rem', color: '#6c757d', lineHeight: 1.6 }}>
                結帳時出示 QR Code · 每張限用一次 · 不可與其他折扣同時使用
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ padding: '16px 20px 40px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            className="btn btn-primary btn-full btn-lg"
            onClick={() => navigate('/my-coupons')}
          >
            查看我的折價券
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
