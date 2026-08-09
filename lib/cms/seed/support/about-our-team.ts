import { L } from "@/lib/i18n";
import type { TrustPageBlock } from "@/types/eeat";
import { HUB_MEDIA, ROUTES, createTrustPage } from "./factory";

export const aboutOurTeamTrustPage = createTrustPage({
  slug: "about-our-team",
  title: L("About Our Team", "關於我們的團隊"),
  metaTitle: L(
    "About Our Team | GGLBET Editorial, Trust Desk & Newsroom",
    "關於我們的團隊｜GGLBET 編輯、信任小組與新聞室",
  ),
  metaDescription: L(
    "Meet the GGLBET desks behind Support hub content — Editorial, Trust Desk, and Newsroom — and learn how pages for Malaysia players are written, reviewed, and owned.",
    "認識 GGLBET Support 中心內容背後的小組——編輯、信任小組與新聞室——並了解面向馬來西亞玩家的頁面如何撰寫、覆核與歸屬。",
  ),
  heroEyebrow: L("GGLBET people & desks", "GGLBET 人員與小組"),
  heroTitle: L("About the GGLBET team", "關於 GGLBET 團隊"),
  heroDescription: L(
    "Three desks, clear ownership, and a public review path for every GGLBET Support page Malaysia players rely on before they register, deposit, or set limits.",
    "三個小組、清楚責任歸屬，以及每張 GGLBET Support 頁的公開覆核路徑——馬來西亞玩家在註冊、入金或設定限額前可依此判斷。",
  ),
  heroImageSrc: HUB_MEDIA.team,
  lastUpdated: "2026-08-08",
  authorSlug: "gglbet-editorial",
  reviewerSlug: "gglbet-trust-desk",
  schemaType: "CollectionPage",
  summaryCards: [
    {
      title: L("GGLBET Editorial", "GGLBET 編輯"),
      description: L(
        "Owns games, providers, guides, and player-facing Support explainers on the hub.",
        "負責中心上的遊戲、遊戲商、指南與玩家向 Support 說明。",
      ),
    },
    {
      title: L("GGLBET Trust Desk", "GGLBET 信任小組"),
      description: L(
        "Owns payments, policies, and safer-play framing; reviews money-related claims.",
        "負責支付、政策與較安全遊玩表述；覆核涉及資金的主張。",
      ),
    },
    {
      title: L("GGLBET Newsroom", "GGLBET 新聞室"),
      description: L(
        "Publishes dated product and platform updates with sources attached.",
        "發布附來源、具日期的產品與平台更新。",
      ),
    },
    {
      title: L("Named ownership", "具名責任"),
      description: L(
        "Every trust page shows who wrote it, who reviewed it, and when it last changed.",
        "每張信任頁顯示誰撰寫、誰覆核，以及上次變更時間。",
      ),
    },
    {
      title: L("Review before publish", "發布前覆核"),
      description: L(
        "Eligibility, cashier, and responsible-gaming language cannot skip Trust Desk review.",
        "資格、出納與負責任博彩用語不可略過信任小組覆核。",
      ),
    },
    {
      title: L("Correction route", "更正路徑"),
      description: L(
        "Contact with a URL and sentence routes straight to the desk that can fix it.",
        "經聯絡頁附上網址與句子，會直接路由到能修正的小組。",
      ),
    },
  ],
  blocks: [
    {
      type: "tldr",
      id: "tldr",
      text: L(
        "GGLBET Support content is produced by three desks: Editorial writes player explainers and catalog guidance; the Trust Desk owns payments, policies, and safer-play review; the Newsroom publishes dated updates. Every page carries named ownership and a last-updated date so Malaysia players know who to challenge when something looks wrong.",
        "GGLBET Support 內容由三個小組製作：編輯撰寫玩家說明與目錄指引；信任小組負責支付、政策與較安全遊玩覆核；新聞室發布具日期更新。每頁具名責任與最後更新日期，讓馬來西亞玩家在內容有誤時知道可質疑誰。",
      ),
    },
    {
      type: "definition",
      id: "definition",
      term: L("Content owner on GGLBET", "GGLBET 的內容負責人"),
      text: L(
        "A content owner is the named desk accountable for a page being correct today — not only on the day it was written. Ownership includes re-checking the page on its review cadence and responding when Contact routes a factual challenge.",
        "內容負責人是對頁面「今天仍然正確」負責的具名小組——而不只是撰寫當天。責任包含依覆核節奏重查頁面，以及在聯絡頁路由事實質疑時回應。",
      ),
    },
    {
      type: "heading",
      id: "why-team",
      text: L("Why GGLBET shows the team", "為什麼 GGLBET 公開團隊"),
      anchor: "why-team",
    },
    {
      type: "paragraph",
      id: "why-team-1",
      text: L(
        "Anonymous casino filler pages make it hard to know whether anyone stands behind a deposit timing claim or a responsible-gaming tip. GGLBET publishes desk identities so Experience, Expertise, Authoritativeness, and Trustworthiness are visible as working habits rather than slogans. When a Malaysia player reads the Payment page, they should see that Trust Desk review sits behind money language. When they read a guide or FAQ answer, they should see Editorial ownership. When they read a dated update, they should see Newsroom accountability with sources attached.",
        "匿名娛樂城填充頁讓人難以知道是否有人為入金時效主張或負責任博彩提示負責。GGLBET 公開小組身份，讓經驗、專業、權威與可信度成為可見的工作習慣而非口號。當馬來西亞玩家閱讀支付頁時，應看見資金用語背後有信任小組覆核。閱讀指南或 FAQ 答案時，應看見編輯責任。閱讀具日期更新時，應看見新聞室附來源的責任歸屬。",
      ),
    },
    {
      type: "paragraph",
      id: "why-team-2",
      text: L(
        "This page is a CollectionPage-style orientation to the people structures behind the Support hub. It does not invent biographies, licences, or credentials that are not part of the published GGLBET editorial posture. It explains roles, review paths, and how to reach the right desk when a sentence on FAQ, Download, About, Editorial Policy, or Contact needs a challenge.",
        "本頁是 Support 中心背後人員結構的 CollectionPage 式導覽。它不捏造非 GGLBET 已公開編輯姿態的傳記、牌照或資歷。它說明角色、覆核路徑，以及當 FAQ、下載、關於、編輯政策或聯絡頁上的句子需要質疑時，如何找到正確小組。",
      ),
    },
    {
      type: "heading",
      id: "desks",
      text: L("The three GGLBET desks", "三個 GGLBET 小組"),
      anchor: "desks",
    },
    {
      type: "comparison",
      id: "desks-table",
      caption: L("Who owns what on the GGLBET Support hub", "GGLBET Support 中心的責任分工"),
      headers: [
        L("Desk", "小組"),
        L("Owns", "負責"),
        L("Reviews", "覆核"),
      ],
      rows: [
        [
          L("GGLBET Editorial", "GGLBET 編輯"),
          L("Games, providers, guides, Support explainers", "遊戲、遊戲商、指南、Support 說明"),
          L("Newsroom clarity passes", "新聞室清晰度檢查"),
        ],
        [
          L("GGLBET Trust Desk", "GGLBET 信任小組"),
          L("Payments, policies, RG, legal framing", "支付、政策、負責任博彩、法律表述"),
          L("All money and eligibility claims", "所有資金與資格主張"),
        ],
        [
          L("GGLBET Newsroom", "GGLBET 新聞室"),
          L("Dated product and platform updates", "具日期的產品與平台更新"),
          L("Routes facts through Trust Desk", "事實經信任小組路由"),
        ],
      ],
    },
    {
      type: "paragraph",
      id: "editorial-role",
      text: L(
        "GGLBET Editorial drafts the player-facing prose that makes Support destinations usable: how to read an FAQ cluster, how download steps differ on Android and iOS, how About GGLBET orients the brand, and how catalog pages describe games and providers without inventing studio myths. Editorial writers are trained to open with a direct answer, define the key term once, and link into the Support topic cluster so readers are never stranded. They also follow anti-stuffing rules: GGLBET is named naturally for brand clarity, not repeated in every clause.",
        "GGLBET 編輯撰寫讓 Support 目的地可用的玩家向文案：如何閱讀 FAQ 叢集、Android 與 iOS 下載步驟差異、About GGLBET 如何定位品牌，以及目錄頁如何描述遊戲與遊戲商而不捏造工作室神話。編輯受訓以直接答案開場、一次定義關鍵詞，並連入 Support 主題叢集，避免讀者陷入死巷。他們也遵循防堆砌規則：自然提及 GGLBET 以利品牌清晰，而非每句重複。",
      ),
    },
    {
      type: "paragraph",
      id: "trust-role",
      text: L(
        "GGLBET Trust Desk owns the riskiest language on the hub. Deposit and withdrawal explanations, verification expectations, promotion framing that touches wagering, responsible-gaming tool descriptions, and policy pages all require Trust Desk sign-off before publication. The desk also maintains the correction mindset: material errors are fixed, noted, and re-dated. Trust Desk reviewers are organisationally separate from the writer on a given page so review is not a self-check. When Contact marks a message as a content correction, Trust Desk is the default router.",
        "GGLBET 信任小組擁有中心上風險最高的用語。存提款說明、驗證預期、涉及流水的優惠表述、負責任博彩工具描述與政策頁，發布前皆需信任小組簽署。小組也維持更正心態：重大錯誤會修正、註記並更新日期。信任小組覆核者與該頁寫手在組織上分離，使覆核不是自我檢查。當聯絡頁將訊息標為內容更正時，信任小組是預設路由。",
      ),
    },
    {
      type: "paragraph",
      id: "newsroom-role",
      text: L(
        "GGLBET Newsroom publishes time-stamped updates about product and platform changes. Newsroom copy separates reporting from promotional cheerleading, attaches sources, and still routes factual claims that touch money or eligibility through Trust Desk review. A Newsroom update can trigger Support page rewrites when the live cashier or lobby on gglbet5.com changes behaviour that documentation still describes in the old way.",
        "GGLBET 新聞室發布關於產品與平台變更的時間戳更新。新聞室文案區分報導與推廣鼓吹、附上來源，且仍將涉及資金或資格的事實主張送交信任小組覆核。當 gglbet5.com 即時出納或大廳行為變更、而文件仍描述舊方式時，新聞室更新可觸發 Support 頁改寫。",
      ),
    },
    {
      type: "paragraph",
      id: "desks-together",
      text: L(
        "The three desks are complementary, not competitive. Editorial makes journeys readable for Malaysia-facing players who scan on mobile. Trust Desk keeps money and wellbeing language honest. Newsroom keeps the public timeline honest when the product moves. When a Support landing ships — FAQ, Payment, Download, Responsible Gaming, About, Contact, Editorial Policy, or this Team page — at least one desk owns it and, for risk-bearing claims, Trust Desk has already signed. That is how GGLBET turns EEAT from a buzzword into a daily workflow players can inspect through bylines and dates.",
        "三個小組互補而非競爭。編輯讓面向馬來西亞、用手機掃讀的玩家讀得懂旅程。信任小組讓資金與福祉用語誠實。新聞室在產品變動時讓公開時間線誠實。當 Support 登陸頁上線——FAQ、支付、下載、負責任博彩、關於、聯絡、編輯政策或本團隊頁——至少一個小組擁有它，且對風險主張信任小組已經簽署。這就是 GGLBET 把 EEAT 從流行語變成玩家可透過署名與日期檢視的日常流程。",
      ),
    },
    {
      type: "heading",
      id: "review-path",
      text: L("How GGLBET pages are reviewed", "GGLBET 頁面如何覆核"),
      anchor: "review-path",
    },
    {
      type: "steps",
      id: "review-steps",
      title: L("The desk-to-desk review path", "小組到小組的覆核路徑"),
      steps: [
        {
          title: L("Editorial drafts the player answer", "編輯起草玩家答案"),
          text: L(
            "The writer states the Malaysia-facing question, attaches sources, and links related Support destinations.",
            "寫手寫明面向馬來西亞的問題、附上來源，並連結相關 Support 目的地。",
          ),
        },
        {
          title: L("Self-check against the quality bar", "對照品質門檻自查"),
          text: L(
            "Direct answer first, key term defined, no invented figures, responsible-gaming tone intact.",
            "直接答案在前、關鍵詞已定義、無捏造數字、負責任博彩語氣完整。",
          ),
        },
        {
          title: L("Trust Desk independent review", "信任小組獨立覆核"),
          text: L(
            "Money, eligibility, disclosures, and safer-play framing are re-checked against gglbet5.com or the live product.",
            "對照 gglbet5.com 或即時產品重查資金、資格、揭露與較安全遊玩表述。",
          ),
        },
        {
          title: L("Publish with names and a date", "具名並標日期發布"),
          text: L(
            "Author, reviewer where required, and last-updated date ship with the page.",
            "作者、必要時的覆核者與最後更新日期隨頁上線。",
          ),
        },
        {
          title: L("Re-enter the review calendar", "重新進入覆核行事曆"),
          text: L(
            "Payment and policy pages return sooner; catalog explainers return on a longer cycle or on product change.",
            "支付與政策頁較快回來；目錄說明以較長週期或產品變更時回來。",
          ),
        },
      ],
    },
    {
      type: "heading",
      id: "expertise",
      text: L("What sits behind a published GGLBET page", "已發布 GGLBET 頁背後有什麼"),
      anchor: "expertise",
    },
    {
      type: "checklist",
      id: "expertise-list",
      title: L("Working habits across desks", "各小組的工作習慣"),
      items: [
        L(
          "Hands-on checks of flows described on Support pages, not competitor paraphrases.",
          "親身檢查 Support 頁描述的流程，而非競品改寫。",
        ),
        L(
          "Separation between the person who writes and the person who verifies money claims.",
          "撰寫者與驗證資金主張者分離。",
        ),
        L(
          "Training in responsible gambling communication for everyone who publishes.",
          "所有發布者皆接受負責任博彩溝通訓練。",
        ),
        L(
          "Refusal to invent licences, RTP, or bonus multiples absent from official sources.",
          "拒絕捏造官方來源沒有的牌照、RTP 或優惠倍數。",
        ),
        L(
          "A correction path through Contact that can move a page date when substance changes.",
          "經聯絡頁的更正路徑，可在實質變更時移動頁面日期。",
        ),
        L(
          "Malaysia-facing bilingual clarity without pretending every example rail is guaranteed.",
          "面向馬來西亞的雙語清晰度，且不假裝每個範例通道都保證可用。",
        ),
      ],
    },
    {
      type: "heading",
      id: "reach-desk",
      text: L("Reaching the right GGLBET desk", "聯絡正確的 GGLBET 小組"),
      anchor: "reach-desk",
    },
    {
      type: "paragraph",
      id: "reach-1",
      text: L(
        "Account login problems, missing deposits, and withdrawal status questions belong on Contact with the details support needs — never passwords or one-time codes. Factual challenges to hub copy should include the URL and the exact sentence. Trust Desk handles content corrections that affect money or safer-play framing. Editorial handles clarity rewrites when the facts are right but the Malaysia-facing explanation is hard to scan. Newsroom handles dated update requests when a product change needs a public timestamp.",
        "帳號登入問題、入金未到與提款狀態問題應經聯絡頁並附上支援所需細節——從不附密碼或一次性驗證碼。對中心文案的事實質疑應包含網址與精確句子。信任小組處理影響資金或較安全遊玩表述的內容更正。當事實正確但面向馬來西亞的說明難掃讀時，編輯處理清晰度改寫。當產品變更需要公開時間戳時，新聞室處理具日期更新請求。",
      ),
    },
    {
      type: "paragraph",
      id: "reach-2",
      text: L(
        "Malaysia players often ask the same practical question in different words: which human path fixes my issue fastest? The answer is specificity. A Contact message that says “payment broken” without a method, time, or reference is slower than one that names the rail example you selected, the approximate timestamp, and whether the live cashier still shows a pending state. The same rule applies to editorial challenges: quote the sentence. Desks can only re-check what they can find. That discipline protects both players and reviewers from circular tickets that never resolve against gglbet5.com.",
        "馬來西亞玩家常用不同說法問同一個實務問題：哪條人工路徑最快修好我的問題？答案是具體。只說「支付壞了」卻沒有方法、時間或編號的聯絡訊息，比寫出你選的通道範例、大概時間戳，以及即時出納是否仍顯示待處理，更慢。編輯質疑同理：引用句子。小組只能重查找得到的內容。此紀律同時保護玩家與覆核者，避免永遠無法對齊 gglbet5.com 的循環工單。",
      ),
    },
    {
      type: "steps",
      id: "contact-steps",
      title: L("How to get a page reviewed", "如何讓頁面被覆核"),
      steps: [
        {
          title: L("Identify the page", "指出頁面"),
          text: L(
            "Send the GGLBET URL and quote the exact sentence you are questioning.",
            "送出 GGLBET 網址並引用你質疑的精確句子。",
          ),
        },
        {
          title: L("Mark it as a content correction", "標為內容更正"),
          text: L(
            "Use Contact so the message routes to Trust Desk instead of a generic account queue.",
            "使用聯絡頁，讓訊息路由到信任小組而非一般帳號佇列。",
          ),
        },
        {
          title: L("Watch the last-updated date", "留意最後更新日期"),
          text: L(
            "If we agree the hub was wrong, the page changes and its date moves with the fix.",
            "若我們同意中心有誤，頁面會變更且日期隨修正移動。",
          ),
        },
      ],
    },
    {
      type: "callout",
      id: "profiles",
      variant: "info",
      title: L("Every desk has a public profile", "每個小組都有公開簡介"),
      body: L(
        "Author names on GGLBET pages link to desk profiles listing expertise, credentials posture, and scope of accountability. Profiles explain ownership; they do not invent personal celebrity biographies or unverified licence claims.",
        "GGLBET 頁上的作者名稱連到列出專長、資歷姿態與責任範圍的小組簡介。簡介說明責任歸屬；不捏造個人名人傳記或未驗證牌照主張。",
      ),
    },
    {
      type: "heading",
      id: "how-team-fits",
      text: L("How the team fits the Support hub", "團隊如何對齊 Support 中心"),
      anchor: "how-team-fits",
    },
    {
      type: "paragraph",
      id: "fit-1",
      text: L(
        "Support Hub maps destinations. FAQ answers task questions. Payment and Download explain money and install journeys. Responsible Gaming explains limits before funding play. About orients the brand. Editorial Policy states sourcing rules. Contact opens the challenge channel. This Team page tells you which desk stands behind those destinations. Register and Login remain the gates to gglbet5.com, where live availability is confirmed. Together the cluster gives Malaysia players a complete path from orientation to action without treating documentation examples as guaranteed rail lists.",
        "Support 中心對應目的地。FAQ 回答任務問題。支付與下載說明資金與安裝旅程。負責任博彩在入金前說明限額。關於頁定位品牌。編輯政策陳述取材規則。聯絡頁開啟質疑通道。本團隊頁告訴你哪些小組站在這些目的地背後。註冊與登入仍是 gglbet5.com 的入口，即時可用性在此確認。叢集共同為馬來西亞玩家提供從定位到行動的完整路徑，且不把文件範例當成保證通道清單。",
      ),
    },
    {
      type: "callout",
      id: "final-note",
      variant: "tip",
      title: L("Player takeaway", "玩家重點"),
      body: L(
        "If a claim affects money or wellbeing, look for Trust Desk involvement. If you need a journey explained, look for Editorial. If you need a dated change log, look for Newsroom. Challenge any of them through Contact with a precise URL and sentence.",
        "若主張影響資金或福祉，留意信任小組參與。若需要旅程說明，找編輯。若需要具日期變更紀錄，找新聞室。經聯絡頁以精確網址與句子質疑任一小組。",
      ),
    },
  ] as unknown as TrustPageBlock[],
  visualSections: [
    {
      id: "editorial-visual",
      eyebrow: L("GGLBET Editorial", "GGLBET 編輯"),
      heading: L("Writers who open with the player answer", "以玩家答案開場的寫手"),
      subheading: L(
        "Support explainers, guides, and catalog clarity for Malaysia readers.",
        "為馬來西亞讀者而寫的 Support 說明、指南與目錄清晰度。",
      ),
      body: L(
        "Editorial owns the readable path through FAQ clusters, download notes, About orientation, and game or provider discovery — without inventing studio myths or stuffing GGLBET into every clause.",
        "編輯負責 FAQ 叢集、下載備註、About 定位，以及遊戲或遊戲商探索的可讀路徑——不捏造工作室神話，也不在每句堆砌 GGLBET。",
      ),
      mediaSrc: HUB_MEDIA.teamEditorial,
      mediaAlt: L(
        "GGLBET editorial desk artwork",
        "GGLBET 編輯小組視覺",
      ),
      points: [
        {
          title: L("One question per page", "每頁一個問題"),
          body: L(
            "Overlapping articles are merged instead of duplicated for keywords.",
            "重疊文章會合併，而非為關鍵字重複。",
          ),
        },
        {
          title: L("Cluster linking", "叢集連結"),
          body: L(
            "Every explainer points to the next honest Support destination.",
            "每篇說明都指向下一個誠實的 Support 目的地。",
          ),
        },
      ],
      ctas: [
        { label: L("Editorial policy", "編輯政策") as unknown as string, href: ROUTES.editorialPolicy, variant: "primary" },
        { label: L("GGLBET FAQ", "GGLBET 常見問題") as unknown as string, href: ROUTES.faq, variant: "outline" },
      ],
    },
    {
      id: "trust-visual",
      eyebrow: L("GGLBET Trust Desk", "GGLBET 信任小組"),
      heading: L("Reviewers for money and safer play", "資金與較安全遊玩的覆核者"),
      subheading: L(
        "Nothing that moves balance or wellbeing skips independent review.",
        "任何移動餘額或影響福祉的內容都不可略過獨立覆核。",
      ),
      body: L(
        "Trust Desk signs payment, policy, and responsible-gaming language, maintains the correction mindset, and re-checks claims against gglbet5.com when Contact routes a factual challenge.",
        "信任小組簽署支付、政策與負責任博彩用語，維持更正心態，並在聯絡頁路由事實質疑時對照 gglbet5.com 重查主張。",
      ),
      mediaSrc: HUB_MEDIA.teamTrust,
      mediaAlt: L(
        "GGLBET trust desk artwork",
        "GGLBET 信任小組視覺",
      ),
      flip: true,
      points: [
        {
          title: L("Hard blockers", "硬性門檻"),
          body: L(
            "Unverified licence or money claims stop publication outright.",
            "未驗證的牌照或資金主張直接阻止發布。",
          ),
        },
        {
          title: L("Visible dates", "可見日期"),
          body: L(
            "Material fixes move the last-updated stamp players can see.",
            "重大修正會移動玩家看得見的最後更新戳記。",
          ),
        },
      ],
      ctas: [
        { label: L("GGLBET Payment methods", "GGLBET 支付方式") as unknown as string, href: ROUTES.payment, variant: "primary" },
        { label: L("Responsible gaming", "負責任博彩") as unknown as string, href: ROUTES.responsibleGaming, variant: "outline" },
      ],
    },
    {
      id: "newsroom-visual",
      eyebrow: L("GGLBET Newsroom", "GGLBET 新聞室"),
      heading: L("Dated updates with sources attached", "附來源的具日期更新"),
      subheading: L(
        "Reporting stays separate from promotional cheerleading.",
        "報導與推廣鼓吹保持分離。",
      ),
      body: L(
        "Newsroom timestamps product and platform changes, then routes money-sensitive facts through Trust Desk so Support pages can be rewritten when the live product moves.",
        "新聞室為產品與平台變更打上時間戳，並將資金敏感事實送交信任小組，以便即時產品變動時改寫 Support 頁。",
      ),
      mediaSrc: HUB_MEDIA.teamNews,
      mediaAlt: L(
        "GGLBET newsroom artwork",
        "GGLBET 新聞室視覺",
      ),
      points: [
        {
          title: L("Timestamps matter", "時間戳很重要"),
          body: L(
            "Readers can see when an update shipped versus when Support docs changed.",
            "讀者可看見更新何時上線，以及 Support 文件何時變更。",
          ),
        },
        {
          title: L("Source discipline", "來源紀律"),
          body: L(
            "Claims link back to primary product behaviour or official notes.",
            "主張連回主要產品行為或官方註記。",
          ),
        },
      ],
      ctas: [
        { label: L("Platform news", "平台新聞") as unknown as string, href: ROUTES.news, variant: "primary" },
        { label: L("GGLBET Support", "GGLBET 支援中心") as unknown as string, href: ROUTES.support, variant: "outline" },
      ],
    },
    {
      id: "review-visual",
      eyebrow: L("Review path", "覆核路徑"),
      heading: L("From draft to dated GGLBET page", "從草稿到具日期的 GGLBET 頁"),
      subheading: L(
        "Writer, reviewer, and calendar — visible to players.",
        "寫手、覆核者與行事曆——對玩家可見。",
      ),
      body: L(
        "The review path is mechanical on purpose: brief, sourced draft, Trust Desk pass, named publish, scheduled re-check. That is how GGLBET keeps Support landings trustworthy for Malaysia-facing journeys.",
        "覆核路徑刻意機械化：定稿、附來源草稿、信任小組通過、具名發布、排定重查。這就是 GGLBET 讓 Support 登陸頁對面向馬來西亞旅程保持可信的方式。",
      ),
      mediaSrc: HUB_MEDIA.teamReview,
      mediaAlt: L(
        "GGLBET team review artwork",
        "GGLBET 團隊覆核視覺",
      ),
      flip: true,
      points: [
        {
          title: L("Challenge via Contact", "經聯絡頁質疑"),
          body: L(
            "URL plus sentence beats a vague complaint about the whole hub.",
            "網址加句子勝過對整個中心的含糊抱怨。",
          ),
        },
        {
          title: L("No licence theatre", "沒有牌照表演"),
          body: L(
            "Desks refuse invented regulatory claims that gglbet5.com does not publish.",
            "小組拒絕 gglbet5.com 未公布的捏造監管主張。",
          ),
        },
      ],
      ctas: [
        { label: L("Contact GGLBET", "聯絡 GGLBET") as unknown as string, href: ROUTES.contact, variant: "primary" },
        { label: L("About GGLBET", "關於 GGLBET") as unknown as string, href: ROUTES.about, variant: "outline" },
      ],
    },
  ],
  faqHeading: L("GGLBET team FAQ", "GGLBET 團隊常見問題"),
  faqSubheading: L(
    "Desks, ownership, and how reviews work",
    "小組、責任歸屬與覆核如何運作",
  ),
  faqBody: L(
    "Answers about who writes GGLBET Support pages, who reviews them, and how to reach the right desk.",
    "關於誰撰寫 GGLBET Support 頁、誰覆核，以及如何聯絡正確小組的答案。",
  ),
  faq: [
    {
      question: L(
        "Who writes GGLBET Support pages?",
        "誰撰寫 GGLBET Support 頁？",
      ),
      answer: L(
        "GGLBET Editorial drafts most player-facing Support explainers, FAQ clusters, download notes, and orientation pages. Trust Desk owns payment and policy drafts that are money-critical. Newsroom owns dated updates. Author bylines show which desk is accountable.",
        "GGLBET 編輯起草多數玩家向 Support 說明、FAQ 叢集、下載備註與定位頁。信任小組負責資金關鍵的支付與政策草稿。新聞室負責具日期更新。作者署名顯示哪個小組負責。",
      ),
    },
    {
      question: L(
        "Who reviews payment and bonus framing?",
        "誰覆核支付與優惠表述？",
      ),
      answer: L(
        "The GGLBET Trust Desk. It owns those pages and also reviews any Editorial or Newsroom draft that touches money, eligibility, or responsible-gaming framing before publication.",
        "GGLBET 信任小組。它擁有那些頁面，也在發布前覆核任何涉及資金、資格或負責任博彩表述的編輯或新聞室草稿。",
      ),
    },
    {
      question: L(
        "Are authors real people or brand desks?",
        "作者是真人還是品牌小組？",
      ),
      answer: L(
        "Content publishes under desk identities — Editorial, Trust Desk, Newsroom — each with a public profile describing expertise and accountability. That structure is deliberate for continuity and challengeability without inventing celebrity biographies.",
        "內容以小組身份發布——編輯、信任小組、新聞室——各有描述專長與責任的公開簡介。此結構刻意追求延續性與可質疑性，而不捏造名人傳記。",
      ),
    },
    {
      question: L(
        "How do I know a page was reviewed recently?",
        "如何知道頁面最近是否覆核過？",
      ),
      answer: L(
        "Check the author, reviewer where shown, fact-checked marker, and last-updated date on the page. Payment and policy pages return to review sooner than evergreen catalog explainers. Product changes can force an immediate re-check.",
        "查看頁面上的作者、顯示的覆核者、事實查核標記與最後更新日期。支付與政策頁比常青目錄說明更早回到覆核。產品變更可迫使立即重查。",
      ),
    },
    {
      question: L(
        "Can I request that a specific page be reviewed?",
        "我可以請求覆核特定頁面嗎？",
      ),
      answer: L(
        "Yes. Use Contact, mark it as a content correction, and include the URL plus the exact sentence. Trust Desk routes money and safer-play issues first.",
        "可以。使用聯絡頁、標為內容更正，並附上網址與精確句子。信任小組優先路由資金與較安全遊玩問題。",
      ),
    },
    {
      question: L(
        "What does the Newsroom handle?",
        "新聞室處理什麼？",
      ),
      answer: L(
        "Dated product and platform updates with sources attached. Newsroom separates reporting from promotional copy and still sends money-sensitive facts through Trust Desk.",
        "附來源的具日期產品與平台更新。新聞室區分報導與推廣文案，仍將資金敏感事實送交信任小組。",
      ),
    },
    {
      question: L(
        "How does review protect Malaysia players?",
        "覆核如何保護馬來西亞玩家？",
      ),
      answer: L(
        "Independent review catches unverified cashier claims, unclear download safety notes, and responsible-gaming tone problems before they publish. Examples stay labelled as examples so players confirm live rails after login on gglbet5.com.",
        "獨立覆核在發布前抓住未驗證的出納主張、不清的下載安全備註，以及負責任博彩語氣問題。範例維持標示為範例，讓玩家在 gglbet5.com 登入後確認即時通道。",
      ),
    },
    {
      question: L(
        "Do desks invent licences or RTP?",
        "小組會捏造牌照或 RTP 嗎？",
      ),
      answer: L(
        "No. All three desks follow the editorial policy ban on inventing licences, RTP, wagering multiples, or bonus amounts absent from official product facts.",
        "不會。三個小組皆遵循編輯政策，禁止捏造官方產品事實中沒有的牌照、RTP、流水倍數或優惠金額。",
      ),
    },
    {
      question: L(
        "What is the difference between Editorial and Trust Desk?",
        "編輯與信任小組有何差別？",
      ),
      answer: L(
        "Editorial specialises in clear player education and discovery. Trust Desk specialises in money, policy, and safer-play accuracy, plus independent review of those claims wherever they appear.",
        "編輯專長於清晰的玩家教育與探索。信任小組專長於資金、政策與較安全遊玩準確度，並對這些主張無論出現在何處都做獨立覆核。",
      ),
    },
    {
      question: L(
        "Where do author profile links go?",
        "作者簡介連結指向哪裡？",
      ),
      answer: L(
        "Author names on GGLBET pages link to public desk profiles that list expertise areas, credentials posture, and the content scopes each desk owns.",
        "GGLBET 頁上的作者名稱連到公開小組簡介，列出專長領域、資歷姿態，以及各小組負責的內容範圍。",
      ),
    },
    {
      question: L(
        "What should I send with a correction report?",
        "回報更正時應附上什麼？",
      ),
      answer: L(
        "The exact URL, the sentence you believe is wrong, and — if money is involved — a transaction reference or screenshot of live cashier behaviour. Never send passwords or OTP codes.",
        "精確網址、你認為有誤的句子；若涉及金錢，再加上交易編號或即時出納行為截圖。切勿傳送密碼或 OTP。",
      ),
    },
    {
      question: L(
        "How does the team relate to the live GGLBET product?",
        "團隊與即時 GGLBET 產品有何關係？",
      ),
      answer: L(
        "Desks document journeys on the hub and verify claims against the live product. Operational truth for what your account can do still sits in the signed-in gglbet5.com session.",
        "小組在中心記錄旅程，並對照即時產品驗證主張。你帳號能做什麼的營運事實仍位於登入後的 gglbet5.com 工作階段。",
      ),
    },
    {
      question: L(
        "Where should I go after reading About Our Team?",
        "讀完關於我們的團隊後該去哪裡？",
      ),
      answer: L(
        "Open Editorial Policy for sourcing rules, Support Hub for the destination map, FAQ or Payment for tasks, Responsible Gaming before funding play, and Contact to challenge a claim.",
        "打開編輯政策看取材規則、Support 中心看目的地地圖、FAQ 或支付處理任務、入金前先看負責任博彩，並用聯絡頁質疑主張。",
      ),
    },
  ],
  finalCta: {
    eyebrow: L("Work with GGLBET desks", "與 GGLBET 小組協作"),
    heading: L("Know the desk, then take the journey", "認識小組，再走旅程"),
    subheading: L(
      "From ownership clarity to Support destinations Malaysia players use.",
      "從責任清晰度走向馬來西亞玩家使用的 Support 目的地。",
    ),
    body: L(
      "Visit the GGLBET Support hub for the full map, read the editorial policy for sourcing rules, or contact Trust Desk when a sentence needs a challenge.",
      "造訪 GGLBET Support 中心查看完整地圖，閱讀編輯政策了解取材規則，或在句子需要質疑時聯絡信任小組。",
    ),
    mediaSrc: HUB_MEDIA.teamCta,
    mediaAlt: L("GGLBET team next steps artwork", "GGLBET 團隊下一步視覺"),
    ctas: [
      { label: L("GGLBET Support", "GGLBET 支援中心") as unknown as string, href: ROUTES.support, variant: "primary" },
      { label: L("Editorial policy", "編輯政策") as unknown as string, href: ROUTES.editorialPolicy, variant: "outline" },
      { label: L("Contact GGLBET", "聯絡 GGLBET") as unknown as string, href: ROUTES.contact, variant: "soft" },
    ],
  },
});
