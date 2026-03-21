import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import ProgressBar from '../components/ProgressBar'
import SproutCharacter from '../components/SproutCharacter'
import {
  getScenarioData, loadBadges, saveBadges,
  saveCharacterStage, computeCharacterStage, getCharacterStageLabel, BADGE_DEFS
} from '../data/scenarioData'

// ─────────────────────────────────────────────────────
// Total overlay duration = 5.6s
// 0 – 0.7s  : overlay + old char zoom-in
// 0.7 – 2.2s: old char hold
// 2.0 – 3.2s: old char fades/shrinks out, new char grows in
// 3.2 – 4.6s: new char hold + labels appear
// 4.6 – 5.6s: overlay fades out
// ─────────────────────────────────────────────────────
const TOTAL = 5600
const T = TOTAL / 1000  // seconds

// Per-stage specific display names (for overlay "from → to")
const STAGE_NAMES = [
  '種子', '發小芽', '芽更長', '長出小葉子', '葉子變大',
  '多一片葉子', '長高並穩定', '葉片更完整', '接近成熟', '開花',
]

// Per-transition growth messages  (index = oldStage)
const GROWTH_MSGS = [
  '小芽芽冒出了第一個小芽！',
  '小芽芽的芽越來越長了',
  '小芽芽長出了第一片小葉子！',
  '小芽芽的葉子越來越大了',
  '小芽芽多長出了一片葉子！',
  '小芽芽長高了，更加穩定了',
  '小芽芽的葉片越來越完整了',
  '小芽芽快要成熟囉',
  '小芽芽終於開花了！',
]

const ANIM = `
/* ── Overlay backdrop ── */
@keyframes overlayBg {
  0%    { opacity: 0; }
  10%   { opacity: 1; }
  82%   { opacity: 1; }
  100%  { opacity: 0; }
}
.tc-overlay { animation: overlayBg ${T}s ease both; }

/* ── Old character: zoom in → hold → shrink/fade out ── */
@keyframes charOldOut {
  0%    { transform: scale(0.12); opacity: 0; }
  9%    { transform: scale(1.06); opacity: 1; }
  13%   { transform: scale(1);    opacity: 1; }
  37%   { transform: scale(1);    opacity: 1; }
  52%   { transform: scale(0.55); opacity: 0; }
  100%  { transform: scale(0.55); opacity: 0; }
}
.tc-char-old {
  animation: charOldOut ${T}s cubic-bezier(0.22,1,0.36,1) both;
}

/* ── New character: hidden → zoom in → hold ── */
@keyframes charNewIn {
  0%, 46%  { transform: scale(0.12); opacity: 0; }
  63%      { transform: scale(1.08); opacity: 1; }
  70%      { transform: scale(1);    opacity: 1; }
  100%     { transform: scale(1);    opacity: 1; }
}
.tc-char-new {
  animation: charNewIn ${T}s cubic-bezier(0.22,1,0.36,1) both;
}

/* ── Arrow between stage names ── */
@keyframes arrowPop {
  0%, 66%  { opacity: 0; transform: scaleX(0.4); }
  74%      { opacity: 1; transform: scaleX(1.15); }
  80%, 88% { opacity: 1; transform: scaleX(1); }
  100%     { opacity: 0; }
}
.tc-arrow { animation: arrowPop ${T}s ease both; }

/* ── Labels appear after new char settles ── */
@keyframes labelPulse {
  0%, 68%  { opacity: 0; transform: translateY(8px); }
  78%, 88% { opacity: 1; transform: translateY(0); }
  100%     { opacity: 0; }
}
.tc-overlay-label { animation: labelPulse ${T}s ease both; }

/* ── Sparkle ── */
@keyframes sparklePop {
  0%, 100% { transform: scale(0) rotate(0deg);    opacity: 0; }
  40%      { transform: scale(1.4) rotate(25deg);  opacity: 1; }
  70%      { transform: scale(0.85) rotate(10deg); opacity: 0.75; }
}
.tc-sp1 { animation: sparklePop 0.9s ease 3.1s both; }
.tc-sp2 { animation: sparklePop 0.8s ease 3.4s both; }
.tc-sp3 { animation: sparklePop 0.7s ease 3.6s both; }
.tc-sp4 { animation: sparklePop 0.8s ease 3.8s both; }

/* ── Glow ring ── */
@keyframes glowExpand {
  0%   { transform: scale(0.4); opacity: 0.85; }
  100% { transform: scale(2.1); opacity: 0; }
}
.tc-glow { animation: glowExpand 1.6s ease-out 3.2s both; }

/* ── Page reveal ── */
@keyframes pageCharIn {
  from { opacity: 0; transform: scale(0.88) translateY(10px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes stageIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.tc-page-char { animation: pageCharIn 0.55s cubic-bezier(0.22,1,0.36,1) both; }
.tc-stage-in  { animation: stageIn    0.45s ease                         0.15s both; }
.tc-fade-up   { animation: fadeUp     0.45s ease                         0.3s  both; }
`

// ─────────────────────────────────────────────────────
// Full-screen growth overlay
// Cross-fades from oldStage character to newStage character
// ─────────────────────────────────────────────────────
function GrowthOverlay({ oldStage, newStage }) {
  const spDots = [
    { cls: 'tc-sp1', top: '26%', left: '76%', size: 11, color: '#fec126' },
    { cls: 'tc-sp2', top: '32%', left: '13%', size: 9,  color: '#68b04e' },
    { cls: 'tc-sp3', top: '58%', left: '82%', size: 8,  color: '#fec126' },
    { cls: 'tc-sp4', top: '20%', left: '46%', size: 7,  color: '#e2f3dc', border: '2px solid #68b04e' },
  ]

  return (
    <div className="tc-overlay" style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.97)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 0,
    }}>
      {/* Glow ring behind characters */}
      <div className="tc-glow" style={{
        position: 'absolute', top: '42%', left: '50%',
        width: 190, height: 190, marginTop: -95, marginLeft: -95,
        border: '3px solid rgba(70,143,55,0.35)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Sparkle dots */}
      {spDots.map((s, i) => (
        <div key={i} className={s.cls} style={{
          position: 'absolute', top: s.top, left: s.left,
          width: s.size, height: s.size,
          background: s.color, border: s.border,
          borderRadius: '50%', pointerEvents: 'none',
        }} />
      ))}

      {/* Character cross-fade container */}
      <div style={{ position: 'relative', width: 240, height: 260 }}>
        {/* Old stage character: zooms in → fades out */}
        <div className="tc-char-old" style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <SproutCharacter stage={oldStage} size={200} />
        </div>
        {/* New stage character: fades in after old fades out */}
        <div className="tc-char-new" style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <SproutCharacter stage={newStage} size={200} />
        </div>
      </div>

      {/* Stage transition label + progress */}
      <div className="tc-overlay-label" style={{
        marginTop: 8, textAlign: 'center', pointerEvents: 'none',
      }}>
        {/* from → to */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 6, marginBottom: 6,
        }}>
          <span style={{ fontSize: '0.72rem', color: '#adb5bd', fontWeight: 600 }}>
            {STAGE_NAMES[oldStage]}
          </span>
          <span className="tc-arrow" style={{
            fontSize: '0.85rem', color: '#468f37', fontWeight: 900,
          }}>→</span>
          <span style={{ fontSize: '0.72rem', color: '#468f37', fontWeight: 700 }}>
            {STAGE_NAMES[newStage]}
          </span>
        </div>

        <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#468f37', letterSpacing: 1 }}>
          {getCharacterStageLabel(newStage)}
        </div>
        <div style={{ fontSize: '0.72rem', color: '#adb5bd', marginTop: 5 }}>
          成長進度 {newStage} / 9
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────
export default function TaskComplete() {
  const navigate = useNavigate()
  const location = useLocation()
  const score = location.state?.score ?? 2
  const total = location.state?.total ?? 2

  const scenario  = getScenarioData()
  const badgeId   = scenario.badgeId
  const badgeDef  = BADGE_DEFS[badgeId]

  const badges      = loadBadges()
  const prevVersion = badges[badgeId]?.version ?? 0
  const newVersion  = Math.min(3, prevVersion + 1)

  // Stage BEFORE this task
  const oldStage = computeCharacterStage(badges)
  // Stage AFTER this task
  const newStage = computeCharacterStage({ ...badges, [badgeId]: { version: newVersion } })

  const [overlayDone, setOverlayDone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setOverlayDone(true), TOTAL)
    return () => clearTimeout(t)
  }, [])

  const handleClaim = () => {
    const updatedBadges = { ...badges, [badgeId]: { version: newVersion } }
    saveBadges(updatedBadges)
    saveCharacterStage(computeCharacterStage(updatedBadges))
    const coupon = {
      id: 'CPN' + Date.now(),
      title: 'NT$50 有機體驗折價券',
      discount: 50, minOrder: 300,
      channels: ['里仁', '主婦聯盟'],
      expiry: '2026/06/30',
      status: 'unused',
      createdAt: new Date().toISOString(),
      scenarioId: scenario.id,
      badgeName: badgeDef?.name || '',
      qrData: 'ORGANIC-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
    }
    const existing = JSON.parse(localStorage.getItem('organic_coupons') || '[]')
    existing.push(coupon)
    localStorage.setItem('organic_coupons', JSON.stringify(existing))
    navigate('/coupon-success', { state: { coupon, newStage, newVersion, badgeDef } })
  }

  const growthMsg = GROWTH_MSGS[oldStage] ?? '小芽芽又向前長大了一點'

  return (
    <>
      <style>{ANIM}</style>
      <StatusBar />
      <ProgressBar step={5} total={5} label="任務完成" />

      {/* ── Full-screen growth overlay ── */}
      {!overlayDone && (
        <GrowthOverlay oldStage={oldStage} newStage={newStage} />
      )}

      <div className="page-scroll" style={{ background: '#fff' }}>
        {/* Top band */}
        <div style={{
          background: '#468f37', padding: '28px 24px 24px', textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.78rem', color: '#c4e8b8', marginBottom: 10, fontWeight: 600 }}>
            任務完成
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginBottom: 6 }}>
            恭喜完成！
          </h1>
          <p style={{ color: '#c4e8b8', fontSize: '0.88rem' }}>{scenario.completeText}</p>
        </div>

        {/* ── Result character (shown after overlay) ── */}
        <div style={{
          padding: '36px 20px 0',
          display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          {overlayDone ? (
            <>
              <div className="tc-page-char">
                <SproutCharacter stage={newStage} size={130} />
              </div>
              <div className="tc-stage-in" style={{ textAlign: 'center', marginTop: 12 }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#468f37' }}>
                  {getCharacterStageLabel(newStage)}
                </div>
                {/* 本次成長: X → Y */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  marginTop: 6, background: '#f0f9ec', borderRadius: 999,
                  padding: '3px 12px', border: '1px solid #c8e6b8'
                }}>
                  <span style={{ fontSize: '0.68rem', color: '#6c757d' }}>本次成長</span>
                  <span style={{ fontSize: '0.72rem', color: '#adb5bd' }}>
                    {getCharacterStageLabel(oldStage)}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#468f37', fontWeight: 700 }}>→</span>
                  <span style={{ fontSize: '0.72rem', color: '#468f37', fontWeight: 700 }}>
                    {getCharacterStageLabel(newStage)}
                  </span>
                </div>
                <div style={{ fontSize: '0.68rem', color: '#adb5bd', marginTop: 5 }}>
                  成長進度 {newStage} / 9
                </div>
              </div>
            </>
          ) : (
            <div style={{ width: 130, height: 175, opacity: 0 }} />
          )}
        </div>

        {/* Growth message card */}
        {overlayDone ? (
          <div className="tc-fade-up" style={{
            margin: '18px 20px 0',
            background: '#f6fbf4', borderRadius: 14, padding: '13px 16px',
            display: 'flex', alignItems: 'center', gap: 11,
            border: '1px solid #e2f3dc'
          }}>
            <SproutCharacter stage={newStage} size={34} />
            <p style={{ fontSize: '0.85rem', color: '#495057', lineHeight: 1.6 }}>
              {growthMsg}
            </p>
          </div>
        ) : (
          <div style={{ height: 68, margin: '18px 20px 0', opacity: 0 }} />
        )}

        {/* Badge card */}
        <div style={{ padding: '18px 20px 0' }}>
          <div style={{
            background: '#fff8e0', border: '2px solid #fec126',
            borderRadius: 16, padding: '18px 20px',
            display: 'flex', gap: 16, alignItems: 'center'
          }}>
            <div style={{
              width: 56, height: 56, flexShrink: 0,
              background: '#fec126', borderRadius: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.8rem'
            }}>
              {newVersion === 3 ? '🌸' : newVersion === 2 ? '🌿' : '🌱'}
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6b4800', marginBottom: 4 }}>
                新徽章獲得
              </div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#212529', marginBottom: 2 }}>
                {badgeDef?.name}{' '}
                <span style={{
                  background: '#fec126', color: '#6b4800',
                  padding: '1px 8px', borderRadius: 999, fontSize: '0.73rem', fontWeight: 700
                }}>V{newVersion}</span>
              </div>
              <div style={{ fontSize: '0.77rem', color: '#6c757d' }}>
                {badgeDef?.desc}
              </div>
            </div>
          </div>
        </div>

        {/* Score */}
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { label: '完成任務', val: total },
              { label: '正確回答', val: score },
            ].map(s => (
              <div key={s.label} style={{
                flex: 1, background: '#e2f3dc', borderRadius: 12,
                padding: '14px', textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2f6624' }}>{s.val}</div>
                <div style={{ fontSize: '0.72rem', color: '#6c757d', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Coupon teaser */}
        <div style={{ padding: '16px 20px' }}>
          <div style={{
            background: '#fff', border: '2px dashed #468f37',
            borderRadius: 16, padding: '18px 20px',
            display: 'flex', gap: 14, alignItems: 'center'
          }}>
            <div style={{ fontSize: '2rem' }}>🔓</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#212529', marginBottom: 4 }}>
                NT$50 有機體驗折價券
              </div>
              <div style={{ fontSize: '0.8rem', color: '#6c757d', lineHeight: 1.5 }}>
                適用通路：里仁、主婦聯盟<br />
                完成任務後解鎖，點下方領取
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: '4px 20px 40px' }}>
          <button
            className="btn btn-amber btn-full btn-lg"
            onClick={handleClaim}
            style={{ fontSize: '1rem' }}
          >
            解鎖並領取折價券
          </button>
        </div>
      </div>
    </>
  )
}
