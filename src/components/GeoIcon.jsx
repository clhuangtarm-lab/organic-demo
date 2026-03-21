// Abstract geometric icons — updated brand colors
// Primary: #468f37 green, #fec126 yellow, #f05d4d red
export default function GeoIcon({ type, size = 32 }) {
  const s = size
  const G  = '#468f37'  // main green
  const GL = '#68b04e'  // light green
  const GP = '#e2f3dc'  // pale green
  const Y  = '#fec126'  // yellow
  const R  = '#f05d4d'  // red

  const icons = {
    leaf: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <path d="M20,7 C27,7 34,12 33,21 C32,30 26,35 20,35 C14,35 8,30 7,21 C6,12 13,7 20,7Z" fill={G}/>
        <path d="M20,13 C24,13 29,16 28,21 C27,26 24,30 20,30 C16,30 13,26 12,21 C11,16 16,13 20,13Z" fill={GL}/>
        <path d="M19,28 Q17,34 15,36" stroke={G} strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    quiz: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <rect x="6" y="6" width="28" height="28" rx="5" fill={GL} transform="rotate(13 20 20)"/>
        <rect x="10" y="10" width="20" height="20" rx="3" fill={GP} transform="rotate(13 20 20)"/>
        <circle cx="20" cy="20" r="5" fill={G}/>
      </svg>
    ),
    coupon: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <rect x="3" y="12" width="34" height="20" rx="5" fill={G}/>
        <rect x="3" y="18" width="34" height="6" fill={Y}/>
        <circle cx="20" cy="10" r="5" fill={GL}/>
        <rect x="18" y="5" width="4" height="9" rx="2" fill={G}/>
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <rect x="4" y="10" width="32" height="26" rx="5" fill={G}/>
        <rect x="4" y="10" width="32" height="13" rx="5" fill={GL}/>
        <rect x="4" y="17" width="32" height="6" fill={GL}/>
        <rect x="12" y="5" width="4" height="9" rx="2" fill="#2f6624"/>
        <rect x="24" y="5" width="4" height="9" rx="2" fill="#2f6624"/>
        <rect x="8" y="26" width="6" height="5" rx="1" fill={GP}/>
        <rect x="17" y="26" width="6" height="5" rx="1" fill={GP}/>
        <rect x="26" y="26" width="6" height="5" rx="1" fill={GP}/>
      </svg>
    ),
    tag: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <path d="M5,6 L25,6 L37,20 L25,34 L5,34 Z" fill={GL}/>
        <circle cx="12" cy="13" r="3.5" fill={GP}/>
        <path d="M16,25 L26,15" stroke={GP} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M19,26 L29,16" stroke={GP} strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    store: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <polygon points="2,20 20,7 38,20" fill={GL}/>
        <rect x="5" y="18" width="30" height="18" rx="3" fill={G}/>
        <rect x="15" y="26" width="10" height="10" rx="2" fill={GP}/>
        <rect x="6" y="23" width="8" height="7" rx="1" fill={GP} opacity="0.6"/>
        <rect x="26" y="23" width="8" height="7" rx="1" fill={GP} opacity="0.6"/>
      </svg>
    ),
    trophy: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <path d="M11,5 L29,5 L27,20 C26,25 23,27 20,27 C17,27 14,25 13,20 Z" fill={Y}/>
        <path d="M11,5 L7,5 C6,5 4,7 4,11 C4,16 8,17 13,16" fill={GP}/>
        <path d="M29,5 L33,5 C34,5 36,7 36,11 C36,16 32,17 27,16" fill={GP}/>
        <rect x="16" y="27" width="8" height="6" fill={GL}/>
        <rect x="11" y="33" width="18" height="4" rx="2" fill={G}/>
        <circle cx="20" cy="15" r="4" fill={GL} opacity="0.6"/>
      </svg>
    ),
    star: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <polygon points="20,4 23.5,14.5 34.5,14.5 25.5,21 29,31.5 20,25 11,31.5 14.5,21 5.5,14.5 16.5,14.5" fill={Y}/>
      </svg>
    ),
    starEmpty: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <polygon points="20,4 23.5,14.5 34.5,14.5 25.5,21 29,31.5 20,25 11,31.5 14.5,21 5.5,14.5 16.5,14.5" fill={GP} opacity="0.6"/>
      </svg>
    ),
    check: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <circle cx="20" cy="20" r="17" fill={G}/>
        <path d="M11,20 L17,27 L29,13" stroke={GP} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    crown: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <path d="M5,31 L8,14 L20,25 L32,14 L35,31 Z" fill={Y}/>
        <rect x="5" y="31" width="30" height="5" rx="2" fill={G}/>
        <circle cx="8" cy="14" r="4" fill={GP}/>
        <circle cx="20" cy="25" r="4" fill={GP}/>
        <circle cx="32" cy="14" r="4" fill={GP}/>
      </svg>
    ),
    burst: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <polygon points="20,2 23,13 34,8 27,18 38,20 27,22 34,32 23,27 20,38 17,27 6,32 13,22 2,20 13,18 6,8 17,13" fill={R}/>
        <circle cx="20" cy="20" r="7" fill="#fff"/>
        <circle cx="20" cy="20" r="4" fill={R}/>
      </svg>
    ),
    shopping: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <path d="M7,16 L33,16 L30,35 L10,35 Z" fill={G}/>
        <path d="M14,16 Q14,9 20,9 Q26,9 26,16" stroke={GL} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <rect x="14" y="20" width="12" height="2" rx="1" fill={GP} opacity="0.7"/>
        <circle cx="15" cy="37" r="2.5" fill={GL}/>
        <circle cx="26" cy="37" r="2.5" fill={GL}/>
      </svg>
    ),
    book: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <rect x="3" y="5" width="14" height="30" rx="2" fill={G}/>
        <rect x="23" y="5" width="14" height="30" rx="2" fill={GL}/>
        <rect x="16" y="5" width="8" height="30" rx="1" fill={GP}/>
        <rect x="6" y="13" width="8" height="2" rx="1" fill={GP} opacity="0.6"/>
        <rect x="6" y="18" width="8" height="2" rx="1" fill={GP} opacity="0.6"/>
        <rect x="26" y="13" width="8" height="2" rx="1" fill={G} opacity="0.4"/>
        <rect x="26" y="18" width="8" height="2" rx="1" fill={G} opacity="0.4"/>
      </svg>
    ),
    ticket: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <rect x="2" y="11" width="36" height="22" rx="5" fill={G}/>
        <line x1="2" y1="22" x2="38" y2="22" stroke={GP} strokeWidth="1.5" strokeDasharray="3,2"/>
        <rect x="8" y="16" width="10" height="6" rx="1" fill={GP} opacity="0.5"/>
        <rect x="22" y="16" width="10" height="6" rx="1" fill={GP} opacity="0.5"/>
      </svg>
    ),
    organic: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <ellipse cx="20" cy="18" rx="13" ry="11" fill={G} transform="rotate(-10 20 18)"/>
        <ellipse cx="20" cy="18" rx="7" ry="9" fill={GL} transform="rotate(10 20 18)"/>
        <rect x="18" y="28" width="4" height="6" rx="2" fill={G}/>
        <rect x="12" y="33" width="16" height="2.5" rx="1.5" fill={GL}/>
      </svg>
    ),
    gift: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <rect x="5" y="17" width="30" height="19" rx="4" fill={G}/>
        <rect x="3" y="11" width="34" height="8" rx="3" fill={GL}/>
        <rect x="18.5" y="11" width="3" height="25" fill={GP}/>
        <path d="M21,11 C21,11 13,5 15,3 C17,1 21,9 21,9" fill={Y}/>
        <path d="M19,11 C19,11 27,5 25,3 C23,1 19,9 19,9" fill={Y}/>
      </svg>
    ),
    scan: (
      <svg viewBox="0 0 40 40" width={s} height={s}>
        <rect x="3" y="3" width="14" height="14" rx="2" fill={G}/>
        <rect x="6" y="6" width="8" height="8" rx="1" fill={GP}/>
        <rect x="23" y="3" width="14" height="14" rx="2" fill={G}/>
        <rect x="26" y="6" width="8" height="8" rx="1" fill={GP}/>
        <rect x="3" y="23" width="14" height="14" rx="2" fill={G}/>
        <rect x="6" y="26" width="8" height="8" rx="1" fill={GP}/>
        <rect x="25" y="25" width="4" height="4" rx="1" fill={GL}/>
        <rect x="31" y="25" width="4" height="4" rx="1" fill={GL}/>
        <rect x="25" y="31" width="4" height="4" rx="1" fill={GL}/>
        <rect x="31" y="31" width="4" height="4" rx="1" fill={GL}/>
      </svg>
    ),
  }
  return icons[type] ?? null
}
