// ============================================================
// Scenario Content Data — 3 groups × 3 stages = 9 tasks
// Each stage has exactly 2 quiz questions (18 total)
// ============================================================

const makeStage = (stageNum, stageName, openTitle, openSubtitle, k1pts, k2pts, quiz, completeText) => ({
  stageNum, stageName, openTitle, openSubtitle,
  knowledge1: { title: openTitle, points: k1pts },
  knowledge2: { title: openTitle + '（續）', points: k2pts },
  quiz, completeText,
})

export const SCENARIO_DATA = {

  // ── 活動限定 ──────────────────────────────────────────────
  event: {
    id: 'event', badge: '體驗先鋒', badgeId: 'pioneer',
    stages: [
      makeStage(1, '發芽',
        '活動限定入門任務',
        '用一個小任務，快速認識有機農業的基本概念。',
        [
          { icon: '🚫', title: '不使用化學合成農藥與化學肥料', desc: '有機農業在生產過程中，不使用化學合成農藥與化學肥料，以自然方式管理農作物。' },
          { icon: '🌱', title: '重視土壤健康與自然循環', desc: '透過輪作、堆肥等方式維持土壤活力，讓土地能長期維持生命力。' },
          { icon: '🌍', title: '希望降低對環境的負擔', desc: '讓生產方式更貼近自然，對土地更負責，也是有機農業的重要方向。' },
        ],
        [
          { icon: '🌾', title: '土壤是農業的基礎', desc: '健康的土壤能讓作物自然生長，有機農業透過友善管理，維持土壤的長期活力。' },
          { icon: '♻️', title: '自然循環的重要性', desc: '重視資源循環與友善耕作方式，減少對自然環境的干擾與消耗。' },
          { icon: '💡', title: '了解更多有機農業', desc: '可透過農糧署有機農業資訊平台，查詢更多有關有機農業的知識與認證資訊。' },
        ],
        [
          // Q1: 點選正確關鍵字 (multiselect)
          {
            type: 'multiselect',
            title: '下面哪些比較符合有機農業的重點？',
            subtitle: '請選出所有正確的項目',
            options: [
              { text: '土壤健康', correct: true },
              { text: '自然循環', correct: true },
              { text: '快速催長', correct: false },
            ],
          },
          // Q2: 二選一 (scenario2)
          {
            type: 'scenario2',
            title: '有機農產品的生產，是否可以使用化學合成農藥？',
            scenario: '關於有機農業，請選出正確的說法：',
            options: [
              { label: 'A', text: '可以，只要量不多就沒關係', isCorrect: false, feedback: '有機農業明確規範不得使用化學合成農藥，這是有機農業的核心原則之一。' },
              { label: 'B', text: '不可以，有機農業不使用化學合成農藥', isCorrect: true, feedback: '正確！有機農業不使用化學合成農藥與化學肥料，這是其基本生產原則。' },
            ],
          },
        ],
        '你完成了活動限定的發芽任務。小芽芽發芽了，並獲得體驗先鋒 V1。',
      ),

      makeStage(2, '長葉',
        '活動限定進階任務',
        '再往前一步，認識有機農業如何連結土壤與生態。',
        [
          { icon: '🌿', title: '有機農業不只是避免特定投入', desc: '有機農業不只是避免化學合成農藥與化學肥料，還包含一整套重視生態的管理方式。' },
          { icon: '🦋', title: '也重視生態平衡與友善管理', desc: '有機農業重視生態平衡，鼓勵農地上的生物多樣性，與自然共存而非對抗。' },
          { icon: '🌐', title: '強調更永續的生產方向', desc: '以長遠的眼光看待土地，讓農業生產方向更貼近永續，對土地、水源與生態都更友善。' },
        ],
        [
          { icon: '📋', title: '有機農業有原則依據', desc: '有機農業依循一套重視土壤、生態與管理方式的原則，不是模糊的「看起來自然」。' },
          { icon: '🔍', title: '驗證標示是重要參考', desc: '有機驗證由第三方機構查核，包裝上的驗證標示是判斷商品是否符合有機規範的依據。' },
          { icon: '🏪', title: '認可通路讓選購更安心', desc: '在里仁、主婦聯盟等有機認可通路，可以找到有驗證依據的有機農產品。' },
        ],
        [
          // Q1: 二選一 (scenario2)
          {
            type: 'scenario2',
            title: '哪一種說法比較接近有機農業？',
            scenario: '以下兩種說法，哪一種更符合有機農業的精神？',
            options: [
              { label: 'A', text: '只要包裝看起來自然就是有機', isCorrect: false, feedback: '「看起來自然」是主觀印象，有機農業有一套具體的原則與驗證標準，不是外觀判斷。' },
              { label: 'B', text: '有機農業有一套重視土壤、生態與管理方式的原則', isCorrect: true, feedback: '正確！有機農業依循明確的生產原則，並需通過第三方機構驗證，不只是外觀或廣告說法。' },
            ],
          },
          // Q2: 點選辨識 (multiselect)
          {
            type: 'multiselect',
            title: '有機農業較重視哪些方向？',
            subtitle: '請選出所有正確的項目',
            options: [
              { text: '生態平衡', correct: true },
              { text: '資源循環', correct: true },
              { text: '單純追求最快產量', correct: false },
            ],
          },
        ],
        '你完成了活動限定的長葉任務。小芽芽長出新葉，並升級為體驗先鋒 V2。',
      ),

      makeStage(3, '開花',
        '活動限定挑戰任務',
        '完成這個挑戰，進一步理解有機農業受到重視的原因。',
        [
          { icon: '💧', title: '有機農業和土地、水源、生態都有關', desc: '有機農業不只影響農作物本身，對周邊土壤微生物、水源品質與生物多樣性都有正面的潛在影響。' },
          { icon: '🤝', title: '消費者支持，也會影響生產方向', desc: '當消費者選擇有機農產品，農友就有更多動力維持有機耕作，形成生產與消費的良性互動。' },
          { icon: '💡', title: '理解生產方式，有助於做出更有意識的選擇', desc: '了解有機農業的意義，讓你的每一次選購都更有方向，不只是被廣告語或包裝外觀影響。' },
        ],
        [
          { icon: '🌱', title: '土壤健康是農業永續的基礎', desc: '健康的土壤是一切農業生產的根基，有機農業透過友善管理，讓土地能長期維持活力。' },
          { icon: '⚖️', title: '生態平衡讓農業更穩定', desc: '生態平衡讓農地上的自然系統更完整，減少病蟲害爆發的風險，也讓農業生產更穩定持續。' },
          { icon: '🔄', title: '了解背後原因，才能更好地支持', desc: '當你理解有機農業為什麼重要，就能做出更有依據的消費選擇，也更能向身邊的人解釋。' },
        ],
        [
          // Q1: 拖曳配對 (drag) — unique right items
          {
            type: 'drag',
            title: '請把下列內容配對到對應類別',
            subtitle: '先點左欄，再點右欄完成配對',
            pairs: [
              { left: '土壤健康', right: '有機農業較重視' },
              { left: '快速催長', right: '有機農業較不重視' },
            ],
          },
          // Q2: 情境判斷 (scenario2)
          {
            type: 'scenario2',
            title: '為什麼有機農業會受到重視？',
            scenario: '以下兩種說法，哪一種更接近有機農業受到重視的原因？',
            options: [
              { label: 'A', text: '因為它和土地、環境、生產方式有關', isCorrect: true, feedback: '正確！有機農業受到重視，是因為它對土地、水源、生態等環境面向有正面的意義。' },
              { label: 'B', text: '因為它只是外觀看起來比較特別', isCorrect: false, feedback: '有機農業的價值在於其生產方式對環境的友善，而非外觀或包裝的不同。' },
            ],
          },
        ],
        '你完成了活動限定的開花任務。小芽芽開花了，並升級為體驗先鋒 V3。',
      ),
    ],
  },

  // ── 會員專屬 ──────────────────────────────────────────────
  member: {
    id: 'member', badge: '有機生活家', badgeId: 'lifestyle',
    stages: [
      makeStage(1, '發芽',
        '會員專屬生活任務',
        '從日常選擇開始，認識有機生活與土地的關係。',
        [
          { icon: '🥦', title: '食物來自土地，也和耕作方式有關', desc: '我們每天吃的食物，都與農業生產方式息息相關。耕作方式影響土地，也影響我們的餐桌。' },
          { icon: '🛒', title: '消費選擇會影響生產方向', desc: '消費者對有機農產品的選擇，會讓農友更有動力維持友善耕作，消費端與生產端是相互影響的。' },
          { icon: '🌱', title: '支持有機，也是在支持更重視環境的方式', desc: '選擇有機農產品，是對一種更重視土地與環境的生產方式表達支持，讓這樣的農業方向能夠持續。' },
        ],
        [
          { icon: '🤝', title: '農友與消費者共同建立良性循環', desc: '有機農業需要農友的投入，也需要消費端的支持。兩者共同運作，才能讓永續農業持續發展。' },
          { icon: '📖', title: '理解選擇背後的意義', desc: '了解你所購買的食物是如何生產的，讓消費選擇不只是價格比較，而是對生產方式的認識。' },
          { icon: '💚', title: '日常選擇都有其意義', desc: '每一次留意標示、選擇有依據的商品，都是對永續農業方向的一種參與與支持。' },
        ],
        [
          // Q1: 情境式二選一 (scenario2)
          {
            type: 'scenario2',
            title: '支持有機農產品，較接近哪一種意義？',
            scenario: '你在選購蔬果時，選了有有機驗證標示的產品，這個選擇的意義比較接近哪一種說法？',
            options: [
              { label: 'A', text: '支持更重視環境的生產方式', isCorrect: true, feedback: '正確！選擇有機驗證的農產品，是對一種更重視土地與環境的農業生產方式表達支持。' },
              { label: 'B', text: '只是在買比較流行的商品', isCorrect: false, feedback: '有機農業有其具體的生產原則與驗證依據，選擇有機農產品有其意義，不只是跟隨流行趨勢。' },
            ],
          },
          // Q2: 點選正確敘述 (multiselect)
          {
            type: 'multiselect',
            title: '哪些說法較符合有機生活的方向？',
            subtitle: '請選出所有正確的項目',
            options: [
              { text: '理解食物來源', correct: true },
              { text: '關心耕作方式', correct: true },
              { text: '只看最低價格', correct: false },
            ],
          },
        ],
        '你完成了會員專屬的發芽任務。小芽芽發芽了，並獲得有機生活家 V1。',
      ),

      makeStage(2, '長葉',
        '會員專屬進階任務',
        '理解有機生活，不只是買商品，更是理解生產方式。',
        [
          { icon: '📖', title: '有機生活也包括理解來源', desc: '有機生活不只是選購有機商品，也包含對食物來源與生產方式的理解與關心。' },
          { icon: '💧', title: '更重視土地、水源與生態', desc: '有機生活方式更重視農業生產對土地、水源與生態的影響，了解農業生產和自然環境的關係。' },
          { icon: '♻️', title: '讓消費與永續價值連結起來', desc: '讓消費選擇與永續價值連結，是有機生活方式的一部分，不只是購買行為的選擇。' },
        ],
        [
          { icon: '🗺️', title: '了解食物的完整旅程', desc: '食物從土地到餐桌，中間經歷農業生產、運輸、加工等環節。了解這個旅程，有助於更有意識地選擇。' },
          { icon: '🌊', title: '農業與水源的關係', desc: '農業用水佔全球淡水使用的重要比例，有機農業對水源的友善管理，是其永續意義的一部分。' },
          { icon: '🌏', title: '在地選購也有其意義', desc: '選購在地有機農產品，除了支持在地農友，也能減少長途運輸的資源消耗。' },
        ],
        [
          // Q1: 拖曳配對 (drag) — unique right items
          {
            type: 'drag',
            title: '請將下列內容配對到對應類別',
            subtitle: '先點左欄，再點右欄完成配對',
            pairs: [
              { left: '食物來源', right: '有機生活較重視' },
              { left: '只看包裝是否吸引人', right: '有機生活較不重視' },
            ],
          },
          // Q2: 二選一 (scenario2)
          {
            type: 'scenario2',
            title: '有機生活的重點，比較接近哪一種？',
            scenario: '以下兩種描述，哪一種更符合有機生活的精神？',
            options: [
              { label: 'A', text: '更理解生產方式與土地關係', isCorrect: true, feedback: '正確！有機生活的核心是對食物來源與生產方式的持續理解和關心。' },
              { label: 'B', text: '只要買一次有機商品就算完成', isCorrect: false, feedback: '有機生活是一種持續的態度，不是單次購買就完成，而是對生產方式的長期關心。' },
            ],
          },
        ],
        '你完成了會員專屬的長葉任務。小芽芽長葉了，並升級為有機生活家 V2。',
      ),

      makeStage(3, '開花',
        '會員專屬挑戰任務',
        '完成這一步，讓你的有機生活理解更完整。',
        [
          { icon: '🌿', title: '有機生活不是單一消費選擇', desc: '有機生活的精神，不只是偶爾選購一個有機商品，而是對食物來源與生產方式持續的關心。' },
          { icon: '📚', title: '也包含對生產方式的認識', desc: '了解你所購買的食物是如何生產的，讓你的選擇建立在認識之上，而不只是廣告語或包裝外觀。' },
          { icon: '🔄', title: '長期支持，才能讓永續方向更穩定', desc: '消費者穩定的支持，讓農友有動力持續有機耕作，也讓永續農業的方向更加穩定發展。' },
        ],
        [
          { icon: '👪', title: '從個人選擇到影響身邊的人', desc: '當你建立了有機選購的習慣，也可以把這些認識分享給家人朋友，讓影響範圍逐漸擴大。' },
          { icon: '💬', title: '分享知識，一起建立更好的選擇', desc: '把對有機農業的了解分享給周圍的人，讓更多消費者有機會做出更有意識的選擇。' },
          { icon: '🌱', title: '從理解開始，每一步都算數', desc: '有機生活不需要一次全面改變，從理解開始，逐步讓選擇更有方向，每一步都有其意義。' },
        ],
        [
          // Q1: 點選正確敘述 (multiselect)
          {
            type: 'multiselect',
            title: '以下哪些較符合有機生活的精神？',
            subtitle: '請選出所有正確的項目',
            options: [
              { text: '理解食物來源', correct: true },
              { text: '關心環境與生產方式', correct: true },
              { text: '只看價格最低就好', correct: false },
            ],
          },
          // Q2: 情境判斷 (scenario2)
          {
            type: 'scenario2',
            title: '支持有機農產品，除了購買商品，也代表支持哪一種方向？',
            scenario: '選購有機農產品這個行為，除了得到商品本身，更代表支持哪一種方向？',
            options: [
              { label: 'A', text: '更重視環境與永續的生產方式', isCorrect: true, feedback: '正確！每一次選擇有機農產品，都是對更友善土地的生產方式的一種支持與參與。' },
              { label: 'B', text: '更快速的大量生產方式', isCorrect: false, feedback: '有機農業重視環境友善，不是追求更快速的大量生產，而是更永續的耕作方式。' },
            ],
          },
        ],
        '你完成了會員專屬的開花任務。小芽芽開花了，並升級為有機生活家 V3。',
      ),
    ],
  },

  // ── 商品推薦 ──────────────────────────────────────────────
  product: {
    id: 'product', badge: '消費高手', badgeId: 'shopper',
    stages: [
      makeStage(1, '發芽',
        '商品推薦入門任務',
        '先從看懂商品資訊開始，建立有機選購的第一步。',
        [
          { icon: '🏷️', title: '選購有機商品可先看有機驗證標示', desc: '包裝上的有機驗證標示，是由第三方機構查核認可的重要標記，是選購時的重要參考依據。' },
          { icon: '📋', title: '也可以留意產品來源資訊', desc: '產品來源說明讓你了解商品的生產背景，幫助自己更有依據地判斷，而非只靠廣告語。' },
          { icon: '✅', title: '幫助自己做出更安心的選擇', desc: '這些資訊可以幫助你做出更安心的選擇，讓選購建立在具體資訊上，而非廣告說法或包裝外觀。' },
        ],
        [
          { icon: '🔍', title: '標示清楚，判斷更有依據', desc: '標示清楚的商品，讓消費者更容易了解產品的生產方式，也更容易做出有方向的選擇。' },
          { icon: '📌', title: '查詢驗證資訊', desc: '可透過農委會農糧署有機農業資訊平台，查詢產品驗證字號，確認標示的真實性。' },
          { icon: '🏪', title: '在認可通路選購更方便', desc: '在里仁、主婦聯盟等有機認可通路，可以找到有驗證依據的有機農產品，選購更有保障。' },
        ],
        [
          // Q1: 點選辨識 (multiselect)
          {
            type: 'multiselect',
            title: '選購有機商品時，哪些資訊值得先留意？',
            subtitle: '請選出所有正確的項目',
            options: [
              { text: '有機驗證標示', correct: true },
              { text: '來源資訊', correct: true },
              { text: '包裝顏色', correct: false },
            ],
          },
          // Q2: 二選一 (scenario2)
          {
            type: 'scenario2',
            title: '選購有機商品時，哪一項比較值得優先注意？',
            scenario: '你站在超市貨架前，想選購有機農產品，你會優先注意哪一項？',
            options: [
              { label: 'A', text: '是否有清楚標示與來源資訊', isCorrect: true, feedback: '正確！標示和來源資訊是選購的重要依據，能幫助你做出更有根據的選擇。' },
              { label: 'B', text: '包裝顏色是否特別醒目', isCorrect: false, feedback: '包裝顏色是設計考量，與有機認證無關。選購時應優先查看驗證標示與來源資訊。' },
            ],
          },
        ],
        '你完成了商品推薦的發芽任務。小芽芽發芽了，並獲得消費高手 V1。',
      ),

      makeStage(2, '長葉',
        '商品推薦進階任務',
        '多看一步，讓選購更有方向。',
        [
          { icon: '🔍', title: '選購不能只看外觀', desc: '商品外觀精美不代表品質保證，選購時更重要的是看標示資訊，了解商品的生產方式與來源。' },
          { icon: '📌', title: '標示是否清楚也很重要', desc: '標示不清楚的商品，較難讓消費者判斷其生產方式。標示清楚是消費者了解商品的重要依據。' },
          { icon: '📦', title: '多了解來源，有助於判斷商品資訊', desc: '了解商品的生產來源，可以幫助你更有依據地判斷商品資訊，讓購買更有方向。' },
        ],
        [
          { icon: '⚠️', title: '廣告語不等於驗證標示', desc: '「天然有機」是廣告用詞，不代表通過有機驗證。選購時要區分廣告語和官方驗證標示的差異。' },
          { icon: '🧾', title: '看懂標示，選購更安心', desc: '養成看標示的習慣，讓你的每一次選購都更有依據，不容易被包裝外觀或廣告語影響。' },
          { icon: '🌱', title: '建立有機選購的判斷習慣', desc: '從看驗證標示開始，逐步建立自己的有機選購判斷習慣，讓選擇更加有意識。' },
        ],
        [
          // Q1: 情境式二選一 (scenario2)
          {
            type: 'scenario2',
            title: '哪一種做法較有助於判斷商品資訊？',
            scenario: '你在選購蔬菜，面前有兩款產品，你會怎麼判斷？',
            options: [
              { label: 'A', text: '看驗證標示與來源資訊', isCorrect: true, feedback: '正確！驗證標示和來源資訊是判斷商品的具體依據，比外觀和廣告語更可靠。' },
              { label: 'B', text: '只看包裝是否吸引人', isCorrect: false, feedback: '包裝設計是行銷考量，與有機驗證無關。選購時更重要的是查看標示資訊和來源。' },
            ],
          },
          // Q2: 點選正確資訊 (multiselect)
          {
            type: 'multiselect',
            title: '以下哪些是選購時較值得注意的資訊？',
            subtitle: '請選出所有正確的項目',
            options: [
              { text: '驗證標示', correct: true },
              { text: '來源資訊', correct: true },
              { text: '包裝顏色是否流行', correct: false },
            ],
          },
        ],
        '你完成了商品推薦的長葉任務。小芽芽長葉了，並升級為消費高手 V2。',
      ),

      makeStage(3, '開花',
        '商品推薦挑戰任務',
        '完成這個任務，讓你的有機選購更完整。',
        [
          { icon: '🌟', title: '看懂標示與來源，是重要的第一步', desc: '有機選購的第一步，是學會從包裝上的驗證標示和來源資訊開始判斷，而非依賴廣告說法。' },
          { icon: '💰', title: '選購不只是比價格', desc: '有機農產品的價格可能略高，背後是更多的土地管理與驗證投入。選購時把價格和資訊一起考量。' },
          { icon: '🧭', title: '理解資訊，有助於做出更有意識的選擇', desc: '當你了解各類標示的意義，就能更有方向地選購，不容易被廣告語或包裝外觀誤導。' },
        ],
        [
          { icon: '🏆', title: '成為有機消費的示範者', desc: '累積了有機選購的知識與習慣後，你可以把這些知識分享給身邊的人，讓更多人一起做出更有依據的選擇。' },
          { icon: '🔄', title: '消費選擇影響生產方向', desc: '消費者穩定選購有機農產品，讓農友有動力持續投入有機耕作，消費端與生產端形成良性循環。' },
          { icon: '💚', title: '每一次選擇都有意義', desc: '每一次看標示、選有依據的商品，都是對永續農業方向的支持，讓這樣的生產方式得以延續。' },
        ],
        [
          // Q1: 拖曳分類 (drag) — unique right items
          {
            type: 'drag',
            title: '請把下列項目配對到對應類別',
            subtitle: '先點左欄，再點右欄完成配對',
            pairs: [
              { left: '有機驗證標示', right: '選購時值得優先留意' },
              { left: '包裝顏色是否顯眼', right: '選購時次要參考' },
            ],
          },
          // Q2: 情境判斷 (scenario2)
          {
            type: 'scenario2',
            title: '選購有機商品時，較合適的做法是什麼？',
            scenario: '你在選購有機農產品，哪一種做法比較合適？',
            options: [
              { label: 'A', text: '看懂標示與來源，再做選擇', isCorrect: true, feedback: '正確！養成看標示的習慣，讓選購建立在具體資訊上，不容易被外觀或廣告語誤導。' },
              { label: 'B', text: '只看外包裝是否吸引人', isCorrect: false, feedback: '包裝的吸引力是設計考量，與有機認證無關。選購有機商品應以標示和來源為判斷依據。' },
            ],
          },
        ],
        '你完成了商品推薦的開花任務。小芽芽開花了，並升級為消費高手 V3。',
      ),
    ],
  },
}

// ============================================================
// Badge definitions
// ============================================================
export const BADGE_DEFS = {
  pioneer:   { id: 'pioneer',   name: '體驗先鋒',  scenarioId: 'event',   desc: '完成活動限定任務' },
  lifestyle: { id: 'lifestyle', name: '有機生活家', scenarioId: 'member',  desc: '完成會員專屬任務' },
  shopper:   { id: 'shopper',   name: '消費高手',   scenarioId: 'product', desc: '完成商品推薦任務' },
}

export const BADGE_VERSION = {
  1: { label: 'V1', stageName: '發芽', characterStage: 1 },
  2: { label: 'V2', stageName: '長葉', characterStage: 2 },
  3: { label: 'V3', stageName: '開花', characterStage: 3 },
}

// ============================================================
// localStorage helpers
// ============================================================
export function loadBadges() {
  try {
    return JSON.parse(localStorage.getItem('organic_badges') || 'null') ||
      { pioneer: { version: 0 }, lifestyle: { version: 0 }, shopper: { version: 0 } }
  } catch {
    return { pioneer: { version: 0 }, lifestyle: { version: 0 }, shopper: { version: 0 } }
  }
}
export function saveBadges(b) { localStorage.setItem('organic_badges', JSON.stringify(b)) }

export function loadCharacterStage() {
  return parseInt(localStorage.getItem('organic_character_stage') || '0', 10)
}
export function saveCharacterStage(s) {
  localStorage.setItem('organic_character_stage', String(Math.min(3, Math.max(0, s))))
}

// Compute global character stage from total badge completions across all 3 groups
// total completions: 0 → stage 0 (種子), 1–2 → stage 1 (發芽), 3–5 → stage 2 (長葉), 6–9 → stage 3 (開花)
export function computeCharacterStage(badges) {
  const total = Object.values(badges).reduce((s, b) => s + (b.version || 0), 0)
  if (total === 0) return 0
  if (total <= 2) return 1
  if (total <= 5) return 2
  return 3
}

// Returns the next playable stage number (1–3) for a given badge
export function getCurrentStageForScenario(badgeId) {
  const v = loadBadges()[badgeId]?.version || 0
  return Math.min(3, v + 1)
}

// Returns fully composed scenario data (flattened stage + scenario meta)
export function getScenarioData() {
  try {
    const saved = JSON.parse(localStorage.getItem('organic_scenario') || '{}')
    const def   = SCENARIO_DATA[saved.id] || SCENARIO_DATA.event
    const idx   = Math.max(0, Math.min(2, (saved.stage || 1) - 1))
    return { ...def.stages[idx], id: def.id, badgeId: def.badgeId, badge: def.badge }
  } catch {
    const def = SCENARIO_DATA.event
    return { ...def.stages[0], id: def.id, badgeId: def.badgeId, badge: def.badge }
  }
}
