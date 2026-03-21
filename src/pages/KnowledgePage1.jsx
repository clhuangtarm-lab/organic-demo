import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import TopNav from '../components/TopNav'
import ProgressBar from '../components/ProgressBar'
import SproutCharacter from '../components/SproutCharacter'
import { getScenarioData, loadCharacterStage } from '../data/scenarioData'

export default function KnowledgePage1() {
  const navigate = useNavigate()
  const scenario = getScenarioData()
  const charStage = loadCharacterStage()
  const k1 = scenario.knowledge1

  return (
    <>
      <StatusBar />
      <TopNav title="知識頁 1 / 2" back="/scenario" />
      <ProgressBar step={1} total={5} label="知識第 1 頁" />

      <div className="page-scroll" style={{ background: '#fff' }}>
        {/* Opening banner */}
        <div style={{
          background: '#468f37',
          padding: '28px 24px 32px',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', top: -30, right: -30,
            width: 120, height: 120, borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)'
          }} />
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.18)',
            borderRadius: 999, padding: '4px 12px',
            fontSize: '0.72rem', color: '#e2f3dc', fontWeight: 600,
            marginBottom: 12
          }}>
            📖 知識單元 1
          </div>
          <h2 style={{
            fontSize: '1.45rem', fontWeight: 900,
            color: '#fff', marginBottom: 8, lineHeight: 1.3
          }}>
            {scenario.openTitle}
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#c4e8b8', lineHeight: 1.6 }}>
            {scenario.openSubtitle}
          </p>
        </div>

        <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Section title */}
          <div style={{
            borderLeft: '4px solid #468f37',
            paddingLeft: 14
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#212529', lineHeight: 1.4 }}>
              {k1.title}
            </h3>
          </div>

          {/* Knowledge points */}
          {k1.points.map((p, i) => (
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

          {/* Character message */}
          <div style={{
            background: '#f6fbf4', border: '1px solid #e2f3dc',
            borderRadius: 12, padding: '12px 14px',
            display: 'flex', gap: 12, alignItems: 'center'
          }}>
            <SproutCharacter stage={charStage} size={40} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#2f6624', marginBottom: 2 }}>
                第 1 頁完成！
              </div>
              <div style={{ fontSize: '0.78rem', color: '#6c757d' }}>
                一起把這個任務完成吧。
              </div>
            </div>
          </div>

          <button
            className="btn btn-primary btn-full btn-lg"
            onClick={() => navigate('/knowledge/2')}
          >
            下一頁 →
          </button>
        </div>
      </div>
    </>
  )
}
