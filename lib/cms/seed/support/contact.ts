import { L } from "@/lib/i18n";
import type { TrustPageBlock } from "@/types/eeat";
import { HUB_MEDIA, ROUTES, createTrustPage } from "./factory";

export const contactTrustPage = createTrustPage({
  slug: "contact",
  title: L("Contact GGLBET", "聯絡 GGLBET"),
  metaTitle: L(
    "Contact GGLBET | Customer Service, Live Chat and Email",
    "聯絡 GGLBET｜客服、即時聊天與電子郵件",
  ),
  metaDescription: L(
    "Contact GGLBET customer service for Malaysia players: what to include, live chat and email expectations, response time, support hours, and FAQ prep before you write.",
    "面向馬來西亞玩家的 GGLBET 客服聯絡：應附內容、即時聊天與電郵預期、回覆時間、服務時段，以及來信前的 FAQ 準備。",
  ),
  heroEyebrow: L("GGLBET support contact", "GGLBET 客服聯絡"),
  heroTitle: L("Contact GGLBET", "聯絡 GGLBET"),
  heroDescription: L(
    "Reach the right GGLBET desk the first time—customer service, live chat, email tickets, content corrections, or responsible-gaming requests—without sharing passwords.",
    "一次找到正確的 GGLBET 窗口——客服、即時聊天、電郵工單、內容更正或負責任博彩請求——且不分享密碼。",
  ),
  heroImageSrc: HUB_MEDIA.contact,
  lastUpdated: "2026-08-08",
  authorSlug: "gglbet-editorial",
  reviewerSlug: "gglbet-trust-desk",
  schemaType: "WebPage",
  summaryCards: [
    {
      title: L("Customer Service", "客戶服務"),
      description: L(
        "Account, deposit, and withdrawal questions route to player support with your registered email and references.",
        "帳號、存款與出款問題轉到玩家客服，請附註冊電郵與編號。",
      ),
    },
    {
      title: L("Live Chat", "即時聊天"),
      description: L(
        "Use official live chat when available for time-sensitive cashier status—never paste passwords into the thread.",
        "出納狀態緊迫時，若有官方即時聊天可使用——切勿在執行緒貼上密碼。",
      ),
    },
    {
      title: L("Email", "電子郵件"),
      description: L(
        "Email tickets suit detailed timelines, screenshots, and content corrections that need Trust Desk review.",
        "電郵工單適合詳細時間線、截圖，以及需信任小組覆核的內容更正。",
      ),
    },
    {
      title: L("Response Time", "回覆時間"),
      description: L(
        "Clear first messages resolve faster; payment and responsible-gaming requests are prioritised when queues allow.",
        "清楚的首則訊息更快解決；佇列允許時支付與負責任博彩請求優先。",
      ),
    },
    {
      title: L("Support Hours", "服務時段"),
      description: L(
        "Channel availability can vary; treat contact-page notes and in-product indicators as current, not marketing SLA theatre.",
        "管道可用性可能變化；以聯絡頁備註與產品內指示為準，而非行銷 SLA 表演。",
      ),
    },
    {
      title: L("FAQ prep", "FAQ 準備"),
      description: L(
        "Read GGLBET FAQ, payment, and download pages first so your ticket asks one precise question.",
        "先讀 GGLBET FAQ、支付與下載頁，讓工單只問一個精準問題。",
      ),
    },
  ],
  blocks: [
    {
      type: "tldr",
      id: "tldr",
      text: L(
        "Contact GGLBET through official customer service, live chat, or email channels listed on this hub. Include registered email, timezone-aware timestamps, and cashier references. Payment and responsible-gaming messages are prioritised; content corrections go to the Trust Desk. Never send passwords or one-time codes. Confirm live account facts inside your signed-in session when status screens matter.",
        "請經本中心列出的官方客服、即時聊天或電郵管道聯絡 GGLBET。附上註冊電郵、含時區時間與出納編號。支付與負責任博彩訊息優先；內容更正送信任小組。切勿傳送密碼或一次性驗證碼。當狀態畫面重要時，請在登入工作階段確認即時帳號事實。",
      ),
    },
    {
      type: "definition",
      id: "definition",
      term: L("First-contact resolution", "一次往返解決"),
      text: L(
        "First-contact resolution means GGLBET closes your issue in the initial exchange because your first message already contains identifiers, references, and a clear ask—rather than several rounds of clarification.",
        "一次往返解決是指 GGLBET 在首輪往來就結案，因為你的首則訊息已含識別資料、編號與清楚訴求——而非多輪澄清。",
      ),
    },
    {
      type: "heading",
      id: "customer-service",
      text: L("GGLBET customer service routes", "GGLBET 客戶服務路由"),
      anchor: "customer-service",
    },
    {
      type: "paragraph",
      id: "cs-1",
      text: L(
        "Customer service is the default desk for Malaysia players who need help with login, verification status, deposits, withdrawals, and account flags visible after authentication. Start from bookmarked GGLBET or official product URLs so phishing copies cannot harvest details. Say what you expected, what happened, and what you already tried. If funds moved on your bank or wallet side, say so plainly and attach references from both sides when available. Support can explain status and request missing verification; it cannot invent cashier methods your signed-in session does not offer, or override every external banking delay.",
        "客戶服務是馬來西亞玩家處理登入、驗證狀態、存提款，以及驗證後可見帳號標記的預設窗口。請從書籤中的 GGLBET 或官方產品網址開始，避免仿冒站蒐集資料。說明你預期什麼、發生什麼、已嘗試什麼。若資金已在銀行或錢包端移動，請直說並在可能時附雙方編號。客服可說明狀態並要求補驗證；不能捏造你登入工作階段沒有的出納方法，也不能推翻所有外部銀行延誤。",
      ),
    },
    {
      type: "paragraph",
      id: "cs-2",
      text: L(
        "Responsible-gaming requests for limits, cool-off, or self-exclusion should be labelled clearly so they can jump the general queue. Editorial corrections and media or partnership messages route to different desks and may take longer. Knowing which desk owns the topic prevents duplicate tickets that slow everyone. About GGLBET and editorial policy pages explain content ownership if your issue is a factual dispute on a hub page rather than a cashier event.",
        "上限、冷靜期或自我排除等負責任博彩請求應清楚標示，以便插入一般佇列之前。編輯更正與媒體或合作訊息走不同窗口，可能較久。知道哪個窗口負責該主題，可避免拖慢所有人的重複工單。若問題是中心頁事實爭議而非出納事件，About GGLBET 與編輯政策頁說明內容歸屬。",
      ),
    },
    {
      type: "comparison",
      id: "routing",
      caption: L("Choosing the right GGLBET desk", "選擇正確的 GGLBET 窗口"),
      headers: [
        L("Topic", "主題"),
        L("Desk", "窗口"),
        L("Typical handling", "典型處理"),
      ],
      rows: [
        [
          L("Account, deposits, withdrawals", "帳號、存提款"),
          L("Player support", "玩家客服"),
          L("Hours when queues are normal", "佇列正常時數小時內"),
        ],
        [
          L("Limits, cool-off, self-exclusion", "上限、冷靜期、自我排除"),
          L("Responsible gaming priority", "負責任博彩優先"),
          L("Prioritised ahead of general traffic", "排在一般流量之前"),
        ],
        [
          L("Factual error on a page", "頁面事實錯誤"),
          L("Trust Desk", "信任小組"),
          L("Re-check then re-date if fixed", "重查後若修正則更新日期"),
        ],
        [
          L("Partnership or media", "合作或媒體"),
          L("Editorial", "編輯"),
          L("Longer business-day windows", "較長工作天時窗"),
        ],
      ],
    },
    {
      type: "heading",
      id: "live-chat",
      text: L("Live chat expectations", "即時聊天預期"),
      anchor: "live-chat",
    },
    {
      type: "paragraph",
      id: "chat-1",
      text: L(
        "When official live chat is available inside the signed-in GGLBET experience or linked from this contact page, use it for time-sensitive cashier questions where a short status check helps. Keep the conversation on official surfaces—never move to a personal messaging app because someone claims to be “senior support.” Live chat agents will not ask for your password, full card PAN, or one-time codes. If chat is offline, open an email ticket with the same identifiers instead of waiting in an empty widget. After chat closes, save the transcript reference if one is provided so a follow-up email can continue the same case.",
        "當官方即時聊天在登入後的 GGLBET 體驗內或本聯絡頁連結可用時，請用於需要短暫狀態檢查的緊迫出納問題。把對話留在官方介面——切勿因有人自稱「資深客服」而轉到私人通訊軟體。即時聊天人員不會索取密碼、完整卡號或一次性驗證碼。若聊天離線，請改開電郵工單並附相同識別資料，勿空等元件。聊天結束後若有紀錄編號請保存，方便後續電郵延續同一案件。",
      ),
    },
    {
      type: "paragraph",
      id: "chat-2",
      text: L(
        "Live chat works best when you already completed FAQ prep. Have your registered email, the last cashier reference, and a one-sentence ask ready before the agent joins. Malaysia players often switch between mobile data and Wi-Fi mid-chat; if the widget disconnects, reconnect on the same official page rather than starting a second case with incomplete context. Screenshot the error before you describe it from memory. Chat is not a place to negotiate invented licence claims or RTP figures—agents follow live product state and published official facts.",
        "即時聊天在你已完成 FAQ 準備時最有效。客服加入前，請備妥註冊電郵、最近出納編號，以及一句話訴求。馬來西亞玩家常在聊天中途切換行動數據與 Wi-Fi；若元件斷線，請在同一官方頁重連，而非用不完整脈絡開第二案。描述前先截圖錯誤，勿憑記憶。聊天不是談判捏造牌照主張或 RTP 的地方——客服遵循即時產品狀態與已公開官方事實。",
      ),
    },
    {
      type: "heading",
      id: "email",
      text: L("Email tickets that resolve on the first reply", "能在首回解決的電郵工單"),
      anchor: "email",
    },
    {
      type: "paragraph",
      id: "email-1",
      text: L(
        "Email suits longer timelines, multiple screenshots, and content corrections that need Trust Desk verification against the live product. Subject lines should name the topic—“Withdrawal pending + reference,” “Verification resubmit,” “Responsible gaming cool-off,” or “Hub page factual error”—so routing is obvious. Attach uncropped images and avoid compressing away the corners of ID documents when verification is the issue. Do not embed passwords. If you already started a live chat, mention the chat reference so agents do not rebuild context from zero.",
        "電郵適合較長時間線、多張截圖，以及需信任小組對照即時產品驗證的內容更正。主旨應點名主題——「出款待處理＋編號」、「驗證重傳」、「負責任博彩冷靜期」或「中心頁事實錯誤」——方便路由。附上未裁切影像；驗證問題時避免壓縮掉證件四角。勿嵌入密碼。若已開過即時聊天，請提及聊天編號，避免客服從零重建脈絡。",
      ),
    },
    {
      type: "paragraph",
      id: "email-2",
      text: L(
        "For Malaysia-intent payment tickets, name the rail category you used—FPX-style transfer, Touch 'n Go eWallet, DuitNow, or card—without assuming every method is available to every profile. Say whether the sending side succeeded and whether the GGLBET balance changed. If a promotion is involved, mention the offer name shown in your signed-in session rather than inventing a wagering multiple from memory. Email threads are durable: keep replies in the same conversation so history stays intact for the next agent on shift.",
        "馬來西亞意圖的支付工單，請點名你使用的通道類別——FPX 風格轉帳、Touch 'n Go 電子錢包、DuitNow 或卡片——但不要假設每種方法對每個檔案都可用。說明付款端是否成功、GGLBET 餘額是否變化。若涉及優惠，請提及登入工作階段顯示的優惠名稱，而非憑記憶捏造流水倍數。電郵執行緒持久：請在同一對話回覆，讓下一班客服保留完整歷史。",
      ),
    },
    {
      type: "checklist",
      id: "include-list",
      title: L("Details that speed GGLBET support", "加速 GGLBET 客服的細節"),
      items: [
        L("Registered email address for the account.", "帳號註冊電郵。"),
        L("Date and time of the issue with timezone.", "問題發生日期時間（含時區）。"),
        L("Cashier transaction reference for money questions.", "資金問題的出納交易編號。"),
        L("Game, page name, or URL when relevant.", "相關時的遊戲、頁名或網址。"),
        L("Uncropped screenshot of any error message.", "任何錯誤訊息的未裁切截圖。"),
        L("What you already tried and what you expected.", "你已嘗試什麼、預期結果是什麼。"),
      ],
    },
    {
      type: "heading",
      id: "response-time",
      text: L("Response time and prioritisation", "回覆時間與優先順序"),
      anchor: "response-time",
    },
    {
      type: "paragraph",
      id: "response-1",
      text: L(
        "Account and payment queries are typically handled within hours when queues are normal. Responsible-gaming requests for limits, cool-off, or self-exclusion are prioritised ahead of general traffic because wellbeing and hard stops matter more than routine balance questions. Editorial corrections and partnership messages take longer because they route to specialist desks. Response speed improves dramatically when the first message already contains identifiers. Peak periods, incomplete tickets, and duplicate threads slow everyone. GGLBET will not promise a universal marketing SLA that ignores real queue conditions—use this page and in-product indicators for current channel expectations.",
        "佇列正常時，帳號與支付查詢通常數小時內處理。上限、冷靜期或自我排除等負責任博彩請求會排在一般流量之前，因為福祉與硬停止比例行餘額問題更重要。編輯更正與合作訊息較久，因為會轉到專責窗口。當首則訊息已含識別資料時，回覆速度會明顯提升。尖峰、不完整工單與重複執行緒會拖慢所有人。GGLBET 不會承諾忽視真實佇列的萬能行銷 SLA——請以本頁與產品內指示作為現行管道預期。",
      ),
    },
    {
      type: "heading",
      id: "support-hours",
      text: L("Support hours without invented guarantees", "不捏造保證的服務時段"),
      anchor: "support-hours",
    },
    {
      type: "paragraph",
      id: "hours-1",
      text: L(
        "Channel hours can differ between live chat and email, and holiday or peak traffic can stretch wait times. Treat notes on this contact page and indicators inside your signed-in GGLBET session as the current signal—not a screenshot from a year-old social post. If chat shows offline, email still works for non-urgent cases and creates a durable record. For funds in limbo, say so clearly in the first sentence and include every reference ID up front so the next available agent can act without another round trip.",
        "即時聊天與電郵的時段可能不同，假日或尖峰會拉長等待。請以本聯絡頁備註與登入後 GGLBET 工作階段內的指示為現行訊號——而非一年前社群截圖。若聊天顯示離線，非緊急案件仍可用電郵並留下持久紀錄。若資金懸置，請在首句清楚說明並一開始附上所有編號，讓下一位有空的客服無須再往返即可行動。",
      ),
    },
    {
      type: "heading",
      id: "faq-prep",
      text: L("FAQ prep before you write", "來信前的 FAQ 準備"),
      anchor: "faq-prep",
    },
    {
      type: "paragraph",
      id: "faq-prep-1",
      text: L(
        "Many contact tickets repeat questions already answered on the GGLBET FAQ, payment, download, or responsible-gaming pages. Spending two minutes there often reveals whether you need a status check or simply a concept clarified. FAQ prep does not replace support when your account state is unique—it makes the unique part obvious. Bring one precise ask: “Withdrawal reference X pending since 14:00 MYT after wagering completed,” not “account broken.” That precision is how Malaysia players get faster first-contact resolution on GGLBET.",
        "許多聯絡工單重複 GGLBET FAQ、支付、下載或負責任博彩頁已回答的問題。花兩分鐘閱讀，常能分辨你需要狀態檢查還是概念澄清。FAQ 準備不能取代帳號狀態獨特時的客服——它讓獨特之處更明顯。帶一個精準訴求：「流水完成後，出款編號 X 自 MYT 14:00 起待處理」，而非「帳號壞了」。這種精準度，是馬來西亞玩家在 GGLBET 更快一次往返解決的方式。",
      ),
    },
    {
      type: "paragraph",
      id: "faq-prep-2",
      text: L(
        "A practical prep checklist for Contact GGLBET: open FAQ for the concept, open payment if the issue is cashier framing, open download if install or APK safety is involved, and open responsible gaming if you need a limit or exclusion rather than a higher ceiling. Then write the ticket with identifiers only—no passwords. If you are reporting a hub error, paste the URL and the exact sentence. If you are reporting a live cashier mismatch, say which signed-in screen you are looking at so agents can reconcile documentation with product state without guessing.",
        "聯絡 GGLBET 的實務準備清單：概念看 FAQ，出納架構看支付，安裝或 APK 安全看下載，需要上限或排除而非更高天花板時看負責任博彩。然後只帶識別資料寫工單——不要密碼。若回報中心錯誤，貼上網址與原句。若回報即時出納不符，說明你正在看的登入畫面，讓客服能對齊文件與產品狀態而無須猜測。",
      ),
    },
    {
      type: "steps",
      id: "correction-flow",
      title: L("How a content correction is handled", "內容更正如何處理"),
      steps: [
        {
          title: L("You report it", "你回報"),
          text: L(
            "Send the page URL and the specific statement you believe is wrong.",
            "送出頁面網址與你認為有誤的具體陳述。",
          ),
        },
        {
          title: L("Trust Desk verifies", "信任小組驗證"),
          text: L(
            "The claim is re-checked against the live product or published official facts.",
            "主張會對照即時產品或已公開官方事實重查。",
          ),
        },
        {
          title: L("Page corrected and re-dated", "頁面更正並更新日期"),
          text: L(
            "If the hub was wrong, editors fix it and update the last-updated date.",
            "若中心有誤，編輯會修正並更新最後更新日期。",
          ),
        },
      ],
    },
    {
      type: "callout",
      id: "never-share",
      variant: "warning",
      title: L("GGLBET will never ask for your password", "GGLBET 絕不會索取你的密碼"),
      body: L(
        "No legitimate representative requests passwords, full card numbers, or one-time codes by chat, email, or SMS. Treat urgent secret requests as phishing, report them through official contact, and change your password from a known-good session if you already shared something.",
        "任何合法人員都不會以聊天、電子郵件或簡訊索取密碼、完整卡號或一次性驗證碼。把緊急密鑰要求視為釣魚，經官方聯絡回報；若已分享，請從已知安全工作階段更改密碼。",
      ),
    },
    {
      type: "paragraph",
      id: "closing",
      text: L(
        "Contact GGLBET as a Malaysia-intent support journey: prepare with FAQ, choose customer service, live chat, or email, include identifiers, respect response-time and hours realities, and confirm money-moving facts inside your signed-in session before you treat any reply as final for cashier behaviour.",
        "把聯絡 GGLBET 當成馬來西亞意圖的客服旅程：用 FAQ 準備、選擇客服／即時聊天或電郵、附上識別資料、尊重回覆時間與時段現實，並在把任何回覆當成出納行為定論前，於登入工作階段確認資金事實。",
      ),
    },
  ] as unknown as TrustPageBlock[],
  visualSections: [
    {
      id: "contact-service",
      eyebrow: L("Customer service", "客戶服務"),
      heading: L("Reach the right GGLBET desk", "找到正確的 GGLBET 窗口"),
      subheading: L(
        "Accounts, money, and safer-play requests",
        "帳號、資金與較安全遊玩請求",
      ),
      body: L(
        "Label responsible-gaming needs clearly, keep money references handy, and start from official bookmarked URLs only.",
        "清楚標示負責任博彩需求、備好資金編號，並只從官方書籤網址開始。",
      ),
      mediaSrc: HUB_MEDIA.contactChat,
      mediaAlt: L("Contact GGLBET customer service visual", "聯絡 GGLBET 客服視覺"),
      points: [
        {
          title: L("Identifiers first", "識別資料優先"),
          body: L(
            "Registered email and timestamps unlock faster routing.",
            "註冊電郵與時間戳加速路由。",
          ),
        },
        {
          title: L("One thread", "單一執行緒"),
          body: L(
            "Update the original ticket instead of opening duplicates.",
            "更新原工單，勿重複開單。",
          ),
        },
      ],
      ctas: [
        { label: L("GGLBET FAQ", "GGLBET 常見問題") as unknown as string, href: ROUTES.faq, variant: "primary" },
        { label: L("GGLBET Support", "GGLBET 支援中心") as unknown as string, href: ROUTES.support, variant: "outline" },
      ],
    },
    {
      id: "contact-support-cluster",
      eyebrow: L("Support cluster", "客服集群"),
      heading: L("Use Support pages before you escalate", "升級前先用 Support 頁"),
      subheading: L(
        "FAQ, payment, and download reduce repeat questions",
        "FAQ、支付與下載減少重複問題",
      ),
      body: L(
        "Contact works best when you already know whether the issue is a concept, a missing rail, or an account-specific flag.",
        "當你已知道問題是概念、缺少通道，或帳號專屬標記時，聯絡最有效。",
      ),
      mediaSrc: HUB_MEDIA.contactEmail,
      mediaAlt: L("GGLBET support cluster visual", "GGLBET 客服集群視覺"),
      flip: true,
      ctas: [
        { label: L("GGLBET Support", "GGLBET 支援中心") as unknown as string, href: ROUTES.support, variant: "primary" },
        { label: L("GGLBET Payment methods", "GGLBET 支付方式") as unknown as string, href: ROUTES.payment, variant: "outline" },
      ],
    },
    {
      id: "contact-faq-prep",
      eyebrow: L("FAQ prep", "FAQ 準備"),
      heading: L("Ask one precise GGLBET question", "只問一個精準的 GGLBET 問題"),
      subheading: L(
        "Concept vs status—know which you need",
        "概念對狀態——先分清需求",
      ),
      body: L(
        "FAQ prep turns vague frustration into a ticket support can actually close on first contact.",
        "FAQ 準備把含糊挫折變成客服能在一次往返結案的工單。",
      ),
      mediaSrc: HUB_MEDIA.contactFaqDesk,
      mediaAlt: L("GGLBET FAQ prep for contact visual", "GGLBET 聯絡前 FAQ 準備視覺"),
      ctas: [
        { label: L("GGLBET FAQ", "GGLBET 常見問題") as unknown as string, href: ROUTES.faq, variant: "primary" },
        { label: L("Download GGLBET", "下載 GGLBET") as unknown as string, href: ROUTES.download, variant: "outline" },
      ],
    },
    {
      id: "contact-cta",
      eyebrow: L("Next step", "下一步"),
      heading: L("Ready to register or return to play?", "準備註冊或回到遊玩？"),
      subheading: L(
        "Keep limits nearby after support helps",
        "客服協助後仍把上限放在手邊",
      ),
      body: L(
        "When your ticket closes, confirm cashier details inside your signed-in GGLBET session and revisit responsible-gaming tools before the next deposit.",
        "工單結案後，請在登入的 GGLBET 工作階段確認出納細節，並在下次存款前重看負責任博彩工具。",
      ),
      mediaSrc: HUB_MEDIA.contactPrep,
      mediaAlt: L("GGLBET contact next step visual", "GGLBET 聯絡下一步視覺"),
      flip: true,
      ctas: [
        { label: L("Register on GGLBET", "註冊 GGLBET") as unknown as string, href: ROUTES.register, variant: "primary" },
        {
          label: L("Responsible gaming", "負責任博彩") as unknown as string,
          href: ROUTES.responsibleGaming,
          variant: "outline",
        },
      ],
    },
  ],
  faqHeading: L(
    "Contact GGLBET frequently asked questions",
    "聯絡 GGLBET 常見問題",
  ),
  faqSubheading: L(
    "Customer service, chat, email, timing, and prep",
    "客服、聊天、電郵、時程與準備",
  ),
  faqBody: L(
    "These contact answers focus on how to reach GGLBET safely. For product concepts, read the FAQ hub first; for money movement, confirm the signed-in cashier.",
    "這些聯絡答案聚焦如何安全聯繫 GGLBET。產品概念請先讀 FAQ 中心；資金移動請確認登入後出納。",
  ),
  faq: [
    {
      question: L(
        "How do I contact GGLBET customer support?",
        "如何聯絡 GGLBET 客服？",
      ),
      answer: L(
        "Use the official contact channels listed on this GGLBET page for player support. Include your registered email so the desk can locate the correct account. Payment and responsible-gaming messages are prioritised; editorial corrections and media requests follow different desks. Never send passwords, full card numbers, or one-time codes. Start from bookmarked GGLBET URLs. If you already have a live chat or ticket thread, keep using it instead of opening duplicates.",
        "請使用本 GGLBET 頁列出的官方玩家客服管道。附上註冊電郵以便定位正確帳號。支付與負責任博彩訊息優先；編輯更正與媒體請求走不同窗口。切勿傳送密碼、完整卡號或一次性驗證碼。從書籤 GGLBET 網址開始。若已有即時聊天或工單執行緒，請繼續使用，勿重複開單。",
      ),
    },
    {
      question: L(
        "What should I include in a GGLBET support ticket?",
        "GGLBET 客服工單應包含什麼？",
      ),
      answer: L(
        "Include registered email, date and time with timezone, the page or feature involved, and—for money—cashier transaction references plus uncropped screenshots. Say what you tried and what you expected. For login problems, note device and whether you reached an official domain. For responsible-gaming requests, name the tool you need. Do not paste passwords. Precise first messages need fewer clarification rounds.",
        "請附註冊電郵、含時區日期時間、相關頁面或功能；若涉及資金，請附出納交易編號與未裁切截圖。說明已嘗試與預期結果。登入問題請註明裝置與是否到達官方網域。負責任博彩請求請寫出需要的工具。勿貼密碼。精準首則訊息需要的澄清回合更少。",
      ),
    },
    {
      question: L(
        "When should I use GGLBET live chat vs email?",
        "何時該用 GGLBET 即時聊天或電子郵件？",
      ),
      answer: L(
        "Use official live chat when it is available and you need a short, time-sensitive status check on a cashier or login issue. Use email when you need to attach multiple screenshots, build a timeline, or send a content correction to the Trust Desk. If chat is offline, email still creates a durable record. Never move an official chat onto a personal messaging app because someone claims to be senior support.",
        "當官方即時聊天可用，且你需要對出納或登入問題做短暫緊迫狀態檢查時使用聊天。需要多張截圖、建立時間線，或把內容更正送給信任小組時使用電郵。若聊天離線，電郵仍可留下持久紀錄。切勿因有人自稱資深客服，就把官方聊天轉到私人通訊軟體。",
      ),
    },
    {
      question: L(
        "GGLBET login is failing — how can support help?",
        "GGLBET 登入失敗——客服能如何協助？",
      ),
      answer: L(
        "Confirm you are on an official domain from contact or home navigation, not a search-ad clone. Retry a known-good browser, clear stuck sessions, and use official password reset if needed. When you contact support, include exact error text, device, and whether failure happens on web, Android, or iOS. Support can check account flags but will never ask you to read back a password or SMS code. Uninstall unofficial APKs and return to official download links before further troubleshooting.",
        "請先確認你在來自聯絡或首頁導覽的官方網域，而非搜尋廣告仿站。用可靠瀏覽器重試、清除卡住的工作階段，必要時走官方密碼重設。聯絡客服時請附確切錯誤文字、裝置，以及失敗發生在網頁、Android 或 iOS。客服可檢查帳號標記，但絕不會要求回讀密碼或簡訊碼。先卸載非官方 APK 並回到官方下載連結再繼續排查。",
      ),
    },
    {
      question: L(
        "Can GGLBET support help with account verification issues?",
        "GGLBET 客服能協助帳號驗證問題嗎？",
      ),
      answer: L(
        "Yes. Support can explain which documents are outstanding, why a submission was rejected, and how to resubmit clearer images through official account flows. Typical problems include cropped edges, expired IDs, mismatched addresses, or glare. Support will not accept password sharing as a shortcut or ask you to email sensitive photos to random addresses outside the product. Completing verification before first withdrawal remains the fastest path to smoother payouts.",
        "可以。客服可說明尚缺哪些文件、為何提交被拒，以及如何經官方帳號流程重傳更清晰影像。典型問題包括邊緣裁切、證件過期、地址不符或反光。客服不會接受分享密碼當捷徑，也不會要求你把敏感照片寄到產品外的隨機地址。首次出款前完成驗證，仍是讓出款更順的最快路徑。",
      ),
    },
    {
      question: L(
        "How does GGLBET support handle deposit or withdrawal problems?",
        "GGLBET 客服如何處理存提款問題？",
      ),
      answer: L(
        "Provide method (for example FPX-style transfer, Touch 'n Go eWallet, DuitNow, or card), amount, time, and transaction references from GGLBET and your bank or wallet when available. Say whether funds left your side and whether the GGLBET balance changed. Support can trace pending reviews, request verification, or explain wagering blocks—but cannot control every external banking delay. Never pay a third party who claims they can release a withdrawal for a fee.",
        "請提供方式（例如 FPX 風格轉帳、Touch 'n Go 電子錢包、DuitNow 或卡片）、金額、時間，以及 GGLBET 與銀行／錢包（若有）的交易編號。說明資金是否已離開你這端、GGLBET 餘額是否變化。客服可追蹤待審、要求驗證或說明流水阻擋——但無法控制所有外部銀行延誤。切勿向聲稱付費即可放行出款的第三方付款。",
      ),
    },
    {
      question: L(
        "How fast does GGLBET support respond?",
        "GGLBET 客服回覆有多快？",
      ),
      answer: L(
        "Account and payment queries are typically handled within hours when queues are normal. Responsible-gaming requests are prioritised. Editorial corrections and partnership messages can take longer. Speed improves when the first message already contains identifiers. Peak periods and duplicate threads slow everyone. Use this contact page for current channel expectations rather than assuming a universal SLA.",
        "佇列正常時，帳號與支付查詢通常數小時內處理。負責任博彩請求優先。編輯更正與合作訊息可能較久。當首則訊息已含識別資料時速度會提升。尖峰與重複執行緒會拖慢所有人。請以本聯絡頁的現行管道預期為準，勿假設萬能 SLA。",
      ),
    },
    {
      question: L(
        "What are GGLBET support hours?",
        "GGLBET 的服務時段是什麼？",
      ),
      answer: L(
        "Hours can differ between live chat and email and may stretch during peaks or holidays. Treat notes on this page and indicators inside your signed-in GGLBET session as current. If chat is offline, email still works for durable records. For time-critical fund issues, state urgency in the first sentence and include every reference ID immediately.",
        "即時聊天與電郵時段可能不同，尖峰或假日可能拉長。請以本頁備註與登入後 GGLBET 工作階段內指示為準。若聊天離線，電郵仍可留下持久紀錄。對時間緊迫的資金問題，請在首句說明緊急程度並立刻附上所有編號。",
      ),
    },
    {
      question: L(
        "Will GGLBET ever ask for my password?",
        "GGLBET 會要求我提供密碼嗎？",
      ),
      answer: L(
        "Never. No legitimate GGLBET representative asks for passwords, full card PANs, or one-time codes by chat, email, or SMS. Treat messages that do—especially urgent withdrawal or “security review” lures—as phishing. Report through official contact without replying to the bait. Sign in only on official domains. If you already shared a secret, change your password from a known-good session and tell support what happened.",
        "絕不會。任何合法 GGLBET 人員都不會以聊天、電子郵件或簡訊索取密碼、完整卡號或一次性驗證碼。凡是這樣要求的訊息——尤其緊急出款或「安全審查」誘餌——請視為釣魚。經官方聯絡回報且不要回覆誘餌。只在官方網域登入。若已洩漏密鑰，請從已知安全工作階段改密並告知客服。",
      ),
    },
    {
      question: L(
        "Can support raise my GGLBET deposit limit immediately?",
        "客服可以立刻提高我的 GGLBET 存款上限嗎？",
      ),
      answer: L(
        "No. Increases go through a cooling-off period by design so safer-play choices cannot be undone in a heated moment. Decreases usually apply immediately and you can often set them yourself. Support can explain where the control lives and whether a pending increase is still cooling down, but should not bypass the delay as a favour. If you need a hard stop, ask for cool-off or self-exclusion instead.",
        "不可以。提高上限依設計必須經過冷卻期，避免在情緒激動時推翻較安全選擇。調降通常立即生效，且多半可自行設定。客服可說明控制項位置，並確認待生效調升是否仍在冷卻，但不應把跳過等待當成人情。若需要硬停止，請改要求冷靜期或自我排除。",
      ),
    },
    {
      question: L(
        "How do I report a factual error on a GGLBET page?",
        "如何回報 GGLBET 頁面上的事實錯誤？",
      ),
      answer: L(
        "Send the page URL and the specific claim through contact routes that reach the Trust Desk. Explain what you observed on the live product if the hub disagrees. The desk re-checks primary sources and, when the hub was wrong, corrects and re-dates the page. Money, eligibility, and responsible-gaming framing errors are prioritised. Do not invent alternative licence or RTP figures in your report—describe the mismatch.",
        "請經可送達信任小組的聯絡管道送出頁面網址與具體主張。若中心與即時產品不符，請說明你觀察到的內容。小組會重查主要來源；若中心有誤，會更正並更新日期。資金、資格與負責任博彩表述錯誤優先。回報時勿捏造替代牌照或 RTP——描述落差即可。",
      ),
    },
    {
      question: L(
        "Should I read the GGLBET FAQ before contacting support?",
        "聯絡客服前應該先讀 GGLBET FAQ 嗎？",
      ),
      answer: L(
        "Yes when your question is conceptual—registration steps, wagering ideas, download safety, or how limits work. FAQ prep often solves the doubt without a ticket. Contact support when you need account-specific status, a stalled payment reference, or a correction. Bringing FAQ context into a precise ask still helps agents close faster on first contact.",
        "若問題偏概念——註冊步驟、流水概念、下載安全或上限如何運作——建議先讀。FAQ 準備常能在不開工單的情況下解決疑惑。需要帳號專屬狀態、卡住的支付編號或更正時再聯絡客服。把 FAQ 脈絡帶進精準訴求，仍有助客服更快一次結案。",
      ),
    },
    {
      question: L(
        "What account issues can GGLBET support not solve alone?",
        "哪些帳號問題是 GGLBET 客服無法單獨解決的？",
      ),
      answer: L(
        "Support cannot reverse a completed self-exclusion early, invent cashier methods your live session does not offer, override bank or wallet declines on FPX, TnG, DuitNow, or cards, or provide therapy for gambling harm. It also cannot confirm funds that never left your bank or guarantee external processing times after approval. It can explain status, request verification, point to responsible-gaming tools, and escalate genuine product defects.",
        "客服無法提前解除已生效自我排除、捏造你即時工作階段沒有的出納方法、推翻銀行或錢包對 FPX、TnG、DuitNow 或卡片的拒單，也不能提供博彩傷害治療。同樣無法確認從未離開你銀行的資金，或在核准後保證外部處理時間。能做的是說明狀態、要求驗證、指引負責任博彩工具，以及升級真正的產品缺陷。",
      ),
    },
  ],
  finalCta: {
    eyebrow: L("GGLBET next step", "GGLBET 下一步"),
    heading: L("Contact prepared—or continue on GGLBET", "準備好聯絡——或繼續使用 GGLBET"),
    subheading: L(
      "FAQ first, then chat or email with identifiers ready",
      "先 FAQ，再帶著識別資料使用聊天或電郵",
    ),
    body: L(
      "Use GGLBET FAQ and Payment pages before you write. Keep responsible-gaming tools nearby, and confirm live cashier details inside your signed-in session.",
      "來信前請先看 GGLBET FAQ 與支付頁。把負責任博彩工具放在手邊，並在登入工作階段確認即時出納細節。",
    ),
    mediaSrc: HUB_MEDIA.contactCta,
    mediaAlt: L("GGLBET contact next steps visual", "GGLBET 聯絡下一步視覺"),
    ctas: [
      { label: L("GGLBET FAQ", "GGLBET 常見問題") as unknown as string, href: ROUTES.faq, variant: "primary" },
      { label: L("Register on GGLBET", "註冊 GGLBET") as unknown as string, href: ROUTES.register, variant: "outline" },
      {
        label: L("Responsible gaming", "負責任博彩") as unknown as string,
        href: ROUTES.responsibleGaming,
        variant: "soft",
      },
    ],
  },
});
