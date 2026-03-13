import { useNavigate } from 'react-router-dom'

export default function TopNav({ title, back, rightEl }) {
  const navigate = useNavigate()
  return (
    <div className="top-nav">
      {back !== false && (
        <button className="top-nav-back" onClick={() => navigate(back || -1)}>←</button>
      )}
      <span className="top-nav-title">{title}</span>
      {rightEl && rightEl}
      {!rightEl && back === false && (
        <span className="top-nav-logo">🌱 有機生活</span>
      )}
    </div>
  )
}
