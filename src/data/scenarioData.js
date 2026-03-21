// ============================================================
// Scenario Content Data — 3 independent groups
// ============================================================

export const SCENARIO_DATA = {
  event: {
    id: 'event',
    openTitle: '30 秒認識有機農業的關鍵',
    openSubtitle: '完成這個小任務，一起了解有機農業為什麼受到重視。',
    knowledge1: {
      title: '有機農業，為什麼對土地更友善？',
      points: [
        {
          icon: '🚫',
          title: '不使用化學合成農藥與化學肥料',
          desc: '有機農業在生產過程中，不使用化學合成農藥與化學肥料，以自然方式管理農作物。',
        },
        {
          icon: '🌱',
          title: '重視土壤健康與自然循環',
          desc: '透過輪作、堆肥等方式維持土壤活力，讓土地能長期維持生命力。',
        },
        {
          icon: '🌍',
          title: '希望降低對環境的負擔',
          desc: '也希望降低農業對環境的負擔，讓生產方式更貼近自然，對土地更負責。',
        },
      ],
    },
    knowledge2: {
      title: '有機農業，重視土壤與生態平衡',
      points: [
        {
          icon: '🌾',
          title: '土壤管理與生態平衡',
          desc: '有機農業重視土壤管理與生態平衡，讓農地維持自然的活力與生物多樣性。',
        },
        {
          icon: '♻️',
          title: '資源循環與友善耕作',
          desc: '重視資源循環與友善耕作方式，減少對自然環境的干擾與消耗。',
        },
        {
          icon: '📌',
          title: '讓生產方式更貼近永續方向',
          desc: '透過這些做法，讓農業生產更貼近永續方向，對土地與生態更加友善。',
        },
      ],
    },
    quiz: [
      {
        type: 'swipe',
        title: '左右判斷：這些說法正確嗎？',
        subtitle: '往右 ✓ 代表正確，往左 ✗ 代表不正確',
        cards: [
          { text: '有機農業不使用化學合成農藥與化學肥料', answer: true },
          { text: '有機農業「只是不灑農藥」就算符合規範', answer: false },
          { text: '有機農業重視土壤健康與自然循環', answer: true },
          { text: '包裝標示「天然」就等於通過有機認證', answer: false },
        ],
      },
      {
        type: 'keyword',
        title: '點選關鍵字，完成句子',
        subtitle: '依序點選正確詞語，填入空格中',
        template: ['有機農業不使用化學合成', '', '，更重視', '', '健康，希望降低對', '', '的負擔。'],
        blanks: ['農藥與化學肥料', '土壤', '環境'],
        options: ['農藥與化學肥料', '土壤', '環境', '人工添加物', '溫度', '市場'],
      },
    ],
    badge: '體驗先鋒',
    badgeId: 'pioneer',
    completeText: '你已完成活動限定任務。角色成長 1 階段，並獲得徽章：體驗先鋒 V1。現在可解鎖有機體驗折價券。',
  },

  member: {
    id: 'member',
    openTitle: '從日常選擇，認識有機生活',
    openSubtitle: '你每天的消費選擇，也可能影響土地與生產方式。',
    knowledge1: {
      title: '我們每天的選擇，和土地有關',
      points: [
        {
          icon: '🥦',
          title: '食物從土地而來',
          desc: '食物從土地而來，也和耕作方式有關。我們每天的飲食，都與農業生產息息相關。',
        },
        {
          icon: '🤝',
          title: '支持更重視環境的生產方式',
          desc: '支持有機，是支持更重視環境的生產方式，也支持願意投入永續耕作的農友。',
        },
        {
          icon: '💡',
          title: '消費選擇有其意義',
          desc: '每一次選擇，都是對生產方式的一種回應，讓消費和生產方向互相影響。',
        },
      ],
    },
    knowledge2: {
      title: '有機生活，重點不只是在購買',
      points: [
        {
          icon: '📖',
          title: '理解食物來源',
          desc: '有機生活也是更理解食物來源與生產方式，讓自己對吃進去的東西更有概念。',
        },
        {
          icon: '💧',
          title: '重視土地、水源與生態',
          desc: '更重視土地、水源與生態，了解農業生產和自然環境之間的關係。',
        },
        {
          icon: '♻️',
          title: '讓消費選擇和永續價值連結',
          desc: '讓消費選擇和永續價值連結起來，是有機生活方式的一部分。',
        },
      ],
    },
    quiz: [
      {
        type: 'scenario2',
        title: '在這個情境中，你會怎麼選？',
        scenario: '在超市選購蔬菜時...',
        options: [
          {
            label: 'A',
            text: '選擇標示有有機驗證的產品，多了解一些再決定',
            isCorrect: true,
            feedback: '這樣的選擇讓你更了解食物的生產方式，也支持重視環境的農友。',
          },
          {
            label: 'B',
            text: '只看外觀和價格，不特別留意產品標示',
            isCorrect: false,
            feedback: '標示資訊可以幫助你了解食物的生產方式，多留意有助於做出更有方向的選擇。',
          },
        ],
      },
      {
        type: 'drag',
        title: '配對看看：左邊的概念，對應右邊哪個說明？',
        subtitle: '先點左欄，再點右欄完成配對',
        pairs: [
          { left: '有機驗證', right: '經第三方機構查核確認' },
          { left: '友善耕作', right: '重視土壤與生態的方式' },
          { left: '永續消費', right: '讓消費選擇和環境價值連結' },
        ],
      },
    ],
    badge: '有機生活家',
    badgeId: 'lifestyle',
    completeText: '你已完成會員專屬任務。角色成長 1 階段，並獲得徽章：有機生活家 V1。現在可解鎖會員專屬體驗券。',
  },

  product: {
    id: 'product',
    openTitle: '選購有機商品，先看懂這幾件事',
    openSubtitle: '在購買之前，先學會看懂有機商品的重要資訊。',
    knowledge1: {
      title: '選購有機商品，可以先看標示',
      points: [
        {
          icon: '🏷️',
          title: '留意包裝上的有機驗證標示',
          desc: '可先留意包裝上是否有有機驗證標示，這是由第三方機構查核認可的重要標記。',
        },
        {
          icon: '📋',
          title: '也可以看產品來源與相關資訊',
          desc: '也可以看產品來源與相關說明，了解商品的生產背景，幫助自己更有依據地判斷。',
        },
        {
          icon: '✅',
          title: '幫助做出更安心的選擇',
          desc: '這些資訊可以幫助你做出更安心的選擇，不只依賴廣告說法或包裝外觀。',
        },
      ],
    },
    knowledge2: {
      title: '看懂資訊，選擇更有方向',
      points: [
        {
          icon: '🔍',
          title: '選購不只是看價格或包裝',
          desc: '選購不只是看價格或包裝外觀，標示資訊同樣值得留意，是了解商品的重要依據。',
        },
        {
          icon: '📌',
          title: '留意產品標示是否清楚',
          desc: '也可以留意產品標示是否清楚完整，標示不清的商品較難判斷其生產方式。',
        },
        {
          icon: '📦',
          title: '多了解來源，選擇更有依據',
          desc: '多了解來源資訊，有助於判斷商品資訊，讓購買更有依據、更有方向。',
        },
      ],
    },
    quiz: [
      {
        type: 'multiselect',
        title: '選購有機商品時，哪些資訊值得留意？',
        subtitle: '點選所有值得留意的項目',
        options: [
          { text: '有機驗證標示', correct: true },
          { text: '漂亮的包裝設計', correct: false },
          { text: '產品來源資訊', correct: true },
          { text: '廣告語「天然有機」', correct: false },
          { text: '標示是否清楚完整', correct: true },
          { text: '商品擺放的位置', correct: false },
        ],
      },
      {
        type: 'scenario2',
        title: '在這個情境中，你會怎麼選？',
        scenario: '看到包裝上印著「天然有機」，但找不到任何驗證標章...',
        options: [
          {
            label: 'A',
            text: '相信包裝上的說法，直接購買',
            isCorrect: false,
            feedback: '「天然有機」只是廣告用詞，不代表通過有機驗證。建議先確認是否有官方驗證標示。',
          },
          {
            label: 'B',
            text: '查看是否有官方有機驗證標示，再做決定',
            isCorrect: true,
            feedback: '這樣的判斷方式讓你更有依據地選擇商品，不容易被廣告用詞影響。',
          },
        ],
      },
    ],
    badge: '消費高手',
    badgeId: 'shopper',
    completeText: '你已完成商品推薦任務。角色成長 1 階段，並獲得徽章：消費高手 V1。立即解鎖本次有機體驗折價券。',
  },
}

// ============================================================
// Badge definitions (shared across scenarios)
// ============================================================
export const BADGE_DEFS = {
  pioneer: {
    id: 'pioneer',
    name: '體驗先鋒',
    scenarioId: 'event',
    desc: '完成活動限定任務',
  },
  lifestyle: {
    id: 'lifestyle',
    name: '有機生活家',
    scenarioId: 'member',
    desc: '完成會員專屬任務',
  },
  shopper: {
    id: 'shopper',
    name: '消費高手',
    scenarioId: 'product',
    desc: '完成商品推薦任務',
  },
}

// Badge version level names + character stage
export const BADGE_VERSION = {
  1: { label: 'V1', stageName: '發芽', characterStage: 1 },
  2: { label: 'V2', stageName: '長葉', characterStage: 2 },
  3: { label: 'V3', stageName: '開花', characterStage: 3 },
}

// ============================================================
// Mock badge data for demo (pre-populated to show upgrade path)
// ============================================================
export const MOCK_BADGES_DEMO = {
  pioneer:   { version: 2 }, // 長葉 — shows upgrade is possible
  lifestyle: { version: 1 }, // 發芽 — just earned
  shopper:   { version: 3 }, // 開花 — maxed out
}

// ============================================================
// localStorage helpers
// ============================================================
export function loadBadges() {
  try {
    return JSON.parse(localStorage.getItem('organic_badges') || 'null') || { pioneer: { version: 0 }, lifestyle: { version: 0 }, shopper: { version: 0 } }
  } catch { return { pioneer: { version: 0 }, lifestyle: { version: 0 }, shopper: { version: 0 } } }
}

export function saveBadges(badges) {
  localStorage.setItem('organic_badges', JSON.stringify(badges))
}

export function loadCharacterStage() {
  return parseInt(localStorage.getItem('organic_character_stage') || '0', 10)
}

export function saveCharacterStage(stage) {
  localStorage.setItem('organic_character_stage', String(Math.min(3, stage)))
}

export function getScenarioData() {
  try {
    const raw = localStorage.getItem('organic_scenario')
    if (!raw) return SCENARIO_DATA.event
    const saved = JSON.parse(raw)
    return SCENARIO_DATA[saved.id] || SCENARIO_DATA.event
  } catch { return SCENARIO_DATA.event }
}
