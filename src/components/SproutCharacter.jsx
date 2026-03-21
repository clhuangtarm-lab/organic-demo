// 小芽芽 — organic character with 4 growth stages
// stage: 0=種子(seed), 1=發芽(sprout), 2=長葉(leaf), 3=開花(flower)

export default function SproutCharacter({ stage = 0, size = 80, showLabel = false }) {
  const s = size

  const label = ['種子', '發芽', '長葉', '開花'][stage] || '種子'

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg viewBox="0 0 80 90" width={s} height={s * (90 / 80)}>
        {stage === 0 && <Seed />}
        {stage === 1 && <Sprout />}
        {stage === 2 && <LeafStage />}
        {stage === 3 && <FlowerStage />}
      </svg>
      {showLabel && (
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#468f37' }}>{label}</span>
      )}
    </div>
  )
}

// ── Stage 0: Seed ─────────────────────────────────────────
function Seed() {
  return (
    <g>
      {/* ground */}
      <ellipse cx="40" cy="82" rx="20" ry="5" fill="#c8a96e" opacity="0.4" />
      {/* seed body */}
      <ellipse cx="40" cy="62" rx="18" ry="20" fill="#b8894e" />
      <ellipse cx="40" cy="60" rx="14" ry="16" fill="#d4a96c" />
      {/* seed stripe */}
      <path d="M40,44 Q44,60 40,78" stroke="#b8894e" strokeWidth="1.5" fill="none" opacity="0.5" />
      {/* face */}
      <circle cx="35" cy="60" r="2" fill="#6b3e10" />
      <circle cx="45" cy="60" r="2" fill="#6b3e10" />
      <path d="M36,67 Q40,71 44,67" stroke="#6b3e10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* blush */}
      <ellipse cx="31" cy="64" rx="3" ry="2" fill="#f05d4d" opacity="0.3" />
      <ellipse cx="49" cy="64" rx="3" ry="2" fill="#f05d4d" opacity="0.3" />
    </g>
  )
}

// ── Stage 1: Sprout ───────────────────────────────────────
function Sprout() {
  return (
    <g>
      {/* ground */}
      <ellipse cx="40" cy="84" rx="18" ry="5" fill="#a0c878" opacity="0.4" />
      {/* stem */}
      <rect x="37.5" y="46" width="5" height="36" rx="2.5" fill="#468f37" />
      {/* seed base */}
      <ellipse cx="40" cy="78" rx="12" ry="8" fill="#d4a96c" />
      {/* single leaf right */}
      <path d="M42,52 C52,42 64,46 60,56 C56,64 42,58 42,52Z" fill="#68b04e" />
      <path d="M42,52 C52,47 58,52 56,56" stroke="#468f37" strokeWidth="0.8" fill="none" opacity="0.5" />
      {/* face */}
      <circle cx="36.5" cy="72" r="1.8" fill="#6b3e10" />
      <circle cx="43.5" cy="72" r="1.8" fill="#6b3e10" />
      <path d="M35.5,77.5 Q40,81.5 44.5,77.5" stroke="#6b3e10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* blush */}
      <ellipse cx="32" cy="74.5" rx="2.5" ry="1.8" fill="#f05d4d" opacity="0.3" />
      <ellipse cx="48" cy="74.5" rx="2.5" ry="1.8" fill="#f05d4d" opacity="0.3" />
    </g>
  )
}

// ── Stage 2: Leaf Stage ───────────────────────────────────
function LeafStage() {
  return (
    <g>
      {/* ground — bigger shadow shows bigger plant */}
      <ellipse cx="40" cy="85" rx="22" ry="6" fill="#a0c878" opacity="0.45" />
      {/* stem — noticeably taller than sprout */}
      <rect x="37.5" y="28" width="5" height="54" rx="2.5" fill="#468f37" />
      {/* seed base */}
      <ellipse cx="40" cy="78" rx="12" ry="8" fill="#d4a96c" />
      {/* left leaf — large, sweeping left */}
      <path d="M37.5,58 C24,42 8,48 10,64 C12,78 37.5,70 37.5,58Z" fill="#68b04e" />
      <path d="M37.5,58 C25,51 16,60 14,67" stroke="#468f37" strokeWidth="1" fill="none" opacity="0.5" />
      {/* right leaf — large, reaching up-right */}
      <path d="M42.5,40 C58,24 76,30 72,46 C68,60 42.5,52 42.5,40Z" fill="#5aaa44" />
      <path d="M42.5,40 C58,34 68,42 68,48" stroke="#468f37" strokeWidth="1" fill="none" opacity="0.5" />
      {/* face */}
      <circle cx="36.5" cy="72" r="1.8" fill="#6b3e10" />
      <circle cx="43.5" cy="72" r="1.8" fill="#6b3e10" />
      <path d="M35.5,77.5 Q40,82 44.5,77.5" stroke="#6b3e10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* blush */}
      <ellipse cx="32" cy="74.5" rx="2.5" ry="1.8" fill="#f05d4d" opacity="0.3" />
      <ellipse cx="48" cy="74.5" rx="2.5" ry="1.8" fill="#f05d4d" opacity="0.3" />
    </g>
  )
}

// ── Stage 3: Flower Stage ─────────────────────────────────
function FlowerStage() {
  const petals = [0, 60, 120, 180, 240, 300]
  return (
    <g>
      {/* ground */}
      <ellipse cx="40" cy="84" rx="18" ry="5" fill="#a0c878" opacity="0.4" />
      {/* stem */}
      <rect x="37.5" y="40" width="5" height="42" rx="2.5" fill="#468f37" />
      {/* seed base */}
      <ellipse cx="40" cy="78" rx="12" ry="8" fill="#d4a96c" />
      {/* left leaf */}
      <path d="M37.5,62 C28,52 18,56 20,66 C22,74 37.5,70 37.5,62Z" fill="#68b04e" />
      {/* flower petals — rotate each ellipse around (40,28) */}
      {petals.map(angle => (
        <ellipse
          key={angle}
          cx="40" cy="16"
          rx="5" ry="9"
          fill="#fec126"
          transform={`rotate(${angle} 40 28)`}
        />
      ))}
      {/* flower center */}
      <circle cx="40" cy="28" r="8" fill="#468f37" />
      <circle cx="40" cy="28" r="4.5" fill="#68b04e" />
      {/* face */}
      <circle cx="36.5" cy="72" r="1.8" fill="#6b3e10" />
      <circle cx="43.5" cy="72" r="1.8" fill="#6b3e10" />
      <path d="M35.5,77.5 Q40,82 44.5,77.5" stroke="#6b3e10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* blush */}
      <ellipse cx="32" cy="74.5" rx="2.5" ry="1.8" fill="#f05d4d" opacity="0.3" />
      <ellipse cx="48" cy="74.5" rx="2.5" ry="1.8" fill="#f05d4d" opacity="0.3" />
    </g>
  )
}

// ── Badge Icon component ───────────────────────────────────
// Renders a mini version of the character for badge display
export function BadgeIcon({ version = 1, size = 44 }) {
  // version 1=sprout, 2=leaf, 3=flower
  const stageMap = { 1: 1, 2: 2, 3: 3 }
  const stage = stageMap[version] || 1
  return <SproutCharacter stage={stage} size={size} />
}
