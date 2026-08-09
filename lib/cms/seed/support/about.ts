import { L } from "@/lib/i18n";
import type { TrustPageBlock } from "@/types/eeat";
import { HUB_MEDIA, ROUTES, createTrustPage } from "./factory";

export const aboutTrustPage = createTrustPage({
  slug: "about",
  title: L("About GGLBET", "關於 GGLBET"),
  metaTitle: L(
    "About GGLBET | Company, Mission and Trust for Malaysia Players",
    "關於 GGLBET｜面向馬來西亞玩家的公司、使命與信任",
  ),
  metaDescription: L(
    "Learn who GGLBET is, how the Malaysia-facing content hub works, and how editorial, security, and support desks keep product facts tied to your signed-in session.",
    "了解 GGLBET 是誰、面向馬來西亞的內容中心如何運作，以及編輯、安全與客服窗口如何讓產品事實對齊你登入後的工作階段。",
  ),
  heroEyebrow: L("GGLBET company", "GGLBET 公司介紹"),
  heroTitle: L("About GGLBET", "關於 GGLBET"),
  heroDescription: L(
    "GGLBET is the branded content hub for Malaysia-focused players who want clear journeys for accounts, payments, downloads, and responsible play before they confirm anything inside a signed-in session.",
    "GGLBET 是面向馬來西亞玩家的品牌內容中心，讓你在登入後的工作階段確認任何細節之前，先清楚掌握帳號、支付、下載與負責任遊玩的旅程。",
  ),
  heroImageSrc: HUB_MEDIA.about,
  lastUpdated: "2026-08-08",
  authorSlug: "gglbet-editorial",
  reviewerSlug: "gglbet-trust-desk",
  schemaType: "AboutPage",
  summaryCards: [
    {
      title: L("Company", "公司"),
      description: L(
        "GGLBET publishes player documentation for registration, login, catalog discovery, and support so Malaysia players can orient before live play.",
        "GGLBET 發布註冊、登入、目錄探索與客服說明，讓馬來西亞玩家在實際遊玩前先完成定位。",
      ),
    },
    {
      title: L("Mission", "使命"),
      description: L(
        "Make product journeys readable, branded, and honest—without inventing licences, RTP figures, or bonus numbers that are absent from official product facts.",
        "讓產品旅程可讀、有品牌且誠實——不捏造官方產品事實中不存在的牌照、RTP 或優惠數字。",
      ),
    },
    {
      title: L("Editorial", "編輯"),
      description: L(
        "Named GGLBET Editorial writers draft explainers; the Trust Desk reviews money, eligibility, and safer-play framing before pages stay live.",
        "具名的 GGLBET 編輯撰寫說明；信任小組在頁面維持上線前覆核資金、資格與較安全遊玩表述。",
      ),
    },
    {
      title: L("Security", "安全"),
      description: L(
        "Account hygiene, official-domain habits, and password discipline are part of how GGLBET talks about safer access—not marketing theatre.",
        "帳號衛生、官方網域習慣與密碼紀律，是 GGLBET 談論較安全存取的一部分——不是行銷表演。",
      ),
    },
    {
      title: L("Transparency", "透明"),
      description: L(
        "Last-updated dates, reviewer desks, and signed-in session reminders keep documentation from pretending to be the live cashier.",
        "最後更新日期、覆核窗口，以及登入工作階段提醒，避免文件假裝成即時出納。",
      ),
    },
    {
      title: L("Support", "客服"),
      description: L(
        "Contact, FAQ, payment, and download pages sit beside About GGLBET so task help is one cluster away when you need action.",
        "聯絡、FAQ、支付與下載頁與 About GGLBET 並列，需要行動時任務協助就在同一個主題集群。",
      ),
    },
  ],
  blocks: [
    {
      type: "tldr",
      id: "tldr",
      text: L(
        "GGLBET is a Malaysia-facing online gaming content hub that explains accounts, payments, downloads, promotions framing, catalog discovery, and responsible play. Named editorial and trust desks own the pages, every trust page is dated, and live cashier, lobby, or offer details must be confirmed inside your signed-in GGLBET session on the official product—not invented here as licences or RTP.",
        "GGLBET 是面向馬來西亞的線上博彩內容中心，說明帳號、支付、下載、優惠架構、目錄探索與負責任遊玩。具名編輯與信任窗口負責頁面，每張信任頁皆標日期，而即時出納、大廳或優惠細節必須在官方產品的登入 GGLBET 工作階段內確認——不會在此捏造牌照或 RTP。",
      ),
    },
    {
      type: "definition",
      id: "definition",
      term: L("GGLBET", "GGLBET"),
      text: L(
        "GGLBET is the branded documentation and discovery layer for players who want English and Traditional Chinese guidance around registration, login, deposits, withdrawals, app access, safer-play tools, and game or provider browsing before or beside live play.",
        "GGLBET 是品牌文件與探索層，為需要英文與繁體中文指引的玩家，整理註冊、登入、存提款、應用存取、較安全遊玩工具，以及遊戲或遊戲商瀏覽，供實際遊玩之前或旁邊使用。",
      ),
    },
    {
      type: "heading",
      id: "company",
      text: L("What the GGLBET company page covers", "GGLBET 公司頁涵蓋什麼"),
      anchor: "company",
    },
    {
      type: "paragraph",
      id: "company-1",
      text: L(
        "About GGLBET exists so search engines and readers can tell this is the official GGLBET content hub—not a generic casino directory that could swap logos overnight. The company story is practical: we document how Malaysia-focused players register, verify, fund, withdraw, download, and find help, and we keep those journeys linked as one Support cluster. We do not invent regulatory licences, studio founding myths, or return-to-player percentages that are missing from official product sources. When a number or method matters for money movement, the signed-in GGLBET session is the operational source of truth.",
        "About GGLBET 的存在，是讓搜尋引擎與讀者認出這是官方 GGLBET 內容中心——而非可一夜更換標誌的泛用娛樂城名錄。公司故事很務實：我們記錄馬來西亞玩家如何註冊、驗證、入金、出款、下載與求助，並把這些旅程連成同一個 Support 集群。我們不捏造監管牌照、工作室創立神話，或官方產品來源缺少的玩家回報率。凡涉及資金移動的數字或方法，以登入後的 GGLBET 工作階段為營運事實來源。",
      ),
    },
    {
      type: "paragraph",
      id: "company-2",
      text: L(
        "Malaysia intent shapes examples on payment and download pages—FPX-style bank transfer, Touch 'n Go eWallet, DuitNow, card pathways, Android and iOS notes—without promising that every rail is available to every account at every moment. Catalog pages help you browse games and providers aligned with discovery information published for the product surface. Support and contact pages explain how to reach desks without sharing passwords. Together they form a company-facing hub that answers “who is GGLBET and how do I use it safely?” before you press deposit.",
        "馬來西亞意圖影響支付與下載頁的範例——FPX 風格銀行轉帳、Touch 'n Go 電子錢包、DuitNow、卡片路徑、Android 與 iOS 備註——但不會承諾每條通道在每個時刻對每個帳號都可用。目錄頁協助你瀏覽與產品面已公開探索資訊對齊的遊戲與遊戲商。客服與聯絡頁說明如何聯繫窗口且不分享密碼。整體構成面向公司的中心，在你按下存款前先回答「GGLBET 是誰、如何安全使用」。",
      ),
    },
    {
      type: "heading",
      id: "mission",
      text: L("Mission: clarity before commitment", "使命：承諾之前先求清楚"),
      anchor: "mission",
    },
    {
      type: "paragraph",
      id: "mission-1",
      text: L(
        "The GGLBET mission is to make high-intent player questions answerable in plain language: how to register once, how to log in on official domains, what to expect from the cashier, how to install from official links, and where responsible-gaming tools live. Clarity before commitment means reading wagering concepts, verification timing, and support routes before emotion decides a deposit size. It also means refusing keyword stuffing and interchangeable filler that could describe any operator. Every major heading on this hub should still make sense if you remove the navigation and keep only the brand name GGLBET.",
        "GGLBET 的使命是用清楚語言回答高意圖玩家問題：如何只註冊一次、如何在官方網域登入、出納預期為何、如何從官方連結安裝，以及負責任博彩工具在哪裡。承諾之前先求清楚，意味著在情緒決定存款金額前，先讀流水概念、驗證時程與客服路徑。也意味著拒絕關鍵字堆砌與可套用到任何業者的泛用填料。即使拿掉導覽只留下品牌名 GGLBET，本中心各大標題仍應說得通。",
      ),
    },
    {
      type: "paragraph",
      id: "mission-2",
      text: L(
        "We measure success by whether a Malaysia player can move from About GGLBET into FAQ, payment, download, responsible gaming, or contact without getting stranded. Internal links and related paths are part of the mission, not decoration. When documentation and the live lobby disagree, follow the signed-in product and report the mismatch so the Trust Desk can re-check. That loop—document, confirm live, correct, re-date—is how GGLBET stays useful without pretending marketing copy is a licence certificate.",
        "我們衡量成功的方式，是馬來西亞玩家能否從 About GGLBET 走進 FAQ、支付、下載、負責任博彩或聯絡頁而不迷路。內部連結與相關路徑是使命的一部分，不是裝飾。當文件與即時大廳不符，請遵循登入後的產品並回報落差，讓信任小組重查。文件化、現場確認、更正、更新日期——這條迴路讓 GGLBET 持續有用，而不把行銷文案假裝成牌照證書。",
      ),
    },
    {
      type: "paragraph",
      id: "mission-3",
      text: L(
        "Mission also means bilingual usefulness. English and Traditional Chinese copies should carry the same decisions—when to verify, when to set limits, when to open contact—so Malaysia players who switch languages mid-journey do not get a thinner story in one locale. We still avoid stuffing GGLBET into every clause; one natural brand mention per heading or short block is enough when the surrounding Support cluster already signals identity.",
        "使命也包括雙語可用性。英文與繁體中文應承載相同決策——何時驗證、何時設上限、何時開啟聯絡——讓中途切換語言的馬來西亞玩家不會在某一語系讀到更單薄的故事。我們仍避免把 GGLBET 塞進每個子句；當周圍 Support 集群已標示身分時，每個標題或短區塊一次自然品牌提及就夠。",
      ),
    },
    {
      type: "heading",
      id: "editorial",
      text: L("Editorial ownership and EEAT habits", "編輯歸屬與 EEAT 習慣"),
      anchor: "editorial",
    },
    {
      type: "paragraph",
      id: "editorial-1",
      text: L(
        "GGLBET Editorial drafts player-facing explainers from primary product behaviour, published official facts, and recurring Malaysia player questions. Experience shows up as session-aware advice: verify early, set limits before funding, install only from official download routes. Expertise shows up as refusing invented RTP or licence claims. Authoritativeness shows up as named desks and dated pages. Trustworthiness shows up as pointing you back to the signed-in GGLBET session whenever money or eligibility is at stake.",
        "GGLBET 編輯依主要產品行為、已公開官方事實，以及反覆出現的馬來西亞玩家問題撰寫說明。經驗體現為場次意識建議：儘早驗證、入金前設定上限、只從官方下載路徑安裝。專業體現為拒絕捏造 RTP 或牌照主張。權威體現為具名窗口與標日期頁面。可信度體現為只要涉及資金或資格，就導回登入後的 GGLBET 工作階段。",
      ),
    },
    {
      type: "steps",
      id: "editorial-process",
      title: L("How a GGLBET page reaches publication", "GGLBET 頁面如何發布"),
      steps: [
        {
          title: L("Research primary sources", "研究主要來源"),
          text: L(
            "Writers check live product behaviour and published official facts rather than second-hand forum summaries.",
            "撰稿人核對即時產品行為與已公開官方事實，而非二手論壇摘要。",
          ),
        },
        {
          title: L("Draft for one player question", "針對單一玩家問題起草"),
          text: L(
            "Each page opens with a direct answer, defines key terms, and expands without stuffing GGLBET into every clause.",
            "每頁以直接答案開場、定義關鍵詞，並在擴寫時避免把 GGLBET 塞進每個子句。",
          ),
        },
        {
          title: L("Trust Desk review", "信任小組覆核"),
          text: L(
            "Money, bonus framing, policy, and responsible-gaming language are reviewed before the page stays authoritative.",
            "資金、優惠表述、政策與負責任博彩用語，在頁面維持權威前先經覆核。",
          ),
        },
        {
          title: L("Date and schedule re-checks", "標日期並排程覆核"),
          text: L(
            "Last-updated dates change when corrections ship; payment and policy pages sit on a tighter cadence than evergreen catalog notes.",
            "更正上線時會更新最後日期；支付與政策頁的節奏比常青目錄說明更緊。",
          ),
        },
      ],
    },
    {
      type: "heading",
      id: "security",
      text: L("Security habits GGLBET expects players to keep", "GGLBET 期望玩家維持的安全習慣"),
      anchor: "security",
    },
    {
      type: "paragraph",
      id: "security-1",
      text: L(
        "Security on About GGLBET is behavioural, not theatrical. Bookmark official GGLBET and product domains. Never install APKs from chat mirrors. Never read passwords or one-time codes to anyone claiming to be support. Prefer unique passwords and review recent device logins after any suspicious prompt. GGLBET will not ask for your password by chat, email, or SMS. If something feels urgent and secretive, pause and open the official contact page from a known bookmark instead of following a link in the suspicious message.",
        "About GGLBET 談的安全是行為習慣，不是表演。請書籤官方 GGLBET 與產品網域。切勿安裝聊天室鏡像的 APK。切勿向自稱客服的人回讀密碼或一次性驗證碼。建議使用獨特密碼，並在任何可疑提示後檢查近期裝置登入。GGLBET 不會以聊天、電子郵件或簡訊索取密碼。若事情顯得緊急又隱密，請暫停，改從已知書籤開啟官方聯絡頁，而非點可疑訊息中的連結。",
      ),
    },
    {
      type: "checklist",
      id: "security-checklist",
      title: L("Quick GGLBET security checklist", "GGLBET 安全速查清單"),
      items: [
        L("Start from bookmarked official URLs only.", "只從書籤中的官方網址開始。"),
        L("Complete verification through in-product flows, not random email uploads.", "經產品內流程完成驗證，勿隨意電郵上傳。"),
        L("Keep deposit limits nearby before you fund play.", "入金前先把存款上限放在手邊。"),
        L("Report phishing via the official contact desk without replying to the bait thread.", "經官方聯絡窗口回報釣魚，且不要回覆誘餌執行緒。"),
      ],
    },
    {
      type: "heading",
      id: "transparency",
      text: L("Transparency without invented compliance claims", "透明但不捏造合規主張"),
      anchor: "transparency",
    },
    {
      type: "paragraph",
      id: "transparency-1",
      text: L(
        "Transparency means saying what we know, dating it, and admitting what only the live cashier can answer. GGLBET pages explain concepts such as wagering, KYC timing, and method categories without fabricating multiples, licence IDs, or RTP tables. Comparison tables on trust pages are guidance patterns, not guaranteed rails for your account today. When examples mention Malaysia-friendly methods, they illustrate intent—not a contract that every method appears for every profile. If a hub sentence and your signed-in session disagree, trust the session and tell support which screen you see.",
        "透明意味著說出我們知道的、標上日期，並承認只有即時出納能回答的部分。GGLBET 頁面解釋流水、KYC 時程與方法類別等概念，但不捏造倍數、牌照編號或 RTP 表。信任頁上的對照表是指引模式，不是你帳號今天保證可用的通道。範例提到馬來西亞友善方法時，是說明意圖——不是保證每個檔案都會出現每種方法。若中心句子與你登入後的工作階段不符，請相信工作階段，並告訴客服你看到的畫面。",
      ),
    },
    {
      type: "paragraph",
      id: "transparency-2",
      text: L(
        "Transparency also covers commercial context. When a page discusses promotions or VIP framing, it should help you read terms rather than inventing multipliers that may not match your live offer. Catalog badges and discovery copy describe organisation, not a promise that every title is open to every account at every hour. The honest sentence “confirm inside your signed-in GGLBET session” appears often because it is the boundary between documentation and operations—and that boundary is how trust is earned.",
        "透明也包括商業脈絡。當頁面討論優惠或 VIP 架構時，應協助你閱讀條款，而非捏造可能與即時優惠不符的倍數。目錄徽章與探索文案描述組織方式，而非保證每個標題在每個時段對每個帳號都開放。誠實句子「請在登入後的 GGLBET 工作階段確認」經常出現，正因為那是文件與營運的界線——而界線正是信任累積之處。",
      ),
    },
    {
      type: "comparison",
      id: "ownership",
      caption: L("Who owns which GGLBET surfaces", "誰負責哪些 GGLBET 介面"),
      headers: [
        L("Area", "區塊"),
        L("Owner", "負責人"),
        L("Confirm live?", "需現場確認？"),
      ],
      rows: [
        [
          L("Guides, catalog explainers", "指南、目錄說明"),
          L("GGLBET Editorial", "GGLBET 編輯"),
          L("Lobby availability after login", "登入後大廳可用性"),
        ],
        [
          L("Payments, policies, RG framing", "支付、政策、負責任博彩表述"),
          L("GGLBET Trust Desk", "GGLBET 信任小組"),
          L("Cashier methods and limits", "出納方法與限額"),
        ],
        [
          L("Tickets and account status", "工單與帳號狀態"),
          L("Player support", "玩家客服"),
          L("Signed-in account flags", "登入帳號標記"),
        ],
      ],
    },
    {
      type: "heading",
      id: "support-role",
      text: L("How About GGLBET connects to support journeys", "About GGLBET 如何連到客服旅程"),
      anchor: "support-role",
    },
    {
      type: "paragraph",
      id: "support-1",
      text: L(
        "About GGLBET is orientation; the rest of the Support hub is action. Use FAQ when you have a concrete question about accounts, money, downloads, or safer play. Use payment when you need deposit and withdrawal framing. Use download for official install notes. Use responsible gaming before you raise stakes. Use contact when a ticket needs identifiers, transaction references, and screenshots. Editorial policy and team pages explain ownership if you want to challenge a claim. Register and login routes remain the doors into the live product where facts for your account become visible.",
        "About GGLBET 是定位；Support 中心其餘頁是行動。有帳號、金錢、下載或較安全遊玩的具體問題時用 FAQ。需要存提款架構時用支付頁。官方安裝備註用下載頁。提高賭注前先看負責任博彩。需要工單識別資料、交易編號與截圖時用聯絡頁。若要質疑主張，編輯政策與團隊頁說明歸屬。註冊與登入路由仍是進入即時產品的門，帳號專屬事實在那裡才看得見。",
      ),
    },
    {
      type: "callout",
      id: "age-warning",
      variant: "warning",
      title: L("18+ and play only with money you can afford to lose", "18+ 且只用虧得起的錢遊玩"),
      body: L(
        "Gambling involves risk and is not an income plan. Deposit limits, session reminders, cool-off, and self-exclusion are available from the GGLBET responsible gaming page. If play stops feeling optional, use those tools and seek independent help beyond any single brand.",
        "博彩涉及風險，不是收入計畫。存款上限、場次提醒、冷靜期與自我排除可在 GGLBET 負責任博彩頁取得。若遊玩不再出於自願，請使用這些工具，並在單一品牌之外尋求獨立協助。",
      ),
    },
    {
      type: "paragraph",
      id: "closing",
      text: L(
        "Read About GGLBET as the company and mission layer of a Malaysia-intent content hub that refuses invented compliance theatre. Then move into the task pages that match your next decision, and confirm every money-moving detail inside your signed-in GGLBET session before you commit funds.",
        "請把 About GGLBET 讀成面向馬來西亞意圖、拒絕捏造合規表演的公司與使命層。接著走進符合你下一步決定的任務頁，並在投入資金前，於登入後的 GGLBET 工作階段確認每一項資金細節。",
      ),
    },
  ] as unknown as TrustPageBlock[],
  visualSections: [
    {
      id: "about-company",
      eyebrow: L("GGLBET company", "GGLBET 公司"),
      heading: L("Built as a branded content hub", "以品牌內容中心打造"),
      subheading: L(
        "Orientation for Malaysia players before live play",
        "馬來西亞玩家在實際遊玩前的定位",
      ),
      body: L(
        "About GGLBET explains who writes the hub, how journeys cluster, and why official-domain habits matter more than interchangeable casino filler.",
        "About GGLBET 說明誰撰寫中心、旅程如何成群，以及為何官方網域習慣比可替換的娛樂城填料更重要。",
      ),
      mediaSrc: HUB_MEDIA.aboutCompany,
      mediaAlt: L("About GGLBET hub visual", "關於 GGLBET 中心視覺"),
      points: [
        {
          title: L("Brand-first pages", "品牌優先頁面"),
          body: L(
            "Headings stay recognisably GGLBET even without the nav chrome.",
            "即使沒有導覽外框，標題仍明顯是 GGLBET。",
          ),
        },
        {
          title: L("Malaysia intent", "馬來西亞意圖"),
          body: L(
            "Payment and download examples follow local access patterns without inventing licences.",
            "支付與下載範例跟隨在地存取模式，但不捏造牌照。",
          ),
        },
      ],
      ctas: [
        { label: L("GGLBET FAQ", "GGLBET 常見問題") as unknown as string, href: ROUTES.faq, variant: "primary" },
        { label: L("GGLBET Support", "GGLBET 支援中心") as unknown as string, href: ROUTES.support, variant: "outline" },
      ],
    },
    {
      id: "about-editorial",
      eyebrow: L("Editorial", "編輯"),
      heading: L("Named desks, dated pages", "具名窗口、標日期頁面"),
      subheading: L(
        "How GGLBET keeps EEAT practical",
        "GGLBET 如何讓 EEAT 落地",
      ),
      body: L(
        "Editorial drafts; Trust Desk reviews money and safer-play framing; corrections re-date the page when they ship.",
        "編輯起草；信任小組覆核資金與較安全遊玩表述；更正上線時會更新日期。",
      ),
      mediaSrc: HUB_MEDIA.aboutMission,
      mediaAlt: L("GGLBET editorial workflow visual", "GGLBET 編輯流程視覺"),
      flip: true,
      ctas: [
        {
          label: L("Editorial policy", "編輯政策") as unknown as string,
          href: ROUTES.editorialPolicy,
          variant: "primary",
        },
        { label: L("About our team", "關於我們的團隊") as unknown as string, href: ROUTES.team, variant: "outline" },
      ],
    },
    {
      id: "about-security",
      eyebrow: L("Security", "安全"),
      heading: L("Official domains and password hygiene", "官方網域與密碼衛生"),
      subheading: L(
        "Support will never ask for your password",
        "客服絕不會索取你的密碼",
      ),
      body: L(
        "Treat urgent secret requests as phishing. Start from bookmarks, install only from official download notes, and report issues through contact.",
        "把緊急密鑰要求視為釣魚。從書籤開始、只依官方下載備註安裝，並經聯絡頁回報問題。",
      ),
      mediaSrc: HUB_MEDIA.aboutEditorial,
      mediaAlt: L("GGLBET security habits visual", "GGLBET 安全習慣視覺"),
      ctas: [
        { label: L("Contact GGLBET", "聯絡 GGLBET") as unknown as string, href: ROUTES.contact, variant: "primary" },
        { label: L("Download GGLBET", "下載 GGLBET") as unknown as string, href: ROUTES.download, variant: "outline" },
      ],
    },
    {
      id: "about-team",
      eyebrow: L("People", "團隊"),
      heading: L("Meet the desks behind GGLBET pages", "認識 GGLBET 頁面背後的窗口"),
      subheading: L(
        "Accountability you can challenge",
        "可質疑的責任歸屬",
      ),
      body: L(
        "Team and author pages list expertise areas so factual disputes have a clear owner instead of an anonymous footer.",
        "團隊與作者頁列出專長，讓事實爭議有清楚負責人，而非匿名頁腳。",
      ),
      mediaSrc: HUB_MEDIA.aboutTeam,
      mediaAlt: L("GGLBET team visual", "GGLBET 團隊視覺"),
      flip: true,
      ctas: [
        { label: L("About our team", "關於我們的團隊") as unknown as string, href: ROUTES.team, variant: "primary" },
        { label: L("Register on GGLBET", "註冊 GGLBET") as unknown as string, href: ROUTES.register, variant: "outline" },
      ],
    },
  ],
  faqHeading: L(
    "About GGLBET frequently asked questions",
    "關於 GGLBET 常見問題",
  ),
  faqSubheading: L(
    "Company, mission, editorial, and trust answers",
    "公司、使命、編輯與信任解答",
  ),
  faqBody: L(
    "These About GGLBET answers explain who we are and how documentation relates to your signed-in session. For cashier timings or install steps, open the payment and download pages next.",
    "這些 About GGLBET 答案說明我們是誰，以及文件如何對應你登入後的工作階段。若需要出納時程或安裝步驟，請接著開啟支付與下載頁。",
  ),
  faq: [
    {
      question: L("What is GGLBET?", "什麼是 GGLBET？"),
      answer: L(
        "GGLBET is the branded content hub and player documentation layer for a Malaysia-focused online gaming experience. On this hub you find registration and login orientation, payment and download explainers, responsible-gaming tools guidance, FAQ and contact routes, plus games and providers discovery pages. GGLBET is not a generic casino directory: pages are written so readers and search engines can tell the brand, journeys, and safer-play expectations belong together. Practical funding and title launches still happen after you authenticate in the live product session. Use About GGLBET for the company story; use task pages for steps; confirm live rails inside your signed-in session.",
        "GGLBET 是面向馬來西亞線上博彩體驗的品牌內容中心與玩家文件層。本中心提供註冊與登入定位、支付與下載說明、負責任博彩工具指引、FAQ 與聯絡路徑，以及遊戲與遊戲商探索頁。GGLBET 不是泛用娛樂城名錄：頁面寫法讓讀者與搜尋引擎看出品牌、旅程與較安全遊玩預期彼此連貫。實際入金與啟動標題仍須在通過驗證的即時產品工作階段進行。公司故事看 About GGLBET；步驟看任務頁；即時通道在登入工作階段確認。",
      ),
    },
    {
      question: L(
        "Why does GGLBET focus on Malaysia players?",
        "為什麼 GGLBET 著重馬來西亞玩家？",
      ),
      answer: L(
        "Documentation prioritises Malaysia-friendly payment habits, bilingual English and Traditional Chinese reading, and mobile-first access patterns. That focus shapes how we describe FPX-style transfer, Touch 'n Go eWallet, DuitNow, and card pathways, and how we write Android and iOS download notes. Malaysia focus does not invent local licences or unpublished regulatory statuses. It means we answer the questions Malaysia players actually ask about safe registration, cashier expectations, verification before first withdrawal, and where responsible-gaming tools live. If your region or account status differs, confirm availability inside your signed-in GGLBET session.",
        "文件優先處理馬來西亞友善支付習慣、英文與繁體中文雙語閱讀，以及行動優先存取模式。此焦點影響我們如何說明 FPX 風格轉帳、Touch 'n Go 電子錢包、DuitNow 與卡片路徑，以及 Android／iOS 下載備註。馬來西亞焦點不會捏造本地牌照或未公布的監管狀態。重點是回答玩家真正會問的安全註冊、出納預期、首提前驗證，以及負責任博彩工具位置。若地區或帳號狀態不同，請在登入後的 GGLBET 工作階段確認可用性。",
      ),
    },
    {
      question: L(
        "What is the purpose of the GGLBET content hub?",
        "GGLBET 內容中心的目的是什麼？",
      ),
      answer: L(
        "The hub makes product journeys readable before and beside live play: accounts, payments, downloads, promotions context, catalog discovery, and trust pages such as responsible gaming and contact. Each page should answer a concrete question, name GGLBET clearly, and link related routes so you are not stranded. It also helps search systems associate those journeys with GGLBET rather than interchangeable filler. The hub does not replace the live cashier, lobby, or official terms. When money moves, confirm details after login.",
        "中心讓帳號、支付、下載、優惠脈絡、目錄探索，以及負責任博彩與聯絡等信任頁，在實際遊玩之前與旁邊都可閱讀。每頁應回答具體問題、清楚標示 GGLBET，並連結相關路由以免迷路。它也協助搜尋系統把這些旅程關聯到 GGLBET，而非可替換填料。中心不能取代即時出納、大廳或官方條款。資金移動時，請登入後確認細節。",
      ),
    },
    {
      question: L(
        "How does GGLBET editorial and EEAT work?",
        "GGLBET 的編輯與 EEAT 如何運作？",
      ),
      answer: L(
        "Named desks own content categories, money-sensitive claims are reviewed, and pages carry last-updated dates. Experience, expertise, authoritativeness, and trustworthiness appear as habits: quote primary product behaviour, avoid invented RTP or licence figures, disclose commercial context when relevant, and keep responsible-gaming tools reachable. Editorial drafts explainers; Trust Desk reviews payment, policy, and safer-play framing. Report errors via contact so claims can be re-checked against the live product and re-dated when fixed.",
        "具名窗口負責內容類別，資金敏感主張會覆核，頁面標示最後更新日期。經驗、專業、權威與可信度體現為習慣：引用主要產品行為、不捏造 RTP 或牌照數字、在相關時揭露商業脈絡，並讓負責任博彩工具可觸及。編輯起草說明；信任小組覆核支付、政策與較安全遊玩表述。請經聯絡頁回報錯誤，以便對照即時產品重查，並在修正後更新日期。",
      ),
    },
    {
      question: L(
        "How does the GGLBET catalog relate to live play?",
        "GGLBET 目錄與即時遊玩有何關係？",
      ),
      answer: L(
        "Games and providers pages summarise discovery information aligned with the official product surface so you can browse before or after login. They do not invent founding years, licences, or RTP figures absent from official sources. Live availability, wagering eligibility, and cashier methods follow your authenticated session. If hub and lobby disagree, follow the signed-in product. Use the catalog to understand organisation; use the live session to confirm what you can open and fund today.",
        "遊戲與遊戲商頁摘要與官方產品面對齊的探索資訊，讓你在登入前後都能瀏覽。不會捏造官方來源沒有的創立年份、牌照或 RTP。即時可用性、流水資格與出納方法以通過驗證的工作階段為準。若中心與大廳不符，遵循登入後的產品。用目錄了解組織方式；用即時工作階段確認你今天能開啟與入金的內容。",
      ),
    },
    {
      question: L(
        "Who writes and reviews GGLBET pages?",
        "誰撰寫並審核 GGLBET 頁面？",
      ),
      answer: L(
        "Player-facing documentation is written by GGLBET Editorial and reviewed by the GGLBET Trust Desk for payments, bonus framing, policies, and responsible gaming. Public profile pages list expertise and accountability. Newsroom desks may own announcements, but trust-sensitive money and safer-play language still goes through review. Corrections that change monetary guidance are prioritised and re-date the page when they ship.",
        "玩家說明由 GGLBET 編輯撰寫，並由 GGLBET 信任小組審核支付、優惠表述、政策與負責任博彩。公開簡介頁列出專長與責任。新聞室可能負責公告，但敏感資金與較安全遊玩用語仍須審核。影響金錢指引的更正會優先處理，上線時更新頁面日期。",
      ),
    },
    {
      question: L(
        "Does GGLBET invent licences, RTP, or bonus figures?",
        "GGLBET 會捏造牌照、RTP 或優惠數字嗎？",
      ),
      answer: L(
        "No. Editorial rules forbid inventing licences, RTP percentages, wagering multiples, or bonus amounts that are not sourced from published official product facts. When a page discusses return-to-player, it should reflect published values or explain the concept without fabricating a number. Promotion pages point you to live terms rather than inventing multiples. If documentation and the cashier disagree, follow the signed-in session.",
        "不會。編輯規則禁止捏造非來自已公開官方產品事實的牌照、RTP 百分比、流水倍數或優惠金額。頁面若談玩家回報率，應反映已公開數值，或以不捏造數字的方式解釋概念。優惠頁導向即時條款而非捏造倍數。若文件與出納不符，請遵循登入工作階段。",
      ),
    },
    {
      question: L(
        "How often is GGLBET trust content updated?",
        "GGLBET 信任內容多久更新一次？",
      ),
      answer: L(
        "Payment, bonus-framing, and policy pages are reviewed on a tighter cadence than evergreen catalog explainers because cashier behaviour and safer-play tooling affect money and wellbeing. Every trust page shows a last-updated date. Updates follow product changes, unclear wording revealed by player questions, and corrections via contact. A dated page is not a guarantee that every example rail is available to your account today—confirm after login.",
        "支付、優惠表述與政策頁的審核節奏比常青目錄說明更緊，因為出納與較安全遊玩工具影響資金與福祉。每張信任頁都顯示最後更新日期。更新來自產品變化、玩家問題暴露的不清用語，以及經聯絡回報的更正。有日期不代表範例通道今天都對你可用——登入後請確認。",
      ),
    },
    {
      question: L(
        "How do I report an error on a GGLBET page?",
        "如何回報 GGLBET 頁面上的錯誤？",
      ),
      answer: L(
        "Use the contact page with the exact URL, the statement you believe is wrong, and—if money is involved—transaction references or screenshots of live cashier behaviour. The Trust Desk re-checks against the live product. If the hub was wrong, it is corrected and re-dated. Do not send passwords or one-time codes. Money, eligibility, and responsible-gaming framing errors are prioritised over typos.",
        "請用聯絡頁附上正確網址、你認為有誤的陳述；若涉及金錢，請附交易編號或即時出納行為截圖。信任小組會對照即時產品重查。若中心有誤，會更正並更新日期。勿傳密碼或一次性驗證碼。資金、資格與負責任博彩表述錯誤優先於錯字。",
      ),
    },
    {
      question: L(
        "How does GGLBET talk about security without scaring players?",
        "GGLBET 如何在不恐嚇玩家的情況下談安全？",
      ),
      answer: L(
        "We focus on habits you control: official domains, official downloads, unique passwords, early verification, and never sharing secrets with impersonators. We do not invent scare-licence claims. Security callouts exist to prevent phishing and account takeover, not to overwhelm you with jargon. If you already shared a secret, change your password from a known-good session and contact support with what happened.",
        "我們聚焦你能控制的習慣：官方網域、官方下載、獨特密碼、儘早驗證，以及絕不向冒充者分享密鑰。我們不捏造恐嚇式牌照主張。安全提示是為防釣魚與盜帳，而非用術語壓倒你。若已洩漏密鑰，請從已知安全工作階段改密，並向客服說明經過。",
      ),
    },
    {
      question: L(
        "Where do promotions and VIP fit beside About GGLBET?",
        "優惠與 VIP 在 About GGLBET 旁如何定位？",
      ),
      answer: L(
        "Promotions and VIP pages describe programme framing and how to read terms. They do not invent wagering multiples or tier benefits that are missing from live offer screens. About GGLBET explains the documentation mission; promotions pages explain how to evaluate offers; your signed-in session shows what you can actually opt into today. Always finish wagering checks before assuming a withdrawal will clear.",
        "優惠與 VIP 頁描述計畫架構與如何閱讀條款。不會捏造即時優惠畫面沒有的流水倍數或層級福利。About GGLBET 說明文件使命；優惠頁說明如何評估方案；登入工作階段顯示你今天實際能加入什麼。假設出款會通過前，請先完成流水檢查。",
      ),
    },
    {
      question: L(
        "Can I use GGLBET documentation offline from the live product?",
        "可以離線於即時產品之外使用 GGLBET 文件嗎？",
      ),
      answer: L(
        "Yes for orientation. Read About, FAQ, payment, download, and responsible-gaming pages to prepare questions and checklists. No for final money decisions—deposit minimums, available rails, and offer eligibility can change by account and moment. Treat the hub as guided documentation with dated ownership; treat the signed-in GGLBET session as the operational source of truth.",
        "定位用途可以。閱讀 About、FAQ、支付、下載與負責任博彩頁以準備問題與清單。最終資金決定則不行——最低存款、可用通道與優惠資格可能隨帳號與時間改變。把中心當有日期與歸屬的導引文件；把登入後的 GGLBET 工作階段當營運事實來源。",
      ),
    },
    {
      question: L(
        "Where should I go next after reading About GGLBET?",
        "讀完 About GGLBET 後該去哪裡？",
      ),
      answer: L(
        "For task help open FAQ, payment, download, or contact. For safer-play tools open responsible gaming before you fund. For discovery browse games and providers, then confirm live titles after login. Editorial policy and team pages explain ownership. About GGLBET is orientation; the rest of the hub turns orientation into journeys while the signed-in session remains authoritative for money movement.",
        "任務協助請開 FAQ、支付、下載或聯絡。較安全遊玩工具請在入金前開負責任博彩。探索請瀏覽遊戲與遊戲商，登入後再確認即時標題。編輯政策與團隊頁說明歸屬。About GGLBET 是定位；中心其餘頁把定位化成旅程，資金移動仍以登入工作階段為準。",
      ),
    },
  ],
  finalCta: {
    eyebrow: L("GGLBET next step", "GGLBET 下一步"),
    heading: L("Move from About GGLBET into clear journeys", "從 About GGLBET 走進清楚旅程"),
    subheading: L(
      "Register, explore Support, or confirm live details after login",
      "註冊、探索 Support，或登入後確認即時細節",
    ),
    body: L(
      "Use FAQ, Payment, Download, and Responsible Gaming with About GGLBET before you deposit. Keep limits nearby and confirm cashier details inside your signed-in session.",
      "入金前請搭配 About GGLBET 使用 FAQ、支付、下載與負責任博彩。把上限放在手邊，並在登入工作階段確認出納細節。",
    ),
    mediaSrc: HUB_MEDIA.aboutCta,
    mediaAlt: L("GGLBET next steps visual", "GGLBET 下一步視覺"),
    ctas: [
      { label: L("Register on GGLBET", "註冊 GGLBET") as unknown as string, href: ROUTES.register, variant: "primary" },
      { label: L("GGLBET Support", "GGLBET 支援中心") as unknown as string, href: ROUTES.support, variant: "outline" },
      { label: L("Browse GGLBET games", "瀏覽 GGLBET 遊戲") as unknown as string, href: ROUTES.games, variant: "soft" },
    ],
  },
});
