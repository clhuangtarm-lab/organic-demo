import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import TopNav from '../components/TopNav'
import QRCode from '../components/QRCode'

const MOCK_COUPON = {
  id: 'CPN_DEMO001',
  title: 'NT$50 有機體驗折價券',
  discount: 50,
  minOrder: 300,
  channels: ['全聯福利中心', '主婦聯盟生活消費合作社', '有機田'],
  expiry: '2026/06/30',
  status: 'unused',
  createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  qrData: 'ORGANIC-COUPON-DEMO0001',
}

export default function MyCoupons() {
  const navigate = useNavigate()
  const [coupons, setCoupons] = useState([])
  const [activeTab, setActiveTab] = useState('unused')
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('organic_coupons') || '[]')
    // Add demo if empty
    if (stored.length === 0) {
      setCoupons([MOCK_COUPON])
    } else {
      setCoupons(stored)
    }
  }, [])

  const filtered = coupons.filter(c =>
    activeTab === 'all' ? true : c.status === activeTab
  )

  const statusLabel = { unused: '未使用', used: '已使用', expired: '已過期' }
  const statusColor = { unused: '#2d6a4f', used: '#6c757d', expired: '#adb5bd' }
  const statusBg = { unused: '#d8f3dc', used: '#f0f0f0', expired: '#f8f9fa' }

  return (
    <>
      <StatusBar />
      <TopNav title="我的折價券" back="/" />

      <div className="page-scroll" style={{ background: '#f0faf4' }}>
        {/* Summary bar */}
        <div style={{
          background: 'linear-gradient(135deg, #1b4332, #2d6a4f)',
          padding: '20px 24px'
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
            gap: 8, textAlign: 'center'
          }}>
            {[
              { label: '全部', val: coupons.length, tab: 'all' },
              { label: '未使用', val: coupons.filter(c => c.status === 'unused').length, tab: 'unused' },
              { label: '已使用', val: coupons.filter(c => c.status !== 'unused').length, tab: 'used' },
            ].map(s => (
              <div
                key={s.tab}
                onClick={() => setActiveTab(s.tab)}
                style={{
                  cursor: 'pointer',
                  background: activeTab === s.tab ? 'rgba(255,255,255,0.2)' : 'transparent',
                  borderRadius: 12, padding: '10px 4px',
                  transition: '0.2s'
                }}
              >
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff' }}>{s.val}</div>
                <div style={{ fontSize: '0.75rem', color: '#b7e4c7' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Coupon list */}
        <div style={{ padding: '16px 16px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filtered.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '48px 20px',
              color: '#adb5bd'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>🎟️</div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>尚無折價券</div>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
                完成有機知識任務後即可領取折價券
              </p>
              <button
                className="btn btn-primary"
                style={{ marginTop: 20 }}
                onClick={() => navigate('/scenario')}
              >
                前往領取 →
              </button>
            </div>
          ) : (
            filtered.map(coupon => (
              <div
                key={coupon.id}
                style={{
                  background: '#fff',
                  borderRadius: 18,
                  overflow: 'hidden',
                  boxShadow: '0 3px 14px rgba(0,0,0,0.08)',
                  opacity: coupon.status !== 'unused' ? 0.72 : 1
                }}
              >
                {/* Top */}
                <div
                  style={{
                    display: 'flex', alignItems: 'center',
                    padding: '16px',
                    cursor: 'pointer',
                    gap: 14
                  }}
                  onClick={() => setExpanded(expanded === coupon.id ? null : coupon.id)}
                >
                  <div style={{
                    width: 56, height: 56, flexShrink: 0,
                    background: coupon.status === 'unused' ? '#d8f3dc' : '#f0f0f0',
                    borderRadius: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    {coupon.status === 'unused' ? '🎁' : '✅'}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1b4332', marginBottom: 4 }}>
                      {coupon.title}
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{
                        background: statusBg[coupon.status],
                        color: statusColor[coupon.status],
                        fontSize: '0.72rem', fontWeight: 700,
                        padding: '2px 8px', borderRadius: 999
                      }}>{statusLabel[coupon.status]}</span>
                      <span style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                        到期 {coupon.expiry}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    fontSize: '1.5rem', fontWeight: 900,
                    color: '#2d6a4f', flexShrink: 0
                  }}>
                    $50
                  </div>
                </div>

                {/* Expanded QR */}
                {expanded === coupon.id && (
                  <div style={{
                    borderTop: '1.5px dashed #e9ecef',
                    padding: '20px',
                    background: '#f8f9fa'
                  }}>
                    {/* Holes */}
                    <div style={{ textAlign: 'center', marginBottom: 16 }}>
                      <QRCode data={coupon.qrData} size={160} />
                      <div style={{
                        fontSize: '0.7rem', color: '#adb5bd',
                        fontFamily: 'monospace', marginTop: 8
                      }}>{coupon.qrData}</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {[
                        { icon: '🛒', label: '適用通路', val: coupon.channels.join(' / ') },
                        { icon: '📅', label: '有效期限', val: coupon.expiry },
                        { icon: '💰', label: '使用門檻', val: `消費滿 NT$${coupon.minOrder}` },
                        { icon: '💳', label: '券號', val: coupon.id },
                      ].map(info => (
                        <div key={info.label} style={{
                          display: 'flex', gap: 10, alignItems: 'flex-start',
                          background: '#fff', borderRadius: 10, padding: '10px 12px'
                        }}>
                          <span style={{ fontSize: '1rem', flexShrink: 0 }}>{info.icon}</span>
                          <div>
                            <div style={{ fontSize: '0.72rem', color: '#6c757d' }}>{info.label}</div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#212529', marginTop: 1 }}>
                              {info.val}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{
                      background: '#fff3cd', borderRadius: 10,
                      padding: '10px 12px', marginTop: 10,
                      fontSize: '0.78rem', color: '#856404', lineHeight: 1.5
                    }}>
                      ⚠️ 使用時請出示 QR Code 給收銀員掃描，每張限用一次。
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {/* Earn more */}
          <div
            style={{
              background: 'linear-gradient(135deg, #f0fdf4, #d8f3dc)',
              border: '1.5px dashed #52b788',
              borderRadius: 16, padding: '16px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/scenario')}
          >
            <div>
              <div style={{ fontWeight: 700, color: '#1b4332', marginBottom: 2 }}>再做一次任務</div>
              <div style={{ fontSize: '0.78rem', color: '#2d6a4f' }}>完成知識任務獲得更多折券</div>
            </div>
            <span style={{ fontSize: '1.5rem' }}>➕</span>
          </div>
        </div>
      </div>
    </>
  )
}
