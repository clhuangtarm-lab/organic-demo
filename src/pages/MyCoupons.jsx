import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import TopNav from '../components/TopNav'
import QRCode from '../components/QRCode'
import GeoIcon from '../components/GeoIcon'
import SproutCharacter from '../components/SproutCharacter'
import { loadCharacterStage, loadBadges, BADGE_DEFS } from '../data/scenarioData'

const MOCK_COUPON = {
  id: 'CPN_DEMO001',
  title: 'NT$50 有機體驗折價券',
  discount: 50,
  minOrder: 300,
  channels: ['里仁', '主婦聯盟'],
  expiry: '2026/06/30',
  status: 'unused',
  createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  qrData: 'ORGANIC-COUPON-DEMO0001',
  badgeName: '體驗先鋒',
}

export default function MyCoupons() {
  const navigate = useNavigate()
  const [coupons, setCoupons] = useState([])
  const [activeTab, setActiveTab] = useState('unused')
  const [expanded, setExpanded] = useState(null)

  const charStage = loadCharacterStage()
  const badges = loadBadges()
  const earnedBadges = Object.entries(badges).filter(([, v]) => v.version > 0)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('organic_coupons') || '[]')
    setCoupons(stored.length === 0 ? [MOCK_COUPON] : stored)
  }, [])

  const filtered = coupons.filter(c =>
    activeTab === 'all' ? true : c.status === activeTab
  )

  const statusLabel = { unused: '未使用', used: '已使用', expired: '已過期' }
  const statusColor = { unused: '#468f37', used: '#6c757d', expired: '#adb5bd' }
  const statusBg    = { unused: '#e2f3dc', used: '#f0f0f0', expired: '#f8f9fa' }

  return (
    <>
      <StatusBar />
      <TopNav title="我的折價券" back="/" />

      <div className="page-scroll" style={{ background: '#f6fbf4' }}>
        {/* Character + summary bar */}
        <div style={{ background: '#468f37', padding: '20px 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <SproutCharacter stage={charStage} size={44} />
            <p style={{ fontSize: '0.82rem', color: '#c4e8b8', lineHeight: 1.5 }}>
              每次完成任務都是新的累積。
            </p>
          </div>

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
                  borderRadius: 10, padding: '8px 4px', transition: '0.2s'
                }}
              >
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff' }}>{s.val}</div>
                <div style={{ fontSize: '0.72rem', color: '#c4e8b8' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Badge strip */}
        {earnedBadges.length > 0 && (
          <div style={{
            background: '#fff', padding: '14px 20px',
            borderBottom: '1px solid #e2f3dc'
          }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6c757d', marginBottom: 10 }}>
              已獲得徽章
            </div>
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
              {earnedBadges.map(([id, v]) => {
                const def = BADGE_DEFS[id]
                if (!def) return null
                const stageName = ['', '發芽', '長葉', '開花'][v.version] || ''
                return (
                  <div key={id} style={{
                    flexShrink: 0,
                    background: '#fff8e0', borderRadius: 10, padding: '8px 12px',
                    border: '1.5px solid #fec126',
                    display: 'flex', alignItems: 'center', gap: 8
                  }}>
                    <span style={{ fontSize: '1.1rem' }}>
                      {v.version === 3 ? '🌸' : v.version === 2 ? '🌿' : '🌱'}
                    </span>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#212529' }}>
                        {def.name}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: '#6b4800' }}>
                        V{v.version} · {stageName}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Coupon list */}
        <div style={{ padding: '14px 16px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: '#adb5bd' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <SproutCharacter stage={0} size={64} />
              </div>
              <div style={{ fontWeight: 600, marginBottom: 6, color: '#212529' }}>尚無折價券</div>
              <p style={{ fontSize: '0.83rem', lineHeight: 1.55, color: '#6c757d' }}>
                完成有機知識任務後即可領取
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
                  background: '#fff', borderRadius: 16, overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
                  border: '1px solid #e2f3dc',
                  opacity: coupon.status !== 'unused' ? 0.72 : 1
                }}
              >
                <div
                  style={{
                    display: 'flex', alignItems: 'center',
                    padding: '14px 16px', cursor: 'pointer', gap: 12
                  }}
                  onClick={() => setExpanded(expanded === coupon.id ? null : coupon.id)}
                >
                  <div style={{
                    width: 50, height: 50, flexShrink: 0,
                    background: coupon.status === 'unused' ? '#e2f3dc' : '#f0f0f0',
                    borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.4rem'
                  }}>
                    {coupon.status === 'unused' ? '🎫' : '✅'}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: 700, fontSize: '0.92rem', color: '#212529', marginBottom: 4
                    }}>
                      {coupon.title}
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{
                        background: statusBg[coupon.status], color: statusColor[coupon.status],
                        fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 999
                      }}>{statusLabel[coupon.status]}</span>
                      <span style={{ fontSize: '0.72rem', color: '#6c757d' }}>
                        到期 {coupon.expiry}
                      </span>
                    </div>
                  </div>

                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#468f37', flexShrink: 0 }}>
                    $50
                  </div>
                </div>

                {expanded === coupon.id && (
                  <div style={{
                    borderTop: '1.5px dashed #e2f3dc',
                    padding: '18px 16px', background: '#f6fbf4'
                  }}>
                    <div style={{ textAlign: 'center', marginBottom: 14 }}>
                      <QRCode data={coupon.qrData} size={150} />
                      <div style={{
                        fontSize: '0.65rem', color: '#adb5bd',
                        fontFamily: 'monospace', marginTop: 6
                      }}>{coupon.qrData}</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {[
                        { iconType: 'store',    label: '適用通路', val: '里仁、主婦聯盟' },
                        { iconType: 'calendar', label: '有效期限', val: coupon.expiry },
                        { iconType: 'tag',      label: '使用門檻', val: `消費滿 NT$${coupon.minOrder}` },
                        { iconType: 'ticket',   label: '券號',     val: coupon.id },
                      ].map(info => (
                        <div key={info.label} style={{
                          display: 'flex', gap: 10, alignItems: 'flex-start',
                          background: '#fff', borderRadius: 10, padding: '10px 12px',
                          border: '1px solid #e9ecef'
                        }}>
                          <GeoIcon type={info.iconType} size={18} />
                          <div>
                            <div style={{ fontSize: '0.7rem', color: '#6c757d' }}>{info.label}</div>
                            <div style={{
                              fontSize: '0.83rem', fontWeight: 600, color: '#212529', marginTop: 1
                            }}>{info.val}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{
                      background: '#fff8e0', borderRadius: 10,
                      padding: '10px 12px', marginTop: 10,
                      fontSize: '0.75rem', color: '#6b4800', lineHeight: 1.55,
                      border: '1px solid #fde9bc'
                    }}>
                      使用時請出示 QR Code 給收銀員掃描，每張限用一次。
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {/* Earn more */}
          <div
            style={{
              background: '#fff', border: '1.5px dashed #468f37',
              borderRadius: 14, padding: '14px 18px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/scenario')}
          >
            <div>
              <div style={{ fontWeight: 700, color: '#212529', marginBottom: 2 }}>
                再做一次任務
              </div>
              <div style={{ fontSize: '0.75rem', color: '#468f37' }}>
                和我一起享受有機生活。
              </div>
            </div>
            <GeoIcon type="leaf" size={32} />
          </div>
        </div>
      </div>
    </>
  )
}
