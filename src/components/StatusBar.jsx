export default function StatusBar() {
  const now = new Date()
  const time = now.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false })
  return (
    <div className="status-bar">
      <span className="status-bar-time">{time}</span>
      <div className="status-bar-icons">
        <span>●●●</span>
        <span>WiFi</span>
        <span>🔋</span>
      </div>
    </div>
  )
}
