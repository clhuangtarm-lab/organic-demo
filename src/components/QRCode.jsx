/**
 * Minimal SVG-based QR-like visual placeholder
 * (Real QR generation would use a library like qrcode.react)
 */
export default function QRCode({ data = '', size = 120 }) {
  // Generate a deterministic grid from the data string
  const hash = [...data].reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) | 0, 0)
  const cellCount = 21
  const cellSize = size / cellCount

  const cells = []
  for (let r = 0; r < cellCount; r++) {
    for (let c = 0; c < cellCount; c++) {
      const isCorner =
        (r < 7 && c < 7) || (r < 7 && c >= cellCount - 7) || (r >= cellCount - 7 && c < 7)
      const seed = (hash ^ (r * 137 + c * 31)) >>> 0
      const filled = isCorner ? true : (seed % 3 !== 0)

      cells.push(
        <rect
          key={`${r}-${c}`}
          x={c * cellSize}
          y={r * cellSize}
          width={cellSize - 0.5}
          height={cellSize - 0.5}
          fill={filled ? '#1b4332' : 'white'}
          rx={isCorner ? 0 : 0.5}
        />
      )
    }
  }

  // Corner finder patterns (white inner squares)
  const cornerInner = [
    { x: 1, y: 1 }, { x: cellCount - 6, y: 1 }, { x: 1, y: cellCount - 6 }
  ]

  return (
    <div style={{
      display: 'inline-block',
      background: 'white',
      padding: 8,
      borderRadius: 12,
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      border: '2px solid #e9ecef'
    }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ display: 'block' }}
      >
        <rect width={size} height={size} fill="white" />
        {cells}
        {/* Corner border squares */}
        {cornerInner.map((pos, i) => (
          <g key={i}>
            <rect
              x={pos.x * cellSize} y={pos.y * cellSize}
              width={5 * cellSize} height={5 * cellSize}
              fill="white" stroke="#1b4332" strokeWidth={cellSize * 0.8}
              rx={2}
            />
            <rect
              x={(pos.x + 1.5) * cellSize} y={(pos.y + 1.5) * cellSize}
              width={2 * cellSize} height={2 * cellSize}
              fill="#1b4332" rx={1}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
