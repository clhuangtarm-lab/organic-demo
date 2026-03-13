export default function ProgressBar({ step, total, label }) {
  const pct = Math.round((step / total) * 100)
  return (
    <div className="progress-bar-wrap">
      <div className="progress-label">
        <span>{label || `步驟 ${step} / ${total}`}</span>
        <span>{pct}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
