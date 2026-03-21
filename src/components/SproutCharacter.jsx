// 小芽芽 — 10-stage growth character (stage 0–9)
// 0=種子 1=發小芽 2=芽更長 3=長出小葉子 4=葉子變大
// 5=多一片葉 6=長高穩定 7=葉片更完整 8=接近成熟 9=開花

const ANIM_CSS = `
@keyframes sproutBob {
  0%,100% { transform: translateY(0px) rotate(0deg); }
  35%      { transform: translateY(-3px) rotate(0.6deg); }
  65%      { transform: translateY(-1.5px) rotate(-0.4deg); }
}
.sprout-plant { animation: sproutBob 3.8s ease-in-out infinite; }
`

const G   = '#468f37'
const GL  = '#68b04e'
const GD  = '#2f6624'
const BR  = '#d4a96c'
const BRH = '#e0bc88'
const EYE = '#6b3e10'
const CHK = '#f05d4d'

// CFG: [stemTop, rLeafSz, lLeafSz, closedBud, leftHint, thirdLeaf, flowerBud, bloom]
// stemTop: y of stem apex (lower y = taller); STEM_BASE = 68
// leafSz: 0=none 1=tiny 2=small 3=medium 4=large
const CFG = [
  [68, 0, 0, false, false, false, false, false],  // 0 種子        – seed only
  [60, 0, 0, false, false, false, false, false],  // 1 發小芽       – very short stem
  [51, 0, 0, true,  false, false, false, false],  // 2 芽更長       – longer stem + closed bud tip
  [44, 1, 0, false, false, false, false, false],  // 3 長出小葉子    – 1 tiny right leaf
  [38, 2, 0, false, true,  false, false, false],  // 4 葉子變大     – bigger right leaf + tiny left hint
  [32, 2, 1, false, false, false, false, false],  // 5 多一片葉子    – 2 clear leaves
  [25, 3, 2, false, false, false, false, false],  // 6 長高並更穩定  – taller, fuller leaves
  [19, 3, 3, false, false, true,  false, false],  // 7 葉片更完整   – tallest non-bloom + 3rd leaf
  [16, 4, 3, false, false, true,  true,  false],  // 8 接近成熟     – near max height + third leaf + flower bud
  [16, 4, 4, false, false, false, false, true ],  // 9 開花         – full bloom
]

const STEM_BASE = 68

// Right leaf (anchored at ax=43, tilts right-upward)
function rLeafPath(sz, ay) {
  const ax = 43
  if (sz === 0) return null
  const shapes = [null,
    `M${ax},${ay} C${ax+9},${ay-4} ${ax+11},${ay+3} ${ax+5},${ay+8} C${ax+2},${ay+7} ${ax},${ay+3} ${ax},${ay}Z`,
    `M${ax},${ay} C${ax+15},${ay-6} ${ax+18},${ay+4} ${ax+9},${ay+13} C${ax+4},${ay+12} ${ax},${ay+5} ${ax},${ay}Z`,
    `M${ax},${ay} C${ax+21},${ay-10} ${ax+24},${ay+5} ${ax+13},${ay+16} C${ax+6},${ay+15} ${ax},${ay+7} ${ax},${ay}Z`,
    `M${ax},${ay} C${ax+25},${ay-13} ${ax+29},${ay+6} ${ax+17},${ay+20} C${ax+7},${ay+18} ${ax},${ay+9} ${ax},${ay}Z`,
  ]
  const veins = [null,
    `M${ax},${ay} C${ax+7},${ay+1} ${ax+8},${ay+5}`,
    `M${ax},${ay} C${ax+12},${ay+2} ${ax+13},${ay+9}`,
    `M${ax},${ay} C${ax+17},${ay+3} ${ax+17},${ay+12}`,
    `M${ax},${ay} C${ax+21},${ay+3} ${ax+20},${ay+15}`,
  ]
  return { d: shapes[sz], vein: veins[sz] }
}

// Left leaf (mirror, anchored at ax=37, tilts left-upward)
function lLeafPath(sz, ay) {
  const ax = 37
  if (sz === 0) return null
  const shapes = [null,
    `M${ax},${ay} C${ax-9},${ay-4} ${ax-11},${ay+3} ${ax-5},${ay+8} C${ax-2},${ay+7} ${ax},${ay+3} ${ax},${ay}Z`,
    `M${ax},${ay} C${ax-15},${ay-6} ${ax-18},${ay+4} ${ax-9},${ay+13} C${ax-4},${ay+12} ${ax},${ay+5} ${ax},${ay}Z`,
    `M${ax},${ay} C${ax-21},${ay-10} ${ax-24},${ay+5} ${ax-13},${ay+16} C${ax-6},${ay+15} ${ax},${ay+7} ${ax},${ay}Z`,
    `M${ax},${ay} C${ax-25},${ay-13} ${ax-29},${ay+6} ${ax-17},${ay+20} C${ax-7},${ay+18} ${ax},${ay+9} ${ax},${ay}Z`,
  ]
  const veins = [null,
    `M${ax},${ay} C${ax-7},${ay+1} ${ax-8},${ay+5}`,
    `M${ax},${ay} C${ax-12},${ay+2} ${ax-13},${ay+9}`,
    `M${ax},${ay} C${ax-17},${ay+3} ${ax-17},${ay+12}`,
    `M${ax},${ay} C${ax-21},${ay+3} ${ax-20},${ay+15}`,
  ]
  return { d: shapes[sz], vein: veins[sz] }
}

export default function SproutCharacter({ stage = 0, size = 80, showLabel = false }) {
  const s = Math.max(0, Math.min(9, Math.round(stage)))
  const [stemTop, rSz, lSz, hasClosedBud, hasLeftHint, hasThirdLeaf, hasFlowerBud, hasBloom] = CFG[s]
  const stemLen = STEM_BASE - stemTop
  const hasStem = stemLen > 0

  // Main leaf Y positions along stem
  const rLeafY = hasStem ? stemTop + stemLen * 0.42 : STEM_BASE
  const lLeafY = hasStem ? stemTop + stemLen * 0.64 : STEM_BASE

  // Third leaf (stage 7) placed lower on stem, left side
  const thirdLeafY = hasStem ? stemTop + stemLen * 0.82 : STEM_BASE

  const rLeaf = rLeafPath(rSz, rLeafY)
  const lLeaf = lLeafPath(lSz, lLeafY)

  // Left hint anchor: same y as lLeafY but drawn as a tiny nub
  const lHintY = hasStem ? stemTop + stemLen * 0.60 : STEM_BASE

  const bloomCY = stemTop - 9

  const label = s === 0 ? '種子'
    : s <= 2 ? '發芽中'
    : s <= 5 ? '長葉中'
    : s <= 8 ? '成熟中'
    : '開花'

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <style>{ANIM_CSS}</style>
      <svg viewBox="0 0 80 90" width={size} height={size * 1.125} style={{ overflow: 'visible' }}>

        {/* Ground shadow — grows with plant */}
        <ellipse cx="40" cy="86" rx={14 + stemLen * 0.13} ry="4"
          fill="#a0c878" opacity={0.22 + stemLen * 0.004} />

        {/* Seed / body — always visible */}
        <ellipse cx="40" cy="76" rx="13" ry="9" fill={BR} />
        <ellipse cx="40" cy="74" rx="9" ry="5.5" fill={BRH} opacity="0.45" />

        {/* Animated plant group */}
        <g className="sprout-plant" style={{ transformOrigin: '40px 68px' }}>

          {/* Stem */}
          {hasStem && (
            <rect x="38" y={stemTop} width="4" height={stemLen} rx="2" fill={G} />
          )}

          {/* Stage 2: closed bud tip — narrow teardrop, not open */}
          {hasClosedBud && (
            <g>
              <ellipse cx="40" cy={stemTop - 4} rx="2.5" ry="5.5" fill={GL} />
              <ellipse cx="40" cy={stemTop - 7} rx="1.5" ry="2.8" fill="#c8edb8" />
            </g>
          )}

          {/* Stage 7: third small leaf — lower-left, behind main leaves */}
          {hasThirdLeaf && (
            <g>
              <path
                d={`M37,${thirdLeafY} C${37-11},${thirdLeafY-4} ${37-12},${thirdLeafY+4} ${37-6},${thirdLeafY+9} C${37-2},${thirdLeafY+8} 37,${thirdLeafY+3} 37,${thirdLeafY}Z`}
                fill={GL} opacity="0.75"
              />
              <path
                d={`M37,${thirdLeafY} C${37-8},${thirdLeafY+1} ${37-9},${thirdLeafY+6}`}
                stroke={GD} strokeWidth="0.6" fill="none" opacity="0.35"
              />
            </g>
          )}

          {/* Left leaf (drawn behind right leaf) */}
          {lLeaf && (
            <g>
              <path d={lLeaf.d} fill={GL} />
              <path d={lLeaf.vein} stroke={GD} strokeWidth="0.75" fill="none" opacity="0.4" />
            </g>
          )}

          {/* Stage 4: tiny left nub hint (only when lLeafSz=0) */}
          {hasLeftHint && (
            <g>
              <path
                d={`M37,${lHintY} C${37-7},${lHintY-3} ${37-8},${lHintY+2} ${37-4},${lHintY+7} C${37-1},${lHintY+6} 37,${lHintY+2} 37,${lHintY}Z`}
                fill={GL} opacity="0.6"
              />
            </g>
          )}

          {/* Right leaf */}
          {rLeaf && (
            <g>
              <path d={rLeaf.d} fill={GL} />
              <path d={rLeaf.vein} stroke={GD} strokeWidth="0.75" fill="none" opacity="0.4" />
            </g>
          )}

          {/* Stage 8: flower bud — plump oval, no petals */}
          {hasFlowerBud && (
            <g>
              <ellipse cx="40" cy={stemTop - 5} rx="4" ry="6" fill={GL} />
              <ellipse cx="40" cy={stemTop - 8} rx="2.5" ry="3.2" fill="#c8edb8" />
              {/* tiny sepal lines */}
              <path d={`M38,${stemTop-3} C37,${stemTop-7}`} stroke={GD} strokeWidth="0.7" fill="none" opacity="0.5" />
              <path d={`M42,${stemTop-3} C43,${stemTop-7}`} stroke={GD} strokeWidth="0.7" fill="none" opacity="0.5" />
            </g>
          )}

          {/* Stage 9: full bloom */}
          {hasBloom && (
            <g>
              {[0, 72, 144, 216, 288].map((angle) => {
                const rad = (angle - 90) * Math.PI / 180
                const px = 40 + 8 * Math.cos(rad)
                const py = bloomCY + 8 * Math.sin(rad)
                return (
                  <ellipse key={angle} cx={px} cy={py} rx="4.8" ry="3"
                    fill="#fec126"
                    transform={`rotate(${angle}, ${px.toFixed(1)}, ${py.toFixed(1)})`} />
                )
              })}
              <circle cx="40" cy={bloomCY} r="5.5" fill="#fec126" />
              <circle cx="40" cy={bloomCY} r="3.2" fill="#f0a000" />
            </g>
          )}

        </g>

        {/* Face on seed (not animated) */}
        <circle cx="36.5" cy="73" r="1.7" fill={EYE} />
        <circle cx="43.5" cy="73" r="1.7" fill={EYE} />
        <path d="M35.5,78 Q40,82.5 44.5,78"
          stroke={EYE} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <ellipse cx="33" cy="75.5" rx="2.2" ry="1.6" fill={CHK} opacity="0.27" />
        <ellipse cx="47" cy="75.5" rx="2.2" ry="1.6" fill={CHK} opacity="0.27" />
      </svg>

      {showLabel && (
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#468f37' }}>{label}</span>
      )}
    </div>
  )
}

// Badge icon — maps badge version to character stage
export function BadgeIcon({ version = 1, size = 44 }) {
  const stageMap = { 1: 3, 2: 6, 3: 9 }
  const stage = stageMap[version] || 3
  return <SproutCharacter stage={stage} size={size} />
}
