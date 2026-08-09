import { L } from "@/lib/i18n";
import type { TrustPageBlock } from "@/types/eeat";
import { HUB_MEDIA, ROUTES, createTrustPage } from "./factory";

export const editorialPolicyTrustPage = createTrustPage({
  slug: "editorial-policy",
  title: L("GGLBET Editorial Policy", "GGLBET 編輯政策"),
  metaTitle: L(
    "GGLBET Editorial Policy | Sourcing, Corrections & Disclosures",
    "GGLBET 編輯政策｜取材、更正與揭露",
  ),
  metaDescription: L(
    "Read how GGLBET researches, reviews, and corrects Support hub content for Malaysia-facing players — sourcing rules, disclosure standards, and what happens when a claim is wrong.",
    "了解 GGLBET 如何為面向馬來西亞玩家的 Support 中心取材、覆核與更正——取材規則、揭露標準，以及主張有誤時如何處理。",
  ),
  heroEyebrow: L("GGLBET trust standards", "GGLBET 信任標準"),
  heroTitle: L(
    "GGLBET editorial policy",
    "GGLBET 編輯政策",
  ),
  heroDescription: L(
    "The sourcing, disclosure, and correction rules behind every GGLBET Support page — written for Malaysia players who need clarity before they deposit, download, or contact support.",
    "每一頁 GGLBET Support 內容背後的取材、揭露與更正規則——寫給需要在入金、下載或聯絡支援前先看清楚的馬來西亞玩家。",
  ),
  heroImageSrc: HUB_MEDIA.editorial,
  lastUpdated: "2026-08-08",
  authorSlug: "gglbet-editorial",
  reviewerSlug: "gglbet-trust-desk",
  summaryCards: [
    {
      title: L("Primary sourcing", "主要來源"),
      description: L(
        "GGLBET claims track gglbet5.com, the live product, or named official docs — never unsourced aggregator copy.",
        "GGLBET 主張對齊 gglbet5.com、即時產品或具名官方文件——從不採用無來源的彙整文案。",
      ),
    },
    {
      title: L("Independent review", "獨立覆核"),
      description: L(
        "Money, eligibility, and safer-play wording is checked by the GGLBET Trust Desk before publication.",
        "涉及資金、資格與較安全遊玩的用語，發布前由 GGLBET 信任小組覆核。",
      ),
    },
    {
      title: L("Malaysia-facing clarity", "面向馬來西亞的清晰度"),
      description: L(
        "Payment, download, and FAQ pages use bilingual habits Malaysia players recognise without inventing local licences.",
        "支付、下載與 FAQ 頁採用馬來西亞玩家熟悉的雙語習慣，且不捏造本地牌照。",
      ),
    },
    {
      title: L("On-page disclosures", "頁面內揭露"),
      description: L(
        "Commercial context that could influence coverage is disclosed on the page, not buried in a policy nobody opens.",
        "可能影響報導範圍的商業脈絡會在頁面揭露，而非埋在無人打開的政策裡。",
      ),
    },
    {
      title: L("Visible corrections", "可見更正"),
      description: L(
        "Material errors are fixed, noted, and re-dated so readers can see the GGLBET page moved.",
        "重大錯誤會修正、註記並更新日期，讓讀者看見 GGLBET 頁面已變更。",
      ),
    },
    {
      title: L("Named ownership", "具名責任"),
      description: L(
        "Every GGLBET trust page shows author, reviewer where required, and a last-updated date.",
        "每張 GGLBET 信任頁顯示作者、必要時的覆核者，以及最後更新日期。",
      ),
    },
  ],
  blocks: [
    {
      type: "tldr",
      id: "tldr",
      text: L(
        "GGLBET publishes Support hub pages only when claims can be traced to gglbet5.com, the live product, or another named official source; a separate Trust Desk reviews money and safer-play language; commercial relationships are disclosed on the page; and material mistakes are corrected with a visible date change. Malaysia-facing clarity means bilingual, practical journeys — not invented licences or RTP.",
        "GGLBET 僅在主張可追溯至 gglbet5.com、即時產品或其他具名官方來源時發布 Support 中心頁；獨立的信任小組覆核資金與較安全遊玩用語；商業關係在頁面揭露；重大錯誤會更正並明顯更新日期。面向馬來西亞的清晰度意指雙語、實用旅程——而非捏造牌照或 RTP。",
      ),
    },
    {
      type: "definition",
      id: "definition",
      term: L("Editorial independence at GGLBET", "GGLBET 的編輯獨立"),
      text: L(
        "Editorial independence means the people who decide what a GGLBET page says are organisationally separate from teams that sell coverage or promotions. Commercial teams may request that a topic is covered; they cannot approve, veto, or rewrite a factual conclusion about payments, eligibility, or responsible gaming.",
        "編輯獨立意指決定 GGLBET 頁面內容的人，與銷售曝光或優惠的團隊在組織上分離。商業團隊可請求涵蓋某主題；但不能核准、否決或改寫關於支付、資格或負責任博彩的事實結論。",
      ),
    },
    {
      type: "heading",
      id: "why-policy",
      text: L("Why GGLBET publishes this policy", "為什麼 GGLBET 公布這份政策"),
      anchor: "why-policy",
    },
    {
      type: "paragraph",
      id: "why-policy-1",
      text: L(
        "Players who land on GGLBET Support pages are usually mid-decision: registering, choosing a deposit rail, installing an app, setting a limit, or deciding whether a FAQ answer matches what they see after login. Those moments reward clarity and punish guesswork. A thin policy page that only says “we care about accuracy” does not help a Malaysia-facing player judge whether a cashier timing note, a download step, or a responsible-gaming tip is grounded in something real. This editorial policy exists so readers, search systems, and internal desks share one standard for how GGLBET content is researched, labelled, and corrected.",
        "造訪 GGLBET Support 頁的玩家通常正處於決策中：註冊、選擇入金通道、安裝應用、設定限額，或判斷 FAQ 答案是否與登入後所見一致。這些時刻需要清晰，並懲罰臆測。只說「我們重視準確」的單薄政策頁，無法幫助面向馬來西亞的玩家判斷出納時效、下載步驟或負責任博彩提示是否有根據。本編輯政策讓讀者、搜尋系統與內部小組對 GGLBET 內容如何研究、標示與更正有同一套標準。",
      ),
    },
    {
      type: "paragraph",
      id: "why-policy-2",
      text: L(
        "GGLBET is the branded content hub that sits beside the live product on gglbet5.com. Hub pages explain journeys; the signed-in session executes them. When documentation and the live lobby, cashier, or offer screen disagree, players should follow gglbet5.com. That hierarchy is not a loophole — it is the honest way to write about a product that can change faster than a static article. The policy below encodes that honesty into sourcing rules, disclosure habits, Malaysia-facing clarity, and a corrections workflow the Trust Desk can actually run.",
        "GGLBET 是位於 gglbet5.com 即時產品旁的品牌內容中心。中心頁說明旅程；登入後的工作階段執行旅程。當文件與即時大廳、出納或優惠畫面不一致時，玩家應遵循 gglbet5.com。此層級不是漏洞——而是書寫可能比靜態文章更快變更之產品的誠實方式。下列政策把誠實寫進取材規則、揭露習慣、面向馬來西亞的清晰度，以及信任小組能實際執行的更正流程。",
      ),
    },
    {
      type: "heading",
      id: "sourcing",
      text: L("Sourcing standards on GGLBET", "GGLBET 的取材標準"),
      anchor: "sourcing",
    },
    {
      type: "paragraph",
      id: "sourcing-1",
      text: L(
        "Every factual claim on a GGLBET Support page must point to a source a reviewer can re-check without repeating the entire research pass. Acceptable sources include the live GGLBET product behaviour after authentication, published pages and cashier states on gglbet5.com, provider or studio documentation for mechanics that studios actually publish, and payment-processor or bank guidance when we describe how a rail generally works. Named, dated third-party research is allowed only when a claim cannot be verified first-hand and the limitation is clear in the prose. Unattributed aggregator copy, anonymous forum summaries, and competitor paraphrases are not acceptable sources for money, eligibility, or licensing language.",
        "GGLBET Support 頁上的每一項事實主張，都必須指向覆核者無需重做整段研究即可再查的來源。可接受來源包括驗證後的即時 GGLBET 產品行為、gglbet5.com 上已公開頁面與出納狀態、工作室實際公開的機制文件，以及在描述通道一般如何運作時的支付處理商或銀行指引。僅在無法第一手驗證且文中清楚標示限制時，才可使用具名、有日期的第三方研究。無來源彙整文案、匿名論壇摘要與競品改寫，不可作為資金、資格或牌照用語的來源。",
      ),
    },
    {
      type: "checklist",
      id: "sourcing-list",
      title: L("What qualifies as an acceptable GGLBET source", "什麼算合格的 GGLBET 來源"),
      items: [
        L(
          "Live product checks on gglbet5.com for flows, labels, and availability after login.",
          "登入後於 gglbet5.com 對流程、標籤與可用性的即時產品檢查。",
        ),
        L(
          "Official GGLBET hub pages that already carry dated ownership for related journeys.",
          "已具日期責任歸屬、說明相關旅程的官方 GGLBET 中心頁。",
        ),
        L(
          "Provider or studio docs for mechanics they publish — never invented RTP or founding myths.",
          "工作室公開的機制文件——從不捏造 RTP 或創立神話。",
        ),
        L(
          "Processor or bank materials when explaining general deposit or withdrawal patterns.",
          "說明一般存提款模式時的處理商或銀行資料。",
        ),
        L(
          "Reader reports that can be reproduced against the live cashier or lobby.",
          "可對照即時出納或大廳重現的讀者回報。",
        ),
        L(
          "Never: unsourced affiliate roundups, anonymous tips, or licence claims without a published basis.",
          "禁止：無來源聯盟彙整、匿名秘訣，或無公開依據的牌照主張。",
        ),
      ],
    },
    {
      type: "paragraph",
      id: "sourcing-2",
      text: L(
        "Sourcing discipline is especially strict on payment, download, FAQ, and responsible-gaming pages because those journeys affect money and wellbeing. If a Malaysia player reads that FPX-style bank transfer, Touch 'n Go eWallet, DuitNow, or card pathways may appear in the cashier, that sentence must remain an explanatory example tied to what the product surface can show — not a guarantee that every rail is available to every account today. When evidence is incomplete, GGLBET removes the claim rather than softening it with vague language that still sounds like a promise.",
        "支付、下載、FAQ 與負責任博彩頁的取材紀律特別嚴格，因為這些旅程影響資金與福祉。若馬來西亞玩家讀到出納可能出現 FPX 風格銀行轉帳、Touch 'n Go 電子錢包、DuitNow 或卡片路徑，該句必須仍是對齊產品面可能呈現內容的說明範例——而非保證每條通道今天對每個帳號都可用。證據不足時，GGLBET 會刪除主張，而不是用聽起來仍像保證的含糊用語淡化它。",
      ),
    },
    {
      type: "heading",
      id: "malaysia-clarity",
      text: L("Malaysia-facing clarity without invented claims", "面向馬來西亞的清晰度，不捏造主張"),
      anchor: "malaysia-clarity",
    },
    {
      type: "paragraph",
      id: "malaysia-1",
      text: L(
        "Malaysia-facing clarity means GGLBET organises Support copy around the questions players in Malaysia actually ask: how to register safely, what to expect from deposits and withdrawals, how Android and iOS download notes differ, where responsible-gaming tools live, and how to contact the right desk. It also means bilingual English and Traditional Chinese where the hub serves dual-language reading habits. It does not mean inventing a Malaysian licence, a local regulator endorsement, or a studio RTP figure that gglbet5.com does not publish. Clarity is useful; compliance theatre is not.",
        "面向馬來西亞的清晰度，意指 GGLBET 依馬來西亞玩家真正會問的問題組織 Support 文案：如何安全註冊、存提款預期、Android 與 iOS 下載備註差異、負責任博彩工具在哪、如何聯絡正確窗口。也意指在中心服務雙語閱讀習慣時提供英文與繁體中文。這不代表捏造馬來西亞牌照、本地監管背書，或 gglbet5.com 未公布的工作室 RTP。清晰有用；合規表演無用。",
      ),
    },
    {
      type: "paragraph",
      id: "malaysia-2",
      text: L(
        "Writers are instructed to name GGLBET naturally in heroes, summaries, and journey copy so Google and readers can tell this is the official GGLBET content hub, not a generic casino directory. At the same time, anti-stuffing rules apply: one natural brand mention per short block is enough. Headings should describe the player job — sourcing, corrections, disclosures — rather than packing keywords. Internal links should send readers to FAQ, Payment, Download, Responsible Gaming, About, Contact, Team, and Register or Login when those next steps are the honest continuation of the article.",
        "寫手受指示在英雄區、摘要與旅程文案中自然提及 GGLBET，讓 Google 與讀者辨識這是官方 GGLBET 內容中心，而非泛用娛樂城名錄。同時適用防堆砌規則：每個短區塊自然出現一次品牌即可。標題應描述玩家任務——取材、更正、揭露——而非堆砌關鍵字。內部連結應在那些步驟是文章誠實延續時，導向 FAQ、支付、下載、負責任博彩、關於、聯絡、團隊，以及註冊或登入。",
      ),
    },
    {
      type: "heading",
      id: "disclosures",
      text: L("Independence and disclosures", "獨立與揭露"),
      anchor: "disclosures",
    },
    {
      type: "paragraph",
      id: "disclosures-1",
      text: L(
        "Commercial arrangements can exist around GGLBET coverage, promotions framing, or partner mentions. A partnership may influence whether a topic is covered; it must never dictate the factual conclusion about how a flow works, what a term means, or whether a safer-play tool is available. Where a page describes a product relationship that a reasonable reader would want to know about, that relationship is disclosed on the page itself — near the claim — rather than only in a distant legal footer. Disclosures are written in plain language so Malaysia players scanning on mobile can understand them without legal training.",
        "圍繞 GGLBET 報導、優惠表述或合作夥伴提及，可能存在商業安排。合作關係可影響是否涵蓋某主題；但絕不可決定流程如何運作、條款含義，或較安全遊玩工具是否可用的事實結論。當頁面描述合理讀者會想知道的產品關係時，該關係會在頁面本身——靠近主張處——揭露，而非只放在遙遠的法律頁尾。揭露以白話撰寫，讓用手機掃讀的馬來西亞玩家無需法律訓練也能理解。",
      ),
    },
    {
      type: "callout",
      id: "disclosure-callout",
      variant: "info",
      title: L("What GGLBET will not do", "GGLBET 不會做的事"),
      body: L(
        "GGLBET will not invent licences, RTP percentages, wagering multiples, or bonus amounts absent from gglbet5.com or other published official facts. We will not present gambling as income. We will not hide a material commercial relationship that shapes coverage of a product journey.",
        "GGLBET 不會捏造 gglbet5.com 或其他已公開官方事實中沒有的牌照、RTP 百分比、流水倍數或優惠金額。不會把博彩呈現為收入。不會隱瞞足以影響產品旅程報導的重大商業關係。",
      ),
    },
    {
      type: "heading",
      id: "review",
      text: L("Review and publication workflow", "覆核與發布流程"),
      anchor: "review",
    },
    {
      type: "steps",
      id: "review-steps",
      title: L("How a GGLBET Support page ships", "GGLBET Support 頁如何上線"),
      steps: [
        {
          title: L("Brief with one player question", "以一個玩家問題定稿"),
          text: L(
            "Every commission states the Malaysia-facing question the page must answer and which Support destination it owns.",
            "每份委託都寫明頁面必須回答的面向馬來西亞問題，以及它負責的 Support 目的地。",
          ),
        },
        {
          title: L("Draft with sources attached", "草稿附上來源"),
          text: L(
            "Writers record where each factual claim came from so the Trust Desk can re-check without repeating research.",
            "寫手記錄每項事實主張的來源，讓信任小組無需重做研究即可再查。",
          ),
        },
        {
          title: L("Trust Desk review", "信任小組覆核"),
          text: L(
            "A reviewer independent of the writer checks money claims, eligibility, disclosures, and responsible-gaming tone.",
            "與寫手獨立的覆核者檢查資金主張、資格、揭露與負責任博彩語氣。",
          ),
        },
        {
          title: L("Publish with attribution", "具名發布"),
          text: L(
            "The page ships with named author, reviewer where required, and a visible last-updated date.",
            "頁面帶有具名作者、必要時的覆核者，以及可見的最後更新日期。",
          ),
        },
        {
          title: L("Schedule the next check", "排定下次檢查"),
          text: L(
            "Payment and policy pages re-enter a tighter review calendar than evergreen catalog explainers.",
            "支付與政策頁比常青目錄說明進入更緊的覆核行事曆。",
          ),
        },
      ],
    },
    {
      type: "heading",
      id: "corrections",
      text: L("Corrections on GGLBET", "GGLBET 的更正"),
      anchor: "corrections",
    },
    {
      type: "paragraph",
      id: "corrections-1",
      text: L(
        "Errors are fixed as soon as they are verified against gglbet5.com or the live product. Cosmetic typos can be cleaned quietly. Material corrections — anything that changes monetary guidance, eligibility, download safety, or responsible-gaming framing — are noted on the page and the last-updated date moves so readers can see the content changed. GGLBET does not silently rewrite a substantive claim and leave the old date in place to look fresh. Reader reports via the Contact page that include a URL and the exact sentence in question are prioritised over vague complaints.",
        "錯誤一經驗證對齊 gglbet5.com 或即時產品即會修正。文字修飾可安靜清理。重大更正——任何改變金錢指引、資格、下載安全或負責任博彩表述者——會在頁面註記，並移動最後更新日期，讓讀者看見內容已變。GGLBET 不會默默改寫實質主張卻留下舊日期假裝新鮮。經聯絡頁回報、附上網址與精確句子的讀者回報，優先於含糊抱怨。",
      ),
    },
    {
      type: "comparison",
      id: "correction-table",
      caption: L("How GGLBET treats different error types", "GGLBET 如何處理不同錯誤類型"),
      headers: [
        L("Error type", "錯誤類型"),
        L("Response", "處理方式"),
        L("Date behaviour", "日期行為"),
      ],
      rows: [
        [
          L("Cosmetic typo", "文字修飾錯誤"),
          L("Quiet fix", "安靜修正"),
          L("Date may stay", "日期可維持"),
        ],
        [
          L("Unclear wording", "不清用語"),
          L("Rewrite for clarity", "改寫求清晰"),
          L("Date updates if meaning shifts", "若意義改變則更新日期"),
        ],
        [
          L("Wrong money or eligibility claim", "錯誤的資金或資格主張"),
          L("Priority Trust Desk fix + note", "信任小組優先修正並註記"),
          L("Last-updated always moves", "最後更新日期一定移動"),
        ],
        [
          L("Safer-play framing issue", "較安全遊玩表述問題"),
          L("Immediate tone and link fix", "立即修正語氣與連結"),
          L("Last-updated always moves", "最後更新日期一定移動"),
        ],
      ],
    },
    {
      type: "heading",
      id: "ai-use",
      text: L("Use of AI assistance", "AI 輔助的使用"),
      anchor: "ai-use",
    },
    {
      type: "paragraph",
      id: "ai-body",
      text: L(
        "Automated tools may assist with research summarisation, structure, and language checks on GGLBET drafts. They do not publish. Every claim in an assisted draft is verified by a person against a primary source, and a named human owner remains accountable for the finished page. AI assistance never authorises inventing licences, RTP, or bonus figures. If a tool suggests a confident number without a source, the writer deletes it.",
        "自動化工具可協助 GGLBET 草稿的研究摘要、結構與語言檢查。它們不會發布。輔助草稿中的每一項主張都由人對照主要來源驗證，且具名人類負責人仍對完成頁負責。AI 輔助從不授權捏造牌照、RTP 或優惠數字。若工具在無來源下提出自信數字，寫手會刪除它。",
      ),
    },
    {
      type: "heading",
      id: "how-to-use",
      text: L("How to use this policy with other GGLBET pages", "如何把本政策與其他 GGLBET 頁一起使用"),
      anchor: "how-to-use",
    },
    {
      type: "paragraph",
      id: "how-to-use-1",
      text: L(
        "Read this editorial policy when you want the rules. Read About Our Team when you want the desks that apply them. Read FAQ, Payment, Download, and Responsible Gaming when you need task-level journeys. Read Contact when you need to challenge a sentence. Read About GGLBET when you want the brand orientation story. Together those destinations form the Support topic cluster: one hub, many jobs, one sourcing standard. Register and Login remain the gates to the live product; gglbet5.com remains the operational source of truth for what your account can do right now.",
        "想了解規則時讀本編輯政策。想了解執行規則的小組時讀關於我們的團隊。需要任務級旅程時讀 FAQ、支付、下載與負責任博彩。需要質疑某句話時讀聯絡頁。想了解品牌定位故事時讀 About GGLBET。這些目的地共同組成 Support 主題叢集：一個中心、多種任務、同一取材標準。註冊與登入仍是即時產品的入口；gglbet5.com 仍是你帳號此刻能做什麼的營運事實來源。",
      ),
    },
    {
      type: "callout",
      id: "final-note",
      variant: "tip",
      title: L("Player takeaway", "玩家重點"),
      body: L(
        "If a GGLBET page cannot show where a money or eligibility claim came from, treat it as incomplete and confirm the live product. If you find a material error, send the URL and sentence through Contact so the Trust Desk can correct and re-date it.",
        "若 GGLBET 頁面無法說明資金或資格主張從何而來，請視為不完整並確認即時產品。若發現重大錯誤，請經聯絡頁送出網址與句子，讓信任小組更正並更新日期。",
      ),
    },
  ] as unknown as TrustPageBlock[],
  visualSections: [
    {
      id: "sourcing-visual",
      eyebrow: L("GGLBET sourcing", "GGLBET 取材"),
      heading: L("Trace every claim before it publishes", "發布前追溯每一項主張"),
      subheading: L(
        "Primary sources beat confident guesswork on the GGLBET Support hub.",
        "在 GGLBET Support 中心，主要來源勝過自信臆測。",
      ),
      body: L(
        "Writers attach live product checks, gglbet5.com references, or named docs so the Trust Desk can re-verify money and eligibility language without starting from zero.",
        "寫手附上即時產品檢查、gglbet5.com 參考或具名文件，讓信任小組無需從零開始即可再驗證資金與資格用語。",
      ),
      mediaSrc: HUB_MEDIA.editorialFlow,
      mediaAlt: L(
        "GGLBET editorial sourcing artwork",
        "GGLBET 編輯取材視覺",
      ),
      points: [
        {
          title: L("Live product first", "即時產品優先"),
          body: L(
            "Cashier and lobby behaviour after login outranks second-hand summaries.",
            "登入後的出納與大廳行為優先於二手摘要。",
          ),
        },
        {
          title: L("No invented figures", "不捏造數字"),
          body: L(
            "Licences, RTP, and bonus multiples appear only when officially published.",
            "僅在官方已公開時才出現牌照、RTP 與優惠倍數。",
          ),
        },
      ],
      ctas: [
        { label: L("GGLBET FAQ", "GGLBET 常見問題") as unknown as string, href: ROUTES.faq, variant: "primary" },
        { label: L("GGLBET Payment methods", "GGLBET 支付方式") as unknown as string, href: ROUTES.payment, variant: "outline" },
      ],
    },
    {
      id: "disclosure-visual",
      eyebrow: L("Disclosures", "揭露"),
      heading: L("Say the commercial context on the page", "在頁面說出商業脈絡"),
      subheading: L(
        "GGLBET discloses relationships near the claims they could influence.",
        "GGLBET 在可能受影響的主張附近揭露關係。",
      ),
      body: L(
        "Partnerships may shape coverage priorities. They never rewrite factual conclusions about how deposits, withdrawals, downloads, or limits work for Malaysia-facing players.",
        "合作關係可影響報導優先順序。它們從不改寫面向馬來西亞玩家的存提款、下載或限額如何運作的事實結論。",
      ),
      mediaSrc: HUB_MEDIA.editorialStandards,
      mediaAlt: L(
        "GGLBET disclosure and transparency artwork",
        "GGLBET 揭露與透明視覺",
      ),
      flip: true,
      points: [
        {
          title: L("Plain-language notes", "白話註記"),
          body: L(
            "Mobile readers should understand disclosures without a legal dictionary.",
            "手機讀者無需法律詞典也能理解揭露。",
          ),
        },
        {
          title: L("Near the claim", "靠近主張"),
          body: L(
            "Context sits beside the journey copy, not only in a distant footer.",
            "脈絡放在旅程文案旁，而非只在遙遠頁尾。",
          ),
        },
      ],
      ctas: [
        { label: L("About GGLBET", "關於 GGLBET") as unknown as string, href: ROUTES.about, variant: "primary" },
        { label: L("About our team", "關於我們的團隊") as unknown as string, href: ROUTES.team, variant: "outline" },
      ],
    },
    {
      id: "corrections-visual",
      eyebrow: L("Corrections", "更正"),
      heading: L("Fix material errors where players can see them", "在玩家看得見的地方修正重大錯誤"),
      subheading: L(
        "GGLBET re-dates pages when money or safer-play guidance changes.",
        "當資金或較安全遊玩指引變更時，GGLBET 會更新頁面日期。",
      ),
      body: L(
        "Send a URL and the exact sentence through Contact. The Trust Desk reproduces the issue against gglbet5.com, corrects the hub page, and moves the last-updated date when the meaning changed.",
        "經聯絡頁送出網址與精確句子。信任小組對照 gglbet5.com 重現問題、修正中心頁，並在意義改變時移動最後更新日期。",
      ),
      mediaSrc: HUB_MEDIA.editorialAbout,
      mediaAlt: L(
        "GGLBET corrections and trust artwork",
        "GGLBET 更正與信任視覺",
      ),
      points: [
        {
          title: L("Priority queue", "優先佇列"),
          body: L(
            "Payment, eligibility, and RG framing errors jump ahead of typos.",
            "支付、資格與負責任博彩表述錯誤優先於錯字。",
          ),
        },
        {
          title: L("Visible freshness", "可見新鮮度"),
          body: L(
            "Dates move for substance, never as a cosmetic refresh trick.",
            "日期因實質內容移動，從不作為表面刷新伎倆。",
          ),
        },
      ],
      ctas: [
        { label: L("Contact GGLBET", "聯絡 GGLBET") as unknown as string, href: ROUTES.contact, variant: "primary" },
        { label: L("Responsible gaming", "負責任博彩") as unknown as string, href: ROUTES.responsibleGaming, variant: "outline" },
      ],
    },
    {
      id: "malaysia-visual",
      eyebrow: L("Malaysia clarity", "馬來西亞清晰度"),
      heading: L("Write the journeys players actually take", "寫玩家真正會走的旅程"),
      subheading: L(
        "Bilingual GGLBET Support copy without compliance fiction.",
        "雙語 GGLBET Support 文案，沒有合規虛構。",
      ),
      body: L(
        "Register, deposit, download, limits, and contact paths are explained in English and Traditional Chinese with examples Malaysia players recognise — while live availability always follows the signed-in gglbet5.com session.",
        "以英文與繁體中文說明註冊、入金、下載、限額與聯絡路徑，並使用馬來西亞玩家熟悉的例子——即時可用性仍一律以登入後的 gglbet5.com 工作階段為準。",
      ),
      mediaSrc: HUB_MEDIA.editorialMalaysia,
      mediaAlt: L(
        "GGLBET Malaysia-facing support artwork",
        "GGLBET 面向馬來西亞支援視覺",
      ),
      flip: true,
      points: [
        {
          title: L("Practical rails language", "實用通道用語"),
          body: L(
            "Examples stay labelled as examples, not guaranteed account lists.",
            "範例標示為範例，而非保證的帳號清單。",
          ),
        },
        {
          title: L("Cluster links", "叢集連結"),
          body: L(
            "Every policy page points back into FAQ, Payment, Download, and Contact.",
            "每張政策頁都連回 FAQ、支付、下載與聯絡。",
          ),
        },
      ],
      ctas: [
        { label: L("GGLBET Support", "GGLBET 支援中心") as unknown as string, href: ROUTES.support, variant: "primary" },
        { label: L("Register on GGLBET", "註冊 GGLBET") as unknown as string, href: ROUTES.register, variant: "outline" },
      ],
    },
  ],
  faqHeading: L("GGLBET editorial policy FAQ", "GGLBET 編輯政策常見問題"),
  faqSubheading: L(
    "Sourcing, disclosures, corrections, and Malaysia-facing clarity",
    "取材、揭露、更正與面向馬來西亞的清晰度",
  ),
  faqBody: L(
    "Short answers to how GGLBET decides what can publish on the Support hub and what happens when something is wrong.",
    "簡短回答 GGLBET 如何決定 Support 中心可發布什麼，以及出錯時如何處理。",
  ),
  faq: [
    {
      question: L(
        "Who is accountable for a GGLBET Support page?",
        "誰對 GGLBET Support 頁負責？",
      ),
      answer: L(
        "The named author shown on the page owns the draft. For payments, eligibility, policy, and responsible-gaming framing, a named GGLBET Trust Desk reviewer also signs off. Both desks have public profiles. Accountability means someone can be challenged when a claim looks wrong, and the last-updated date moves when a material fix ships.",
        "頁面上具名作者擁有草稿。涉及支付、資格、政策與負責任博彩表述時，具名的 GGLBET 信任小組覆核者也會簽署。兩個小組皆有公開簡介。責任意指主張有誤時可被質疑，且重大修正上線時會移動最後更新日期。",
      ),
    },
    {
      question: L(
        "What sources does GGLBET accept?",
        "GGLBET 接受哪些來源？",
      ),
      answer: L(
        "Acceptable sources are the live gglbet5.com product after login, published official GGLBET materials, provider docs for mechanics studios actually publish, and processor or bank guidance when explaining general rails. Unattributed aggregator copy and anonymous forum claims are rejected for money or licence language.",
        "可接受來源為登入後的即時 gglbet5.com 產品、已公開的官方 GGLBET 資料、工作室實際公開的機制文件，以及說明一般通道時的處理商或銀行指引。無來源彙整文案與匿名論壇主張，不可用於資金或牌照用語。",
      ),
    },
    {
      question: L(
        "Does GGLBET invent licences or RTP?",
        "GGLBET 會捏造牌照或 RTP 嗎？",
      ),
      answer: L(
        "No. Editorial rules forbid inventing licences, RTP percentages, wagering multiples, or bonus amounts that are not published on gglbet5.com or other official product facts. When evidence is missing, GGLBET removes the number rather than guessing.",
        "不會。編輯規則禁止捏造非 gglbet5.com 或其他官方產品事實已公開的牌照、RTP 百分比、流水倍數或優惠金額。證據不足時，GGLBET 會刪除數字而非臆測。",
      ),
    },
    {
      question: L(
        "How does Malaysia-facing clarity work?",
        "面向馬來西亞的清晰度如何運作？",
      ),
      answer: L(
        "GGLBET organises Support copy around Malaysia player journeys — register, deposit, download, limits, contact — and provides English plus Traditional Chinese where dual-language reading is expected. Clarity never includes inventing a local licence or regulator endorsement that is not published.",
        "GGLBET 依馬來西亞玩家旅程組織 Support 文案——註冊、入金、下載、限額、聯絡——並在預期雙語閱讀處提供英文與繁體中文。清晰度從不包含捏造未公開的本地牌照或監管背書。",
      ),
    },
    {
      question: L(
        "Can commercial partners change GGLBET conclusions?",
        "商業夥伴能改變 GGLBET 的結論嗎？",
      ),
      answer: L(
        "Partners may request coverage of a topic. They cannot approve, veto, or rewrite factual conclusions about how a flow works. Relevant commercial context is disclosed on the page near the claim.",
        "夥伴可請求涵蓋某主題。他們不能核准、否決或改寫流程如何運作的事實結論。相關商業脈絡會在頁面靠近主張處揭露。",
      ),
    },
    {
      question: L(
        "What happens when GGLBET publishes something wrong?",
        "GGLBET 發布錯誤內容時會怎樣？",
      ),
      answer: L(
        "Verified errors are fixed. Material corrections that affect money, eligibility, download safety, or safer-play framing are noted and the last-updated date changes. Cosmetic typos may be fixed without a date move.",
        "經驗證的錯誤會修正。影響資金、資格、下載安全或較安全遊玩表述的重大更正會註記，並變更最後更新日期。文字修飾錯誤可能不移動日期即修正。",
      ),
    },
    {
      question: L(
        "How do I report an editorial error?",
        "如何回報編輯錯誤？",
      ),
      answer: L(
        "Use the GGLBET Contact page with the exact URL and the sentence you believe is wrong. Add a transaction reference or screenshot if money is involved. Do not send passwords or one-time codes. The Trust Desk re-checks against gglbet5.com.",
        "使用 GGLBET 聯絡頁，附上正確網址與你認為有誤的句子。若涉及金錢，請加交易編號或截圖。請勿傳送密碼或一次性驗證碼。信任小組會對照 gglbet5.com 重查。",
      ),
    },
    {
      question: L(
        "Is AI used to write GGLBET content?",
        "GGLBET 內容是否使用 AI 撰寫？",
      ),
      answer: L(
        "Tools may assist with structure and language checks, but every claim is verified by a person against a primary source. A named human owner remains accountable. AI never authorises invented figures.",
        "工具可協助結構與語言檢查，但每一項主張都由人對照主要來源驗證。具名人類負責人仍須負責。AI 從不授權捏造數字。",
      ),
    },
    {
      question: L(
        "How often are Support pages re-checked?",
        "Support 頁多久覆核一次？",
      ),
      answer: L(
        "Payment, bonus-framing, and policy pages are reviewed on a tighter cadence than evergreen catalog explainers. Product changes on gglbet5.com and verified reader reports can force an immediate review outside the calendar.",
        "支付、優惠表述與政策頁的覆核節奏比常青目錄說明更緊。gglbet5.com 的產品變更與經驗證的讀者回報，可迫使行事曆外立即覆核。",
      ),
    },
    {
      question: L(
        "What is the difference between hub pages and the live GGLBET product?",
        "中心頁與即時 GGLBET 產品有何差別？",
      ),
      answer: L(
        "Hub pages document journeys for discovery and SEO clarity. The signed-in gglbet5.com session is the operational source of truth for cashier, lobby, and offer details. If they disagree, follow gglbet5.com.",
        "中心頁記錄旅程以利探索與 SEO 清晰度。登入後的 gglbet5.com 工作階段是出納、大廳與優惠細節的營運事實來源。若不一致，請遵循 gglbet5.com。",
      ),
    },
    {
      question: L(
        "Where should I go after reading this policy?",
        "讀完本政策後該去哪裡？",
      ),
      answer: L(
        "Open About Our Team for desk roles, FAQ or Payment for task help, Responsible Gaming before funding play, and Contact to challenge a claim. Support Hub maps all destinations in one place.",
        "打開關於我們的團隊了解小組角色，FAQ 或支付取得任務協助，入金前先看負責任博彩，並用聯絡頁質疑主張。Support 中心一頁對應所有目的地。",
      ),
    },
    {
      question: L(
        "Do GGLBET pages keyword-stuff the brand?",
        "GGLBET 頁面會堆砌品牌關鍵字嗎？",
      ),
      answer: L(
        "No. Heroes and section labels name GGLBET naturally so the hub is identifiable, but anti-stuffing rules limit repetition. Useful branded phrasing beats repeating GGLBET in every clause.",
        "不會。英雄區與區塊標籤自然提及 GGLBET 以便識別中心，但防堆砌規則限制重複。有用的品牌用語勝過在每句重複 GGLBET。",
      ),
    },
    {
      question: L(
        "Who reviews responsible-gaming language?",
        "誰覆核負責任博彩用語？",
      ),
      answer: L(
        "The GGLBET Trust Desk reviews safer-play framing on every Support page that discusses limits, deposits, or wellbeing. Urgency pressure and income framing are hard blockers that stop publication.",
        "凡討論限額、入金或福祉的 Support 頁，較安全遊玩表述皆由 GGLBET 信任小組覆核。緊迫施壓與收入表述是阻止發布的硬性門檻。",
      ),
    },
  ],
  finalCta: {
    eyebrow: L("Next on GGLBET", "下一步上 GGLBET"),
    heading: L("Apply the policy on a real journey", "把政策用在真實旅程上"),
    subheading: L(
      "Move from standards to Support destinations Malaysia players use daily.",
      "從標準走向馬來西亞玩家每日使用的 Support 目的地。",
    ),
    body: L(
      "Open the GGLBET Support hub for the full map, or jump straight to FAQ, Payment, Responsible Gaming, or Contact when you already know the job.",
      "打開 GGLBET Support 中心查看完整地圖，或在已知任務時直接前往 FAQ、支付、負責任博彩或聯絡。",
    ),
    mediaSrc: HUB_MEDIA.editorialCta,
    mediaAlt: L("GGLBET next steps artwork", "GGLBET 下一步視覺"),
    ctas: [
      { label: L("GGLBET Support", "GGLBET 支援中心") as unknown as string, href: ROUTES.support, variant: "primary" },
      { label: L("About our team", "關於我們的團隊") as unknown as string, href: ROUTES.team, variant: "outline" },
      { label: L("Contact GGLBET", "聯絡 GGLBET") as unknown as string, href: ROUTES.contact, variant: "soft" },
    ],
  },
});
