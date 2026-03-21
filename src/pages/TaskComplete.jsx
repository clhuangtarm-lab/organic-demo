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
// Phase 1 (zoom-in):   0 – 0.7s
// Phase 2 (growth):  0.7 – 4.4s
// Phase 3 (zoom-out): 4.4 – 5.6s
// Page reveals:        5.6s → React removes overlay
// ─────────────────────────────────────────────────────
const TOTAL = 5600   // ms

const ANIM = `
/* ── Overlay white backdrop ── */
@keyframes overlayBg {
  0%    { opacity: 0; }
  10%   { opacity: 1; }
  82%   { opacity: 1; }
  100%  { opacity: 0; }
}
.tc-overlay {
  animation: overlayBg ${TOTAL / 1000}s ease both;
}

/* ── Large character: zoom in → hold → shrink out ── */
@keyframes charZoom {
  0%    { transform: scale(0.18); opacity: 0; }
  10%   { transform: scale(1.05); opacity: 1; }
  13%   { transform: scale(1);    opacity: 1; }
  80%   { transform: scale(1);    opacity: 1; }
  100%  { transform: scale(0.28); opacity: 0; }
}
.tc-char-zoom {
  animation: charZoom ${TOTAL / 1000}s cubic-bezier(0.22,1,0.36,1) both;
}

/* ── Stage name appears near end of overlay ── */
@keyframes labelPulse {
  0%, 72%  { opacity: 0; transform: translateY(8px); }
  80%, 88% { opacity: 1; transform: translateY(0); }
  100%     { opacity: 0; }
}
.tc-overlay-label {
  animation: labelPulse ${TOTAL / 1000}s ease both;
}

/* ── SVG: stem extends upward ── */
@keyframes stemExtend {
  0%, 18%  { transform: scaleY(0); }
  72%      { transform: scaleY(1.05); }
  100%     { transform: scaleY(1); }
}
/* ── SVG: initial small leaf fades out ── */
@keyframes rLeafOut {
  0%, 25%   { opacity: 1; transform: scale(1); }
  80%, 100% { opacity: 0; transform: scale(0.65) translateX(7px); }
}
/* ── SVG: large right leaf unfolds ── */
@keyframes rLeafIn {
  0%, 28%  { transform: scale(0);    opacity: 0; }
  68%      { transform: scale(1.1);  opacity: 1; }
  100%     { transform: scale(1);    opacity: 1; }
}
/* ── SVG: left leaf unfolds ── */
@keyframes lLeafIn {
  0%, 48%  { transform: scale(0) rotate(-20deg); opacity: 0; }
  80%      { transform: scale(1.08) rotate(4deg); opacity: 1; }
  100%     { transform: scale(1) rotate(0deg);    opacity: 1; }
}
/* ── SVG: ground shadow grows ── */
@keyframes shadowGrow {
  0%, 18%  { transform: scaleX(1);   opacity: 0.35; }
  100%     { transform: scaleX(1.65); opacity: 0.5; }
}
/* ── Leaf micro-glow flash ── */
@keyframes leafGlow {
  0%, 100% { filter: brightness(1); }
  50%      { filter: brightness(1.5) drop-shadow(0 0 6px rgba(104,176,78,0.7)); }
}
/* ── Sparkle pop ── */
@keyframes sparklePop {
  0%, 100% { transform: scale(0) rotate(0deg);    opacity: 0; }
  40%      { transform: scale(1.4) rotate(25deg);  opacity: 1; }
  70%      { transform: scale(0.85) rotate(10deg); opacity: 0.75; }
}
/* ── Glow ring expands and fades ── */
@keyframes glowExpand {
  0%   { transform: scale(0.4); opacity: 0.85; }
  100% { transform: scale(1.9); opacity: 0; }
}
/* ── Whole character breathes inside overlay (hold phase) ── */
@keyframes breatheHold {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}

/* Timing — all relative to page mount */
.tc-stem-ext  { animation: stemExtend 1.4s cubic-bezier(0.22,1,0.36,1) 1.2s  both; }
.tc-rleaf-out { animation: rLeafOut   0.9s ease                         2.1s  both; }
.tc-rleaf-in  { animation: rLeafIn    1.1s cubic-bezier(0.22,1,0.36,1) 2.2s  both; }
.tc-lleaf-in  { animation: lLeafIn    1.0s cubic-bezier(0.22,1,0.36,1) 3.0s  both; }
.tc-shadow    { animation: shadowGrow 2.2s ease                         1.2s  both; }
.tc-leaf-glow { animation: leafGlow   0.6s ease                         3.8s  both; }
.tc-breathe   { animation: breatheHold 3.5s ease-in-out                 4.0s  infinite; }
.tc-sp1 { animation: sparklePop 0.9s ease 3.5s both; }
.tc-sp2 { animation: sparklePop 0.8s ease 3.75s both; }
.tc-sp3 { animation: sparklePop 0.7s ease 3.95s both; }
.tc-sp4 { animation: sparklePop 0.8s ease 4.15s both; }
.tc-glow { animation: glowExpand 1.4s ease-out 4.0s both; }

/* ── Page reveal (triggered when overlay unmounts) ── */
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
// Animated SVG: sprout → leaf (used inside overlay)
// ─────────────────────────────────────────────────────
function GrowthSVG({ size = 240 }) {
  const G  = '#468f37'
  const GL = '#68b04e'
  const BR = '#d4a96c'
  const h  = size * (100 / 80)

  return (
    <div className="tc-breathe" style={{ position: 'relative' }}>
      <svg viewBox="0 0 80 100" width={size} height={h} style={{ overflow: 'visible' }}>
        {/* Ground shadow */}
        <ellipse className="tc-shadow" cx="40" cy="92" rx="18" ry="5.5"
          fill="#a0c878" style={{ transformOrigin: '40px 92px' }} />
        {/* Seed base */}
        <ellipse cx="40" cy="83" rx="12" ry="8" fill={BR} />
        {/* Core stem (sprout height) */}
        <rect x="37.5" y="46" width="5" height="37" rx="2.5" fill={G} />
        {/* Stem extension — grows up */}
        <rect className="tc-stem-ext" x="37.5" y="26" width="5" height="20" rx="2.5" fill={G}
          style={{ transformOrigin: '40px 46px' }} />
        {/* Initial small right leaf */}
        <g className="tc-rleaf-out" style={{ transformOrigin: '42px 52px' }}>
          <path d="M42,52 C52,42 64,46 60,56 C56,64 42,58 42,52Z" fill={GL} />
          <path d="M42,52 C52,47 58,52 56,56" stroke={G} strokeWidth="0.8" fill="none" opacity="0.5" />
        </g>
        {/* Large right leaf — unfolds + micro-glow */}
        <g className="tc-rleaf-in tc-leaf-glow" style={{ transformOrigin: '42.5px 41px' }}>
          <path d="M42.5,41 C57,25 76,31 72,46 C68,59 42.5,52 42.5,41Z" fill={GL} />
          <path d="M42.5,41 C57,35 67,42 68,48" stroke={G} strokeWidth="0.9" fill="none" opacity="0.5" />
        </g>
        {/* Left leaf — unfolds + micro-glow */}
        <g className="tc-lleaf-in tc-leaf-glow" style={{ transformOrigin: '37.5px 58px' }}>
          <path d="M37.5,58 C23,42 8,49 10,64 C12,77 37.5,70 37.5,58Z" fill={GL} />
          <path d="M37.5,58 C25,51 16,61 14,67" stroke={G} strokeWidth="0.9" fill="none" opacity="0.5" />
        </g>
        {/* Face */}
        <circle cx="36.5" cy="72" r="1.8" fill="#6b3e10" />
        <circle cx="43.5" cy="72" r="1.8" fill="#6b3e10" />
        <path d="M35.5,77.5 Q40,82 44.5,77.5" stroke="#6b3e10" strokeWidth="1.5"
          fill="none" strokeLinecap="round" />
        <ellipse cx="32" cy="74.5" rx="2.5" ry="1.8" fill="#f05d4d" opacity="0.28" />
        <ellipse cx="48" cy="74.5" rx="2.5" ry="1.8" fill="#f05d4d" opacity="0.28" />
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────────────────
// Full-screen overlay (position:absolute covers phone-shell)
// ─────────────────────────────────────────────────────
function GrowthOverlay({ newStage }) {
  const spDots = [
    { cls: 'tc-sp1', top: '28%', left: '76%', size: 11, color: '#fec126' },
    { cls: 'tc-sp2', top: '32%', left: '12%', size: 9,  color: '#68b04e' },
    { cls: 'tc-sp3', top: '56%', left: '82%', size: 8,  color: '#fec126' },
    { cls: 'tc-sp4', top: '20%', left: '48%', size: 7,  color: '#e2f3dc', border: '2px solid #68b04e' },
  ]

  return (
    <div className="tc-overlay" style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.97)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 0,
    }}>
      {/* Glow ring */}
      <div className="tc-glow" style={{
        position: 'absolute', top: '44%', left: '50%',
        width: 200, height: 200, marginTop: -100, marginLeft: -100,
        border: '3px solid rgba(70,143,55,0.4)',
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

      {/* Large growth character */}
      <div className="tc-char-zoom">
        <GrowthSVG size={230} />
      </div>

      {/* Stage name label */}
      <div className="tc-overlay-label" style={{
        marginTop: 16, textAlign: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#468f37', letterSpacing: 1 }}>
          {getCharacterStageLabel(newStage)}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#adb5bd', marginTop: 4 }}>
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
  // Compute future character stage after this task completes
  const newStage    = computeCharacterStage({ ...badges, [badgeId]: { version: newVersion } })


  // Remove overlay from DOM after animation completes
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

  return (
    <>
      <style>{ANIM}</style>
      <StatusBar />
      <ProgressBar step={5} total={5} label="任務完成" />

      {/* ── Full-screen growth overlay ── */}
      {!overlayDone && (
        <GrowthOverlay newStage={newStage} />
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
                <SproutCharacter stage={newStage} size={140} />
              </div>
              <div className="tc-stage-in" style={{ textAlign: 'center', marginTop: 12 }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#468f37' }}>
                  {getCharacterStageLabel(newStage)}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#adb5bd', marginTop: 5 }}>
                  成長進度 {newStage} / 9
                </div>
              </div>
            </>
          ) : (
            /* Placeholder keeps layout stable during overlay */
            <div style={{ width: 140, height: 175, opacity: 0 }} />
          )}
        </div>

        {/* Message card */}
        {overlayDone ? (
          <div className="tc-fade-up" style={{
            margin: '22px 20px 0',
            background: '#f6fbf4', borderRadius: 14, padding: '14px 18px',
            display: 'flex', alignItems: 'center', gap: 12,
            border: '1px solid #e2f3dc'
          }}>
            <SproutCharacter stage={newStage} size={36} />
            <p style={{ fontSize: '0.85rem', color: '#495057', lineHeight: 1.6 }}>
              你完成任務，小芽芽也向前長大了一點。
            </p>
          </div>
        ) : (
          <div style={{ height: 70, margin: '22px 20px 0', opacity: 0 }} />
        )}

        {/* Badge */}
        <div style={{ padding: '20px 20px 0' }}>
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
