import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import TopNav from '../components/TopNav'
import ProgressBar from '../components/ProgressBar'

const POINTS = [
  { icon: '🌍', title: '友善土地', desc: '有機農業禁止使用化學農藥與合成肥料，透過輪作、堆肥等方式恢復土壤活力。' },
  { icon: '💧', title: '保護水源', desc: '減少農藥流入水體，維護河川與地下水的潔淨，讓生態系統得以平衡。' },
  { icon: '🐝', title: '生物多樣性', desc: '友善農業提供昆蟲、鳥類棲息空間，讓農場成為自然生態的一部分。' },
]

export default function KnowledgePage1() {
  const navigate = useNavigate()
  return (
    <>
      <StatusBar />
      <TopNav title="有機農業知識" back="/scenario" />
      <ProgressBar step={1} total={5} label="知識第 1 頁 / 2" />

      <div className="page-scroll">
        {/* Hero banner */}
        <div style={{
          background: 'linear-gradient(135deg, #1b4332 0%, #40916c 100%)',
          padding: '28px 24px 32px',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', top: -30, right: -30,
            width: 130, height: 130, borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)'
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: 999, padding: '4px 12px',
              fontSize: '0.72rem', color: '#d8f3dc', fontWeight: 600
            }}>📖 知識單元 1</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', marginBottom: 8, lineHeight: 1.3 }}>
            什麼是<br />有機農業？
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#b7e4c7', lineHeight: 1.6 }}>
            有機農業是一種尊重自然循環的耕作方式，從土壤到餐桌，全面守護您與家人的健康。
          </p>
        </div>

        <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Definition card */}
          <div className="card card-pad" style={{ borderLeft: '4px solid #52b788' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1b4332', marginBottom: 8 }}>
              🌱 核心定義
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#495057', lineHeight: 1.65 }}>
              有機農業（Organic Farming）依據台灣《有機農業促進法》規範，
              強調<strong style={{ color: '#2d6a4f' }}>不使用化學農藥、化學肥料</strong>，
              透過自然方式維持農業生態系統的健康與永續。
            </p>
          </div>

          {/* Three pillars */}
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1b4332' }}>三大核心價值</h3>
          {POINTS.map(p => (
            <div key={p.title} className="card" style={{
              display: 'flex', gap: 14, padding: '16px'
            }}>
              <div style={{
                width: 48, height: 48, flexShrink: 0,
                background: '#d8f3dc', borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem'
              }}>{p.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1b4332', marginBottom: 4 }}>
                  {p.title}
                </div>
                <p style={{ fontSize: '0.82rem', color: '#495057', lineHeight: 1.55 }}>{p.desc}</p>
              </div>
            </div>
          ))}

          {/* Stat banner */}
          <div style={{
            background: 'linear-gradient(135deg, #d8f3dc, #b7e4c7)',
            borderRadius: 16, padding: '20px',
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 16, textAlign: 'center'
          }}>
            {[
              { num: '95%', label: '消費者認為有機更安心' },
              { num: '3x', label: '有機農地的生物多樣性' },
              { num: '40%', label: '減少碳排放潛力' },
              { num: '2024', label: '台灣有機認驗證年度' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1b4332' }}>{s.num}</div>
                <div style={{ fontSize: '0.72rem', color: '#2d6a4f', lineHeight: 1.3, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <button
            className="btn btn-primary btn-full btn-lg"
            onClick={() => navigate('/knowledge/2')}
            style={{ marginTop: 4 }}
          >
            下一頁：有機認證標章 →
          </button>
        </div>
      </div>
    </>
  )
}
