import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar'
import TopNav from '../components/TopNav'
import ProgressBar from '../components/ProgressBar'

const LABELS = [
  {
    emoji: '🟢', name: '有機農產品', org: '農業部', color: '#2d6a4f',
    bg: '#d8f3dc', desc: '台灣官方認證，通過第三方驗證機構查核，確保全程不使用禁用農藥。'
  },
  {
    emoji: '🌿', name: 'USDA Organic', org: '美國農業部', color: '#1565c0',
    bg: '#e8f4fd', desc: '美國有機認證標準，95% 以上成分須為有機，廣受國際消費者信賴。'
  },
  {
    emoji: '🇪🇺', name: 'EU Organic', org: '歐盟', color: '#6f42c1',
    bg: '#f3e8ff', desc: '歐盟有機農業標準，嚴格規範從農場到加工的全程管理。'
  },
]

const TIPS = [
  { icon: '🔍', text: '購買前查看包裝上的有機驗證號碼' },
  { icon: '📱', text: '使用農業部 App 掃描確認驗證真偽' },
  { icon: '🏪', text: '選擇信譽良好的有機專門店或通路' },
  { icon: '🤝', text: '認識在地有機農夫，建立直接信任關係' },
]

export default function KnowledgePage2() {
  const navigate = useNavigate()
  return (
    <>
      <StatusBar />
      <TopNav title="有機認證標章" back="/knowledge/1" />
      <ProgressBar step={2} total={5} label="知識第 2 頁 / 2" />

      <div className="page-scroll">
        {/* Hero */}
        <div style={{
          background: 'linear-gradient(135deg, #40916c 0%, #74c69d 100%)',
          padding: '28px 24px 32px'
        }}>
          <span style={{
            background: 'rgba(255,255,255,0.2)', borderRadius: 999,
            padding: '4px 12px', fontSize: '0.72rem',
            color: '#d8f3dc', fontWeight: 600, display: 'inline-block', marginBottom: 12
          }}>📖 知識單元 2</span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', marginBottom: 8, lineHeight: 1.3 }}>
            如何辨識<br />有機認證標章？
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#d8f3dc', lineHeight: 1.6 }}>
            認識標章是購買有機商品的第一步，別讓假有機蒙騙您！
          </p>
        </div>

        <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1b4332' }}>主要認證標章</h3>

          {LABELS.map(l => (
            <div key={l.name} className="card" style={{ overflow: 'visible' }}>
              <div style={{
                background: l.bg, padding: '16px',
                display: 'flex', gap: 14, alignItems: 'center'
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: '#fff', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  flexShrink: 0
                }}>{l.emoji}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: l.color }}>{l.name}</div>
                  <div style={{
                    fontSize: '0.72rem', color: '#6c757d',
                    background: 'rgba(255,255,255,0.6)',
                    borderRadius: 999, padding: '2px 8px',
                    display: 'inline-block', marginTop: 4
                  }}>發行：{l.org}</div>
                </div>
              </div>
              <div style={{ padding: '12px 16px' }}>
                <p style={{ fontSize: '0.83rem', color: '#495057', lineHeight: 1.55 }}>{l.desc}</p>
              </div>
            </div>
          ))}

          {/* Warning box */}
          <div style={{
            background: '#fff8f6', border: '1.5px solid #f4a261',
            borderRadius: 14, padding: '16px'
          }}>
            <div style={{ fontWeight: 700, color: '#e76f51', marginBottom: 8, fontSize: '0.9rem' }}>
              ⚠️ 注意！常見標示陷阱
            </div>
            <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                '"天然" ≠ 有機，無認證不算數',
                '"無農藥" 不等於通過有機驗證',
                '偽造標章已違反《有機農業促進法》',
              ].map(t => (
                <li key={t} style={{ fontSize: '0.82rem', color: '#6c757d', lineHeight: 1.5 }}>{t}</li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div className="card card-pad">
            <h4 style={{ fontWeight: 700, color: '#1b4332', marginBottom: 12 }}>🛒 聰明選購小技巧</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {TIPS.map(t => (
                <div key={t.text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1rem', flexShrink: 0 }}>{t.icon}</span>
                  <span style={{ fontSize: '0.83rem', color: '#495057', lineHeight: 1.5 }}>{t.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ready hint */}
          <div style={{
            background: 'linear-gradient(135deg, #d8f3dc, #b7e4c7)',
            borderRadius: 16, padding: '16px 20px',
            display: 'flex', alignItems: 'center', gap: 14
          }}>
            <span style={{ fontSize: '1.8rem' }}>🎯</span>
            <div>
              <div style={{ fontWeight: 700, color: '#1b4332', marginBottom: 2 }}>知識學習完成！</div>
              <div style={{ fontSize: '0.8rem', color: '#2d6a4f' }}>準備好接受問答挑戰了嗎？</div>
            </div>
          </div>

          <button
            className="btn btn-primary btn-full btn-lg"
            onClick={() => navigate('/quiz')}
          >
            開始問答挑戰 🎯
          </button>
        </div>
      </div>
    </>
  )
}
