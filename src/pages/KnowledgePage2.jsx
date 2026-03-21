import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import TopNav from '../components/TopNav'
import ProgressBar from '../components/ProgressBar'
import { getScenarioData } from '../data/scenarioData'

export default function KnowledgePage2() {
  const navigate = useNavigate()
  const scenario = getScenarioData()
  const k2 = scenario.knowledge2

  return (
    <>
      <StatusBar />
      <TopNav title="知識頁 2 / 2" back="/knowledge/1" />
      <ProgressBar step={2} total={5} label="知識第 2 頁" />

      <div className="page-scroll" style={{ background: '#fff' }}>
        {/* Banner */}
        <div style={{
          background: '#2f6624',
          padding: '28px 24px 32px',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', top: -30, right: -30,
            width: 120, height: 120, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)'
          }} />
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.18)',
            borderRadius: 999, padding: '4px 12px',
            fontSize: '0.72rem', color: '#e2f3dc', fontWeight: 600,
            marginBottom: 12
          }}>
            📖 知識單元 2
          </div>
          <h2 style={{
            fontSize: '1.45rem', fontWeight: 900,
            color: '#fff', marginBottom: 8, lineHeight: 1.3
          }}>
            {k2.title}
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#c4e8b8', lineHeight: 1.6 }}>
            繼續了解更多，完成後進入互動任務。
          </p>
        </div>

        <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Knowledge points */}
          {k2.points.map((p, i) => (
            <div key={i} className="card" style={{
              display: 'flex', gap: 14, padding: '16px',
              borderLeft: '3px solid #e2f3dc'
            }}>
              <div style={{
                width: 44, height: 44, flexShrink: 0,
                background: '#e2f3dc', borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem'
              }}>
                {p.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: 700, fontSize: '0.9rem',
                  color: '#2f6624', marginBottom: 5
                }}>
                  {p.title}
                </div>
                <p style={{ fontSize: '0.82rem', color: '#495057', lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Ready card */}
          <div style={{
            background: '#fff8e0', border: '1.5px solid #fec126',
            borderRadius: 14, padding: '16px 18px',
            display: 'flex', alignItems: 'center', gap: 14
          }}>
            <span style={{ fontSize: '1.8rem' }}>🎯</span>
            <div>
              <div style={{ fontWeight: 700, color: '#212529', marginBottom: 3 }}>
                知識讀完了！
              </div>
              <div style={{ fontSize: '0.8rem', color: '#6c757d', lineHeight: 1.5 }}>
                接下來進行互動任務，形式多樣，不只是選擇題。
              </div>
            </div>
          </div>

          <button
            className="btn btn-primary btn-full btn-lg"
            onClick={() => navigate('/quiz')}
          >
            開始互動任務 →
          </button>
        </div>
      </div>
    </>
  )
}
