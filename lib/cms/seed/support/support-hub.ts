import { L } from "@/lib/i18n";
import type { TrustPageBlock } from "@/types/eeat";
import { HUB_MEDIA, ROUTES, createTrustPage } from "./factory";

export const supportHubPage = createTrustPage({
  slug: "support",
  title: L("GGLBET Support", "GGLBET Support"),
  metaTitle: L(
    "GGLBET Support Hub | FAQ, Payments, Download & Safer Play",
    "GGLBET Support 中心｜FAQ、支付、下載與較安全遊玩",
  ),
  metaDescription: L(
    "Use the GGLBET Support hub to reach FAQ, Payment, Download, Responsible Gaming, About, Contact, Editorial Policy, and Team — plus register-to-limits journeys for Malaysia players.",
    "使用 GGLBET Support 中心前往 FAQ、支付、下載、負責任博彩、關於、聯絡、編輯政策與團隊——以及面向馬來西亞玩家的註冊到限額旅程。",
  ),
  heroEyebrow: L("GGLBET Support hub", "GGLBET Support 中心"),
  heroTitle: L("GGLBET Support for every player journey", "GGLBET Support：涵蓋每段玩家旅程"),
  heroDescription: L(
    "One map for FAQ answers, payment rails guidance, app download notes, responsible-gaming tools, brand trust pages, and contact — built for Malaysia-facing players who want clarity before they deposit.",
    "一張地圖對應 FAQ 答案、支付通道指引、應用下載備註、負責任博彩工具、品牌信任頁與聯絡——為希望在入金前先看清楚的馬來西亞玩家而建。",
  ),
  heroImageSrc: HUB_MEDIA.support,
  lastUpdated: "2026-08-08",
  authorSlug: "gglbet-editorial",
  reviewerSlug: "gglbet-trust-desk",
  summaryCards: [
    {
      title: L("FAQ answers", "FAQ 答案"),
      description: L(
        "Task-level GGLBET answers for accounts, money, games, and safer play.",
        "帳號、資金、遊戲與較安全遊玩的任務級 GGLBET 答案。",
      ),
    },
    {
      title: L("Payment methods", "支付方式"),
      description: L(
        "Deposit and withdrawal journeys with examples Malaysia players recognise.",
        "以馬來西亞玩家熟悉的例子說明存提款旅程。",
      ),
    },
    {
      title: L("Download app", "下載應用"),
      description: L(
        "Android and iOS install notes tied to official GGLBET download paths.",
        "對齊官方 GGLBET 下載路徑的 Android 與 iOS 安裝備註。",
      ),
    },
    {
      title: L("Responsible gaming", "負責任博彩"),
      description: L(
        "Set deposit and session limits before you fund play on GGLBET.",
        "在 GGLBET 入金前先設定存款與工作階段限額。",
      ),
    },
    {
      title: L("Trust pages", "信任頁"),
      description: L(
        "About, Editorial Policy, and Team explain ownership without invented licences.",
        "關於、編輯政策與團隊說明責任歸屬，不捏造牌照。",
      ),
    },
    {
      title: L("Contact", "聯絡"),
      description: L(
        "Reach the right desk with URLs, transaction refs, and no password sharing.",
        "以網址、交易編號聯絡正確窗口，且不分享密碼。",
      ),
    },
  ],
  blocks: [
    {
      type: "tldr",
      id: "tldr",
      text: L(
        "The GGLBET Support hub is the map for Malaysia-facing player help: FAQ for tasks, Payment for cashier journeys, Download for app installs, Responsible Gaming for limits, About for brand orientation, Editorial Policy and Team for trust ownership, and Contact for challenges. Typical journeys run register → verify → set limits → deposit → play, with gglbet5.com as the live source of truth.",
        "GGLBET Support 中心是面向馬來西亞玩家協助的地圖：FAQ 處理任務、支付處理出納旅程、下載處理應用安裝、負責任博彩處理限額、關於處理品牌定位、編輯政策與團隊處理信任責任、聯絡處理質疑。典型旅程為註冊→驗證→設定限額→入金→遊玩，並以 gglbet5.com 為即時事實來源。",
      ),
    },
    {
      type: "definition",
      id: "definition",
      term: L("GGLBET Support hub", "GGLBET Support 中心"),
      text: L(
        "The Support hub is the central landing that routes you to every GGLBET help destination in the topic cluster. It is documentation and orientation, not a replacement for the signed-in cashier, lobby, or official terms on gglbet5.com.",
        "Support 中心是把你路由到主題叢集中每個 GGLBET 協助目的地的中央登陸頁。它是文件與定位，不能取代 gglbet5.com 上登入後的出納、大廳或官方條款。",
      ),
    },
    {
      type: "heading",
      id: "how-to-use",
      text: L("How to use GGLBET Support destinations", "如何使用 GGLBET Support 目的地"),
      anchor: "how-to-use",
    },
    {
      type: "paragraph",
      id: "how-to-use-1",
      text: L(
        "Start here when you know you need help but are not sure which article owns the answer. If your question is a short task — how to register, what verification means, why a bonus has wagering — open FAQ. If your question is about depositing, withdrawing, processing expectations, or which example rails Malaysia players often compare, open Payment. If you need Android or iOS install, update, or troubleshooting notes, open Download. If you want deposit limits, session reminders, cool-off, or warning signs before you fund an account, open Responsible Gaming first.",
        "當你知道需要協助但不确定哪篇文章擁有答案時，從這裡開始。若問題是短任務——如何註冊、驗證含義、為何優惠有流水——打開 FAQ。若問題關於入金、提款、處理預期，或馬來西亞玩家常比較的範例通道，打開支付。若需要 Android 或 iOS 安裝、更新或疑難排解備註，打開下載。若想在入金前了解存款限額、工作階段提醒、冷靜期或警訊，先打開負責任博彩。",
      ),
    },
    {
      type: "paragraph",
      id: "how-to-use-2",
      text: L(
        "Use About GGLBET when you want brand orientation and how the content hub relates to gglbet5.com. Use Editorial Policy when you want sourcing, disclosure, and correction rules. Use About Our Team when you want to know which desk writes or reviews a page. Use Contact when you have an account-specific issue or a factual challenge that needs a URL and sentence. Together these destinations form one Support topic cluster so Google and players can tell this is the official GGLBET help surface — not a generic casino directory pasted under a new logo.",
        "想了解品牌定位與內容中心如何對齊 gglbet5.com 時，使用 About GGLBET。想了解取材、揭露與更正規則時，使用編輯政策。想知道哪個小組撰寫或覆核頁面時，使用關於我們的團隊。有帳號特定問題或需要網址與句子的事實質疑時，使用聯絡。這些目的地共同形成一個 Support 主題叢集，讓 Google 與玩家辨識這是官方 GGLBET 協助面——而非換標誌貼上的泛用娛樂城名錄。",
      ),
    },
    {
      type: "comparison",
      id: "destination-table",
      caption: L("Pick the GGLBET destination for your job", "依任務選擇 GGLBET 目的地"),
      headers: [
        L("Destination", "目的地"),
        L("Best for", "最適合"),
        L("Not a substitute for", "不能取代"),
      ],
      rows: [
        [
          L("FAQ", "FAQ"),
          L("Short task answers", "短任務答案"),
          L("Live cashier status", "即時出納狀態"),
        ],
        [
          L("Payment", "支付"),
          L("Deposit and withdraw journeys", "存提款旅程"),
          L("Guaranteed rail lists per account", "每帳號保證通道清單"),
        ],
        [
          L("Download", "下載"),
          L("App install and updates", "應用安裝與更新"),
          L("Unofficial APK mirrors", "非官方 APK 鏡像"),
        ],
        [
          L("Responsible gaming", "負責任博彩"),
          L("Limits before funding", "入金前的限額"),
          L("Emergency clinical care", "緊急臨床照護"),
        ],
        [
          L("About / Editorial / Team", "關於／編輯／團隊"),
          L("Brand and trust ownership", "品牌與信任責任"),
          L("Invented licence claims", "捏造牌照主張"),
        ],
        [
          L("Contact", "聯絡"),
          L("Account issues and corrections", "帳號問題與更正"),
          L("Password or OTP sharing", "密碼或 OTP 分享"),
        ],
      ],
    },
    {
      type: "heading",
      id: "player-journey",
      text: L("Player journey: register → deposit → limits", "玩家旅程：註冊→入金→限額"),
      anchor: "player-journey",
    },
    {
      type: "paragraph",
      id: "journey-1",
      text: L(
        "Most Malaysia-facing players who succeed on GGLBET follow a calm sequence rather than racing from banner to cashier. Registration comes first: accurate details, a reachable email, legal age confirmation, and acceptance of terms shown on screen. Verification follows early — not only at first withdrawal — so identity and payment ownership checks do not surprise you later. Limits come next: deposit or session controls set while you are calm beat limits set after a heated session. Only then should you deposit, confirm the live rail inside gglbet5.com, and browse games with intention.",
        "多數在 GGLBET 成功的面向馬來西亞玩家，會遵循冷靜序列而非從橫幅衝到出納。註冊優先：正確資料、可聯絡的電子郵件、法定年齡確認，以及接受畫面上的條款。驗證及早進行——不只在首次提款時——以免身份與支付歸屬檢查日後突然出現。接著是限額：在冷靜時設定的存款或工作階段控制，勝過激烈工作階段後才設的限額。然後才應入金、在 gglbet5.com 確認即時通道，並有意識地瀏覽遊戲。",
      ),
    },
    {
      type: "paragraph",
      id: "journey-2",
      text: L(
        "That sequence is why Support Hub links Responsible Gaming beside Payment and Register beside FAQ. A player who deposits before reading limit tools is not failing a moral test — they are following the loudest button on many casino surfaces. GGLBET documentation deliberately reverses that loudness: orientation and controls first, funding second, discovery third. If you already have an account, you can still enter the same loop at the limits step before your next deposit. If you are only browsing, use About and the games catalog without funding anything until the journey feels deliberate.",
        "此序列正是 Support 中心把負責任博彩放在支付旁、把註冊放在 FAQ 旁的原因。入金前未讀限額工具的玩家並非道德測驗不及格——他們只是跟著許多娛樂城介面上最吵的按鈕走。GGLBET 文件刻意反轉那份吵鬧：先定位與控制，再入金，再探索。若你已有帳號，仍可在下次入金前從限額步驟進入同一迴圈。若只是瀏覽，可先用關於頁與遊戲目錄，直到旅程感覺是刻意的再入金。",
      ),
    },
    {
      type: "steps",
      id: "journey-steps",
      title: L("Recommended GGLBET first-session path", "建議的 GGLBET 首次工作階段路徑"),
      steps: [
        {
          title: L("Register from official GGLBET links", "從官方 GGLBET 連結註冊"),
          text: L(
            "Avoid third-party mirrors. Use navigation or gglbet5.com paths that you can trust.",
            "避開第三方鏡像。使用你可信賴的導覽或 gglbet5.com 路徑。",
          ),
        },
        {
          title: L("Verify email and prepare KYC early", "及早驗證電子郵件並準備 KYC"),
          text: L(
            "Complete checks before your first withdrawal request to reduce delays.",
            "在首次提款請求前完成檢查，以減少延遲。",
          ),
        },
        {
          title: L("Open Responsible Gaming and set a limit", "打開負責任博彩並設定限額"),
          text: L(
            "Choose a deposit or session limit you can afford to lose entirely.",
            "選擇一筆你能完全承受損失的存款或工作階段限額。",
          ),
        },
        {
          title: L("Read Payment, then deposit in-session", "先讀支付頁，再於工作階段入金"),
          text: L(
            "Treat hub examples as guidance; confirm the live cashier after GGLBET login.",
            "把中心範例當指引；GGLBET 登入後確認即時出納。",
          ),
        },
        {
          title: L("Browse games, then play within limits", "瀏覽遊戲，再在限額內遊玩"),
          text: L(
            "Use the catalog for discovery; launch titles only inside the authenticated product.",
            "用目錄探索；僅在已驗證產品內啟動標題。",
          ),
        },
        {
          title: L("Use FAQ or Contact when stuck", "卡住時使用 FAQ 或聯絡"),
          text: L(
            "Self-serve first; escalate with transaction refs — never passwords.",
            "先自助；升級時附交易編號——從不附密碼。",
          ),
        },
      ],
    },
    {
      type: "heading",
      id: "destinations-deep",
      text: L("What each Support destination is for", "每個 Support 目的地的用途"),
      anchor: "destinations-deep",
    },
    {
      type: "checklist",
      id: "destinations-list",
      title: L("GGLBET Support cluster checklist", "GGLBET Support 叢集清單"),
      items: [
        L(
          "FAQ — clustered answers for accounts, payments, bonuses framing, games, and safer play.",
          "FAQ——帳號、支付、優惠表述、遊戲與較安全遊玩的分叢答案。",
        ),
        L(
          "Payment — deposit, withdraw, timing, and security notes with Malaysia-facing examples.",
          "支付——存提款、時效與安全備註，附面向馬來西亞的例子。",
        ),
        L(
          "Download — Android, iOS, install, update, and troubleshooting without unofficial mirrors.",
          "下載——Android、iOS、安裝、更新與疑難排解，不含非官方鏡像。",
        ),
        L(
          "Responsible Gaming — tools, warning signs, and help paths before and during play.",
          "負責任博彩——遊玩前後的工具、警訊與協助路徑。",
        ),
        L(
          "About — brand orientation and how the hub relates to the live product.",
          "關於——品牌定位與中心如何對齊即時產品。",
        ),
        L(
          "Editorial Policy — sourcing, disclosures, corrections, Malaysia clarity rules.",
          "編輯政策——取材、揭露、更正、馬來西亞清晰度規則。",
        ),
        L(
          "About Our Team — Editorial, Trust Desk, and Newsroom roles plus review paths.",
          "關於我們的團隊——編輯、信任小組與新聞室角色及覆核路徑。",
        ),
        L(
          "Contact — channels, what to prepare, and how corrections are routed.",
          "聯絡——通道、應準備什麼，以及更正如何路由。",
        ),
      ],
    },
    {
      type: "paragraph",
      id: "destinations-note",
      text: L(
        "Internal links across these pages deliberately repeat the cluster so you can move laterally: from Payment to Responsible Gaming before funding, from Download to FAQ when an install error appears, from About to Editorial Policy when you want standards, from any page to Contact when a claim looks wrong. Register and Login sit beside Support because documentation without an official gate is incomplete. Games, Providers, Guides, News, and Promotions sit in the wider product map when discovery — not troubleshooting — is the job.",
        "這些頁面之間的內部連結刻意重複叢集，讓你可以橫向移動：入金前從支付到負責任博彩，安裝錯誤時從下載到 FAQ，想看標準時從關於到編輯政策，任何頁面在主張有誤時到聯絡。註冊與登入放在 Support 旁，因為沒有官方入口的文件不完整。當任務是探索而非疑難排解時，遊戲、遊戲商、指南、新聞與優惠位於更廣的產品地圖。",
      ),
    },
    {
      type: "paragraph",
      id: "destinations-note-2",
      text: L(
        "If you arrive from search looking for “GGLBET login”, “GGLBET register”, or “GGLBET download”, this hub is the orientation layer that should send you to the precise destination instead of trapping you on a thin page with three paragraphs and a generic FAQ. That is the Home-grade bar for Support: summary cards, long-form blocks, visual sections, unique FAQs, and a final CTA that names the next honest step.",
        "若你從搜尋帶著「GGLBET 登入」「GGLBET 註冊」或「GGLBET 下載」來到這裡，本中心是定位層，應把你送到精確目的地，而不是困在只有三段文字與泛用 FAQ 的單薄頁。這就是 Support 的 Home 等級門檻：摘要卡、長文區塊、視覺區、獨特 FAQ，以及點名下一個誠實步驟的最終 CTA。",
      ),
    },
    {
      type: "heading",
      id: "truth-hierarchy",
      text: L("Hub docs versus live GGLBET product", "中心文件與即時 GGLBET 產品"),
      anchor: "truth-hierarchy",
    },
    {
      type: "paragraph",
      id: "truth-1",
      text: L(
        "Support pages are written to stay useful when product details shift. That means example payment rails, download steps, and promotion framing are labelled as guidance aligned with gglbet5.com posture — not as a personal guarantee for every account status today. If the hub and the live cashier disagree, follow the signed-in product. If a Support page is wrong, Contact the Trust Desk with the URL and sentence so the page can be corrected and re-dated. GGLBET will not invent licences, RTP, or bonus multiples to fill gaps.",
        "Support 頁撰寫時考量產品細節會變動時仍有用。意指範例支付通道、下載步驟與優惠表述標示為對齊 gglbet5.com 姿態的指引——而非對每個帳號今日狀態的個人保證。若中心與即時出納不一致，遵循登入後產品。若 Support 頁有誤，以網址與句子聯絡信任小組，以便更正並更新日期。GGLBET 不會捏造牌照、RTP 或優惠倍數來填補空缺。",
      ),
    },
    {
      type: "callout",
      id: "safety-callout",
      variant: "warning",
      title: L("Set limits before you deposit", "入金前先設定限額"),
      body: L(
        "The highest-leverage Support habit on GGLBET is opening Responsible Gaming before the cashier. A limit set in a calm moment governs later sessions better than willpower alone after a losing streak.",
        "GGLBET 上槓桿最高的 Support 習慣，是在出納前先打開負責任博彩。冷靜時刻設定的限額，比連輸後單靠意志力更能約束之後的工作階段。",
      ),
    },
    {
      type: "heading",
      id: "seo-brand",
      text: L("Why this hub is branded GGLBET", "為什麼本中心以 GGLBET 為品牌"),
      anchor: "seo-brand",
    },
    {
      type: "paragraph",
      id: "seo-1",
      text: L(
        "Every Support landing names GGLBET in the hero and section identity so search engines and readers can associate FAQ, Payment, Download, and trust pages with the official content hub. Anti-stuffing still applies: useful branded phrasing beats repeating the name in every clause. Malaysia-facing clarity appears where it helps — bilingual habits, familiar payment examples, mobile-first download notes — without compliance theatre. The result should feel like one composition: a Support map you can actually use, not a dashboard of generic casino filler.",
        "每個 Support 登陸頁在英雄區與區塊身份中提及 GGLBET，讓搜尋引擎與讀者能把 FAQ、支付、下載與信任頁關聯到官方內容中心。仍適用防堆砌：有用的品牌用語勝過每句重複名稱。面向馬來西亞的清晰度出現在有幫助處——雙語習慣、熟悉的支付例子、行動優先下載備註——且沒有合規表演。結果應像一個構圖：你真正用得上的 Support 地圖，而非泛用娛樂城填充儀表板。",
      ),
    },
    {
      type: "callout",
      id: "final-note",
      variant: "tip",
      title: L("Player takeaway", "玩家重點"),
      body: L(
        "Pick the destination that matches your job, complete register → limits → deposit in that order when you are new, and confirm live details on gglbet5.com after login. Use Contact only with precise details — never secrets.",
        "選擇符合任務的目的地；新手上路時依註冊→限額→入金順序；登入後在 gglbet5.com 確認即時細節。僅在有精確細節時使用聯絡——從不附機密。",
      ),
    },
  ] as unknown as TrustPageBlock[],
  visualSections: [
    {
      id: "map-visual",
      eyebrow: L("Support map", "Support 地圖"),
      heading: L("Find the GGLBET page that owns your question", "找到擁有你問題的 GGLBET 頁"),
      subheading: L(
        "FAQ, Payment, Download, RG, About, Editorial, Team, Contact.",
        "FAQ、支付、下載、負責任博彩、關於、編輯、團隊、聯絡。",
      ),
      body: L(
        "The hub exists so you do not bounce between generic articles. Each destination has one job, Home-grade sections, and links back into the cluster.",
        "中心存在是為了避免你在泛用文章間跳轉。每個目的地只有一個任務、Home 等級區塊，並連回叢集。",
      ),
      mediaSrc: HUB_MEDIA.supportDesk,
      mediaAlt: L(
        "GGLBET support hub map artwork",
        "GGLBET Support 中心地圖視覺",
      ),
      points: [
        {
          title: L("Task pages", "任務頁"),
          body: L(
            "FAQ, Payment, and Download answer how-to jobs quickly.",
            "FAQ、支付與下載快速回答操作任務。",
          ),
        },
        {
          title: L("Trust pages", "信任頁"),
          body: L(
            "About, Editorial, and Team explain ownership and standards.",
            "關於、編輯與團隊說明責任與標準。",
          ),
        },
      ],
      ctas: [
        { label: L("GGLBET FAQ", "GGLBET 常見問題") as unknown as string, href: ROUTES.faq, variant: "primary" },
        { label: L("GGLBET Payment methods", "GGLBET 支付方式") as unknown as string, href: ROUTES.payment, variant: "outline" },
      ],
    },
    {
      id: "journey-visual",
      eyebrow: L("First session", "首次工作階段"),
      heading: L("Register, set limits, then deposit", "註冊、設定限額，再入金"),
      subheading: L(
        "The GGLBET sequence that prevents most beginner headaches.",
        "避免多數新手痛點的 GGLBET 序列。",
      ),
      body: L(
        "Official registration, early verification, Responsible Gaming controls, then a cashier confirmation inside gglbet5.com keeps documentation and live play aligned for Malaysia-facing players.",
        "官方註冊、及早驗證、負責任博彩控制，再於 gglbet5.com 內確認出納，讓文件與即時遊玩對面向馬來西亞玩家保持一致。",
      ),
      mediaSrc: HUB_MEDIA.supportPaymentJourney,
      mediaAlt: L(
        "GGLBET register to deposit journey artwork",
        "GGLBET 註冊到入金旅程視覺",
      ),
      flip: true,
      points: [
        {
          title: L("Limits first", "限額優先"),
          body: L(
            "Calm limits beat post-loss willpower on GGLBET.",
            "在 GGLBET 上，冷靜限額勝過虧損後的意志力。",
          ),
        },
        {
          title: L("Live confirmation", "即時確認"),
          body: L(
            "Hub examples never override your signed-in cashier.",
            "中心範例從不覆蓋你登入後的出納。",
          ),
        },
      ],
      ctas: [
        { label: L("Register on GGLBET", "註冊 GGLBET") as unknown as string, href: ROUTES.register, variant: "primary" },
        { label: L("Responsible gaming", "負責任博彩") as unknown as string, href: ROUTES.responsibleGaming, variant: "outline" },
      ],
    },
    {
      id: "download-visual",
      eyebrow: L("Mobile access", "行動存取"),
      heading: L("Download only from official GGLBET paths", "只從官方 GGLBET 路徑下載"),
      subheading: L(
        "Android and iOS notes live on the Download destination.",
        "Android 與 iOS 備註位於下載目的地。",
      ),
      body: L(
        "Support Hub points you to Download for install, update, and troubleshooting. Unofficial mirrors are outside GGLBET guidance and increase account and device risk.",
        "Support 中心把你指向下載頁以處理安裝、更新與疑難排解。非官方鏡像不在 GGLBET 指引內，並增加帳號與裝置風險。",
      ),
      mediaSrc: HUB_MEDIA.supportDownloadJourney,
      mediaAlt: L(
        "GGLBET download app artwork",
        "GGLBET 下載應用視覺",
      ),
      points: [
        {
          title: L("Update calmly", "冷靜更新"),
          body: L(
            "Read Download notes before forcing an install over a working session.",
            "在強制覆蓋仍可用的工作階段安裝前，先讀下載備註。",
          ),
        },
        {
          title: L("FAQ backup", "FAQ 備援"),
          body: L(
            "Install errors often have a short FAQ answer before Contact.",
            "安裝錯誤在聯絡前常已有短 FAQ 答案。",
          ),
        },
      ],
      ctas: [
        { label: L("Download GGLBET", "下載 GGLBET") as unknown as string, href: ROUTES.download, variant: "primary" },
        { label: L("GGLBET FAQ", "GGLBET 常見問題") as unknown as string, href: ROUTES.faq, variant: "outline" },
      ],
    },
    {
      id: "trust-visual",
      eyebrow: L("Trust cluster", "信任叢集"),
      heading: L("Challenge claims through the right GGLBET desk", "經正確 GGLBET 小組質疑主張"),
      subheading: L(
        "Editorial Policy, Team, and Contact complete the hub.",
        "編輯政策、團隊與聯絡補完中心。",
      ),
      body: L(
        "When a sentence looks wrong, send the URL through Contact. Trust Desk reviews money and safer-play issues; Editorial clarifies journeys; Team pages show who owns what.",
        "當句子看起來有誤時，經聯絡頁送出網址。信任小組覆核資金與較安全遊玩問題；編輯澄清旅程；團隊頁顯示誰負責什麼。",
      ),
      mediaSrc: HUB_MEDIA.supportRgJourney,
      mediaAlt: L(
        "GGLBET trust and contact artwork",
        "GGLBET 信任與聯絡視覺",
      ),
      flip: true,
      points: [
        {
          title: L("No secrets in tickets", "工單不含機密"),
          body: L(
            "Never send passwords or one-time codes to any GGLBET channel.",
            "切勿向任何 GGLBET 通道傳送密碼或一次性驗證碼。",
          ),
        },
        {
          title: L("Dated fixes", "具日期修正"),
          body: L(
            "Material corrections move the last-updated date on the page.",
            "重大更正會移動頁面上的最後更新日期。",
          ),
        },
      ],
      ctas: [
        { label: L("Contact GGLBET", "聯絡 GGLBET") as unknown as string, href: ROUTES.contact, variant: "primary" },
        { label: L("About our team", "關於我們的團隊") as unknown as string, href: ROUTES.team, variant: "outline" },
      ],
    },
  ],
  faqHeading: L("GGLBET Support hub FAQ", "GGLBET Support 中心常見問題"),
  faqSubheading: L(
    "How to navigate destinations and first-session journeys",
    "如何導覽目的地與首次工作階段旅程",
  ),
  faqBody: L(
    "Practical answers for using the GGLBET Support hub before you register, deposit, download, or contact a desk.",
    "在註冊、入金、下載或聯絡小組前使用 GGLBET Support 中心的實用答案。",
  ),
  faq: [
    {
      question: L(
        "What is the GGLBET Support hub?",
        "什麼是 GGLBET Support 中心？",
      ),
      answer: L(
        "It is the central map to FAQ, Payment, Download, Responsible Gaming, About, Editorial Policy, Team, and Contact. Use it when you know you need help but are unsure which destination owns the answer. Live play and cashier actions still happen on gglbet5.com after login.",
        "它是通往 FAQ、支付、下載、負責任博彩、關於、編輯政策、團隊與聯絡的中央地圖。當你知道需要協助但不確定哪個目的地擁有答案時使用。即時遊玩與出納行動仍在登入後的 gglbet5.com 進行。",
      ),
    },
    {
      question: L(
        "Which page should I open first as a new player?",
        "新玩家應先打開哪一頁？",
      ),
      answer: L(
        "Read FAQ for registration basics, open Responsible Gaming to plan a limit, skim Payment for cashier expectations, then register from official GGLBET links. Deposit only after limits are set and the live cashier is confirmed.",
        "讀 FAQ 了解註冊基礎，打開負責任博彩規劃限額，略讀支付了解出納預期，再從官方 GGLBET 連結註冊。僅在設定限額並確認即時出納後再入金。",
      ),
    },
    {
      question: L(
        "How does register → deposit → limits work on GGLBET?",
        "GGLBET 上註冊→入金→限額如何運作？",
      ),
      answer: L(
        "Register with accurate details, verify early, set deposit or session limits on Responsible Gaming while calm, then deposit through the signed-in cashier. Limits should come before funding whenever possible so a calm decision governs later sessions.",
        "以正確資料註冊、及早驗證，在冷靜時於負責任博彩設定存款或工作階段限額，再經登入後出納入金。限額應盡可能在入金前完成，讓冷靜決定約束之後的工作階段。",
      ),
    },
    {
      question: L(
        "When should I use FAQ instead of Contact?",
        "何時該用 FAQ 而不是聯絡？",
      ),
      answer: L(
        "Use FAQ for common how-to questions that already have written answers. Use Contact for account-specific status, missing transactions, or factual corrections that need a URL and sentence. Self-serve first when the answer is already published.",
        "常見操作問題已有書面答案時用 FAQ。帳號特定狀態、交易未到，或需要網址與句子的事實更正時用聯絡。答案已發布時先自助。",
      ),
    },
    {
      question: L(
        "Where do I learn about deposits and withdrawals?",
        "到哪裡了解存提款？",
      ),
      answer: L(
        "Open the GGLBET Payment page for journey guidance and Malaysia-facing examples, then confirm available rails inside your gglbet5.com cashier after login. Hub examples are not a guaranteed list for every account.",
        "打開 GGLBET 支付頁取得旅程指引與面向馬來西亞的例子，再於登入後的 gglbet5.com 出納確認可用通道。中心範例不是每個帳號的保證清單。",
      ),
    },
    {
      question: L(
        "Where is the official download guidance?",
        "官方下載指引在哪裡？",
      ),
      answer: L(
        "Use the GGLBET Download destination for Android and iOS install, update, and troubleshooting notes. Avoid unofficial APK mirrors. If an install error persists, check FAQ then Contact with device details — never passwords.",
        "使用 GGLBET 下載目的地取得 Android 與 iOS 安裝、更新與疑難排解備註。避開非官方 APK 鏡像。若安裝錯誤持續，先查 FAQ，再以裝置細節聯絡——從不附密碼。",
      ),
    },
    {
      question: L(
        "Why open Responsible Gaming before depositing?",
        "為什麼入金前要先打開負責任博彩？",
      ),
      answer: L(
        "Limits set before funding reflect a calm budget. After a losing streak, people often delay controls. GGLBET Support recommends deposit or session limits as part of onboarding, not only as a late fix.",
        "入金前設定的限額反映冷靜預算。連輸後人們常延後控制。GGLBET Support 建議把存款或工作階段限額納入上手流程，而非只當事後修正。",
      ),
    },
    {
      question: L(
        "What are About, Editorial Policy, and Team for?",
        "關於、編輯政策與團隊有何用途？",
      ),
      answer: L(
        "About orients the brand and hub purpose. Editorial Policy explains sourcing, disclosures, and corrections. Team explains Editorial, Trust Desk, and Newsroom roles. Together they show ownership without inventing licences.",
        "關於定位品牌與中心目的。編輯政策說明取材、揭露與更正。團隊說明編輯、信任小組與新聞室角色。三者共同呈現責任歸屬，且不捏造牌照。",
      ),
    },
    {
      question: L(
        "What should I include when contacting GGLBET?",
        "聯絡 GGLBET 時應包含什麼？",
      ),
      answer: L(
        "Describe the issue, include the relevant URL, and add transaction references or screenshots for money problems. Never send passwords or one-time codes. Mark content errors as corrections so Trust Desk can route them.",
        "描述問題、附上相關網址；資金問題加上交易編號或截圖。切勿傳送密碼或一次性驗證碼。將內容錯誤標為更正，以便信任小組路由。",
      ),
    },
    {
      question: L(
        "Does the Support hub replace the live GGLBET product?",
        "Support 中心會取代即時 GGLBET 產品嗎？",
      ),
      answer: L(
        "No. The hub documents journeys for clarity and SEO. The signed-in gglbet5.com session remains the operational source of truth for cashier, lobby, and offers. If they disagree, follow gglbet5.com.",
        "不會。中心為清晰度與 SEO 記錄旅程。登入後的 gglbet5.com 工作階段仍是出納、大廳與優惠的營運事實來源。若不一致，請遵循 gglbet5.com。",
      ),
    },
    {
      question: L(
        "Are payment rails on Support pages guaranteed?",
        "Support 頁上的支付通道有保證嗎？",
      ),
      answer: L(
        "No. Malaysia-facing examples help you recognise common patterns, but availability depends on your account and the live cashier. Always confirm after GGLBET login.",
        "沒有。面向馬來西亞的例子幫助你辨識常見模式，但可用性取決於你的帳號與即時出納。GGLBET 登入後請一律確認。",
      ),
    },
    {
      question: L(
        "How does GGLBET avoid generic casino filler here?",
        "GGLBET 如何在此避免泛用娛樂城填充？",
      ),
      answer: L(
        "Each destination has a concrete player job, names GGLBET naturally, links the Support cluster, and refuses invented licence or RTP claims. Heroes and summaries are brand-first, not interchangeable slogans.",
        "每個目的地都有具體玩家任務、自然提及 GGLBET、連結 Support 叢集，並拒絕捏造牌照或 RTP 主張。英雄區與摘要以品牌為先，而非可替換口號。",
      ),
    },
    {
      question: L(
        "Where should I go after reading the Support hub?",
        "讀完 Support 中心後該去哪裡？",
      ),
      answer: L(
        "Choose the destination that matches your job: FAQ or Payment for tasks, Download for installs, Responsible Gaming before funding, About or Team for trust context, Contact for account issues, then Register or Login to reach the live product.",
        "選擇符合任務的目的地：任務用 FAQ 或支付、安裝用下載、入金前用負責任博彩、信任脈絡用關於或團隊、帳號問題用聯絡，再到註冊或登入進入即時產品。",
      ),
    },
  ],
  finalCta: {
    eyebrow: L("Next on GGLBET", "GGLBET 下一步"),
    heading: L("Pick your next Support destination", "選擇下一個 Support 目的地"),
    subheading: L(
      "From hub map to FAQ, Payment, Download, limits, or Contact.",
      "從中心地圖到 FAQ、支付、下載、限額或聯絡。",
    ),
    body: L(
      "New players should set a Responsible Gaming limit before depositing. Everyone else can jump straight to the GGLBET page that owns their question — or Contact with precise details when self-serve is not enough.",
      "新玩家應在入金前設定負責任博彩限額。其他人可直接跳到擁有其問題的 GGLBET 頁——或在自助不足時以精確細節聯絡。",
    ),
    mediaSrc: HUB_MEDIA.supportCta,
    mediaAlt: L("GGLBET support next steps artwork", "GGLBET Support 下一步視覺"),
    ctas: [
      { label: L("GGLBET FAQ", "GGLBET 常見問題") as unknown as string, href: ROUTES.faq, variant: "primary" },
      { label: L("Responsible gaming", "負責任博彩") as unknown as string, href: ROUTES.responsibleGaming, variant: "outline" },
      { label: L("Register on GGLBET", "註冊 GGLBET") as unknown as string, href: ROUTES.register, variant: "soft" },
    ],
  },
});
