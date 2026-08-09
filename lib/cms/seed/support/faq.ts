import { L } from "@/lib/i18n";
import type { TrustPageBlock } from "@/types/eeat";
import { HUB_MEDIA, ROUTES, createTrustPage } from "./factory";

export const faqTrustPage = createTrustPage({
  slug: "faq",
  title: L("GGLBET FAQ", "GGLBET 常見問題"),
  metaTitle: L(
    "GGLBET FAQ | Accounts, Payments, Download and Safer Play",
    "GGLBET FAQ｜帳號、支付、下載與較安全遊玩",
  ),
  metaDescription: L(
    "GGLBET FAQ for Malaysia players: registration, verification, deposits, withdrawals, download, responsible gaming, and contact journeys—confirm live details after login.",
    "面向馬來西亞玩家的 GGLBET FAQ：註冊、驗證、存提款、下載、負責任博彩與聯絡旅程——登入後請確認即時細節。",
  ),
  heroEyebrow: L("GGLBET FAQ hub", "GGLBET FAQ 中心"),
  heroTitle: L(
    "GGLBET frequently asked questions",
    "GGLBET 常見問題",
  ),
  heroDescription: L(
    "Short, branded GGLBET answers for Malaysia players covering accounts, payments, download, responsible gaming, and how to contact support without sharing passwords.",
    "面向馬來西亞玩家的精簡 GGLBET 品牌解答，涵蓋帳號、支付、下載、負責任博彩，以及如何在不分享密碼的情況下聯絡客服。",
  ),
  heroImageSrc: HUB_MEDIA.faq,
  lastUpdated: "2026-08-08",
  authorSlug: "gglbet-editorial",
  reviewerSlug: "gglbet-trust-desk",
  schemaType: "FAQPage",
  summaryCards: [
    {
      title: L("Accounts", "帳號"),
      description: L(
        "Register once, verify early, set limits before funding, and keep login on official GGLBET domains only.",
        "只註冊一次、儘早驗證、入金前設定上限，並只在官方 GGLBET 網域登入。",
      ),
    },
    {
      title: L("Payments", "支付"),
      description: L(
        "Malaysia-friendly rails are documented as examples; your signed-in cashier is the authoritative method list.",
        "馬來西亞友善通道以範例說明；登入後的出納才是權威方法清單。",
      ),
    },
    {
      title: L("Download", "下載"),
      description: L(
        "Install only from official GGLBET download notes—never from forum or chat APK mirrors.",
        "只依官方 GGLBET 下載備註安裝——切勿使用論壇或聊天室 APK 鏡像。",
      ),
    },
    {
      title: L("Responsible gaming", "負責任博彩"),
      description: L(
        "Deposit limits, cool-off, and self-exclusion exist so entertainment stays optional.",
        "存款上限、冷靜期與自我排除，讓娛樂維持出於自願。",
      ),
    },
    {
      title: L("Contact journeys", "聯絡旅程"),
      description: L(
        "Tickets move faster with registered email, timestamps, and cashier references—never passwords.",
        "附上註冊電郵、時間戳與出納編號會更快——絕不要附密碼。",
      ),
    },
    {
      title: L("Live session truth", "即時工作階段事實"),
      description: L(
        "FAQ explains concepts; signed-in GGLBET balances, rails, and offers confirm what applies to you now.",
        "FAQ 解釋概念；登入後的 GGLBET 餘額、通道與優惠確認此刻適用於你的內容。",
      ),
    },
  ],
  blocks: [
    {
      type: "tldr",
      id: "tldr",
      text: L(
        "GGLBET FAQ answers the questions Malaysia players ask most about registration, verification, deposits, withdrawals, downloads, responsible gaming, and contact. Treat answers as branded documentation: confirm method lists, limits, and offer terms inside your signed-in session, and never invent licences or RTP figures from a FAQ paragraph.",
        "GGLBET FAQ 回答馬來西亞玩家最常問的註冊、驗證、存提款、下載、負責任博彩與聯絡問題。請把答案當作品牌文件：在登入工作階段確認方法清單、限額與優惠條款，切勿從 FAQ 段落捏造牌照或 RTP。",
      ),
    },
    {
      type: "definition",
      id: "definition",
      term: L("GGLBET FAQ", "GGLBET FAQ"),
      text: L(
        "A Support Content Hub page that groups high-intent account, money, mobile, safer-play, and contact questions so you can move from doubt to the correct GGLBET route without generic casino filler.",
        "Support 內容中心頁，彙整高意圖的帳號、資金、行動、較安全遊玩與聯絡問題，讓你從疑惑走到正確的 GGLBET 路由，而非泛用娛樂城填料。",
      ),
    },
    {
      type: "heading",
      id: "accounts",
      text: L("Accounts and verification on GGLBET", "GGLBET 帳號與驗證"),
      anchor: "accounts",
    },
    {
      type: "paragraph",
      id: "accounts-1",
      text: L(
        "Creating a GGLBET account should start from official navigation or product links—not mirrored forms shared in chats. Provide reachable contact details, confirm legal age, and accept on-screen terms. One account per person protects verification and payouts; duplicates slow reviews. After registration, set deposit or session limits before you fund play, then complete identity checks early so your first withdrawal is not the moment you discover missing documents. If a field fails validation, correct it in place instead of opening a second profile.",
        "建立 GGLBET 帳號應從官方導覽或產品連結開始——而非聊天室分享的仿冒表單。提供可用聯絡方式、確認合法年齡，並接受畫面上的條款。每人一組帳號可保護驗證與出款；重複檔案會拖慢審核。註冊後請先設定存款或場次上限再入金，並儘早完成身分核對，避免第一次出款才發現缺件。若欄位驗證失敗，請就地修正，不要另開第二組檔案。",
      ),
    },
    {
      type: "paragraph",
      id: "accounts-2",
      text: L(
        "Verification confirms age and payment ownership before funds leave the account. Clear, uncropped, unexpired images move faster. GGLBET support can explain outstanding documents through official channels, but will never ask you to read back a password or SMS code. Keep login on bookmarked domains after any phishing scare, and review recent device sessions if something felt wrong.",
        "驗證在資金離帳前確認年齡與支付歸屬。清晰、未裁切、未過期的影像更快。GGLBET 客服可經官方管道說明尚缺文件，但絕不會要求你回讀密碼或簡訊碼。任何釣魚驚嚇後請只在書籤網域登入，若感覺異常請檢查近期裝置工作階段。",
      ),
    },
    {
      type: "paragraph",
      id: "accounts-3",
      text: L(
        "Account recovery on GGLBET should stay inside official reset flows. If email or phone fields are outdated, update them only after you regain access through documented channels—not through a stranger offering a “manual unlock.” Duplicate accounts created to bypass limits or unfinished verification usually create longer delays, not shortcuts. When support asks for identity confirmation, they will use product-safe prompts, never a request to forward one-time codes. Treat any urgency that demands secrecy as a reason to pause and reopen this FAQ or the contact page from a bookmark.",
        "GGLBET 帳號復原應留在官方重設流程。若電郵或電話欄位過時，只能在經文件化管道恢復存取後更新——而非透過聲稱「人工解鎖」的陌生人。為規避上限或未完成驗證而開的重複帳號，通常造成更長延誤而非捷徑。當客服要求身分確認時，會使用產品安全提示，絕不會要求轉傳一次性驗證碼。任何要求保密的緊迫感，都是暫停並從書籤重開本 FAQ 或聯絡頁的理由。",
      ),
    },
    {
      type: "steps",
      id: "get-started",
      title: L("Getting started in four GGLBET steps", "四步開始使用 GGLBET"),
      steps: [
        {
          title: L("Register on official links", "經官方連結註冊"),
          text: L(
            "Use GGLBET or official product registration—never chat mirrors.",
            "使用 GGLBET 或官方產品註冊——切勿用聊天鏡像。",
          ),
        },
        {
          title: L("Verify identity early", "儘早驗證身分"),
          text: L(
            "Upload readable ID and address proof before your first withdrawal request.",
            "首次出款申請前上傳可讀證件與地址證明。",
          ),
        },
        {
          title: L("Set safer-play limits", "設定較安全遊玩上限"),
          text: L(
            "Deposit and session controls work best before emotion decides a stake size.",
            "存款與場次控制在情緒決定注碼前最有效。",
          ),
        },
        {
          title: L("Confirm the live cashier", "確認即時出納"),
          text: L(
            "Choose a method you control, read minimums, then deposit only what you can afford to lose.",
            "選擇你能控制的方法、閱讀最低額，只存入虧得起的金額。",
          ),
        },
      ],
    },
    {
      type: "heading",
      id: "payments",
      text: L("Deposits, withdrawals, and Malaysia-friendly rails", "存提款與馬來西亞友善通道"),
      anchor: "payments",
    },
    {
      type: "paragraph",
      id: "payments-1",
      text: L(
        "GGLBET payment documentation describes Malaysia-friendly patterns such as FPX-style bank transfer, Touch 'n Go eWallet, DuitNow, and card pathways alongside other method types that may appear for your profile. Availability is not identical for every account or moment, so the signed-in cashier is authoritative. Prefer a method you can also use for withdrawals where compliance expects funds to return to the original source. Check minimums, maximums, and any promotion qualifying deposit before you confirm. Third-party banks or wallets may add fees or delays outside GGLBET control.",
        "GGLBET 支付文件說明馬來西亞友善模式，例如 FPX 風格銀行轉帳、Touch 'n Go 電子錢包、DuitNow 與卡片路徑，以及你檔案可能出現的其他方式。可用性並非每位使用者、每個時間點都相同，因此以登入後出納為準。在合規期望資金退回原始來源時，儘量選擇也能用於出款的方法。確認前檢查最低／最高限額與任何優惠的合格存款。第三方銀行或錢包可能另收費或延誤，非 GGLBET 所能控制。",
      ),
    },
    {
      type: "paragraph",
      id: "payments-2",
      text: L(
        "Pending deposits usually mean the sending bank or wallet has not finished confirming, or the cashier is waiting on a verification flag. Pending withdrawals usually mean review is open—identity, payment ownership, or unfinished wagering tied to the balance. Do not assume a FAQ timing table is a stopwatch. Keep both the GGLBET reference and your bank or wallet reference when you escalate to contact. Never pay a stranger who claims they can unlock a GGLBET payout for a fee; that pattern is fraud, not support.",
        "待處理存款通常表示付款銀行或錢包尚未完成確認，或出納在等驗證標記。待處理出款通常表示審核仍開著——身分、支付歸屬，或與餘額相關的未完成流水。勿把 FAQ 時程表當成秒表。升級到聯絡時請同時保留 GGLBET 編號與銀行或錢包編號。切勿向聲稱付費即可解鎖 GGLBET 出款的陌生人付款；那是詐騙，不是客服。",
      ),
    },
    {
      type: "paragraph",
      id: "payments-3",
      text: L(
        "Bonus-linked balances need extra patience. If you opted into a GGLBET promotion, read live wagering terms before you request a withdrawal: eligible games, maximum bet while wagering, expiry, and any conversion cap all live on the offer screen—not as invented multiples on this FAQ. Completing wagering first prevents the most avoidable payout pauses. If terms and the cashier disagree, follow the signed-in session and tell support which screen you see.",
        "與優惠連結的餘額需要更多耐心。若你加入了 GGLBET 優惠，申請出款前請先讀即時流水條款：合格遊戲、流水期間最高投注、期限與任何兌換上限都在優惠畫面——而非本 FAQ 捏造的倍數。先完成流水可避免最可預防的出款暫停。若條款與出納不符，請遵循登入工作階段，並告訴客服你看到的畫面。",
      ),
    },
    {
      type: "comparison",
      id: "timings",
      caption: L(
        "Typical processing windows by method type (guidance only)",
        "依方法類型的典型處理時窗（僅供指引）",
      ),
      headers: [
        L("Method type", "方法類型"),
        L("Deposit", "存款"),
        L("Withdrawal after approval", "核准後出款"),
      ],
      rows: [
        [
          L("E-wallet style", "電子錢包類"),
          L("Often near-instant", "通常近即時"),
          L("Often same day", "常為當日"),
        ],
        [
          L("Bank transfer", "銀行轉帳"),
          L("Minutes to hours", "數分鐘至數小時"),
          L("Additional business days possible", "可能再需數個工作天"),
        ],
        [
          L("Card", "卡片"),
          L("Often near-instant", "通常近即時"),
          L("Issuer windows vary", "發卡行時窗不一"),
        ],
      ],
    },
    {
      type: "callout",
      id: "withdrawal-tip",
      variant: "tip",
      title: L("Withdraw toward the source you deposited with", "盡量提回存款來源"),
      body: L(
        "Matching deposit and withdrawal methods where possible avoids a common review delay. Always finish bonus wagering tied to the balance before assuming a payout will clear.",
        "在可能情況下讓存提款方法一致，可避免常見審核延誤。假設出款會通過前，請先完成與餘額相關的優惠流水。",
      ),
    },
    {
      type: "heading",
      id: "download",
      text: L("Download and mobile access", "下載與行動存取"),
      anchor: "download",
    },
    {
      type: "paragraph",
      id: "download-1",
      text: L(
        "GGLBET runs in modern mobile browsers, and the download page explains official Android and iOS access notes. Install only from official GGLBET download guidance—never from forum mirrors, telegram files, or “faster APK” strangers. After install, sign in with the same account so limits and verification status carry over. Keep the app updated for security fixes. If login fails on mobile, confirm you are on an official domain before resetting credentials. Unofficial builds are a leading phishing and malware path for players who only wanted a shortcut.",
        "GGLBET 可在現代行動瀏覽器運作，下載頁說明官方 Android 與 iOS 存取備註。只依官方 GGLBET 下載指引安裝——切勿用論壇鏡像、Telegram 檔案或「更快 APK」陌生人。安裝後以同一帳號登入，上限與驗證狀態才會延續。請保持應用更新。若手機登入失敗，重設憑證前先確認官方網域。非官方建置是只想抄近路的玩家最常見的釣魚與惡意軟體路徑。",
      ),
    },
    {
      type: "paragraph",
      id: "download-2",
      text: L(
        "Mobile troubleshooting on GGLBET should stay boring and official. Clear stuck browser sessions, retry on a stable network, and compare behaviour between mobile web and the official app build when both are available. If an installer demands unrelated payments outside the product cashier, stop immediately. Permission prompts should match what the download page prepares you to expect; surprise requests for contacts, SMS harvesting, or accessibility takeover are red flags. When in doubt, return to the download page from a bookmark and contact support with device model and exact error text.",
        "GGLBET 的行動排查應保持無聊且官方。清除卡住的瀏覽器工作階段、在穩定網路上重試，並在行動網頁與官方應用建置都可用時比較行為。若安裝程式要求產品出納以外的無關付款，請立刻停止。權限提示應符合下載頁讓你預期的內容；突然索取通訊錄、蒐集簡訊或無障礙接管都是紅旗。有疑慮時，從書籤回到下載頁，並以裝置型號與確切錯誤文字聯絡客服。",
      ),
    },
    {
      type: "heading",
      id: "responsible",
      text: L("Responsible gaming tools", "負責任博彩工具"),
      anchor: "responsible",
    },
    {
      type: "paragraph",
      id: "responsible-1",
      text: L(
        "Every GGLBET account should treat deposit limits, loss limits, session reminders, cool-off, and self-exclusion as first-class controls—not afterthoughts. Tightening a limit typically applies quickly; loosening one usually requires a cooling-off period so a hot streak cannot instantly undo your earlier choice. Self-exclusion is a longer lock that should not be reversed early. GGLBET cannot replace clinical advice or national helplines, but it can give you product-level distance when entertainment stops feeling optional. Set tools before your first deposit when possible.",
        "每個 GGLBET 帳號都應把存款上限、虧損上限、場次提醒、冷靜期與自我排除當一等控制——而非事後才想。調降上限通常很快生效；調升通常需冷卻期，避免連勝瞬間推翻先前決定。自我排除是較長期鎖定，不應提前解除。GGLBET 不能取代臨床建議或國家求助專線，但能在娛樂不再出於自願時提供產品層距離。可能的話，請在首次存款前設定工具。",
      ),
    },
    {
      type: "paragraph",
      id: "responsible-2",
      text: L(
        "Warning signs that belong in a GGLBET FAQ answer include chasing losses, hiding spend from household budgets, borrowing to play, and feeling compelled to continue after entertainment stops. When those patterns appear, use cool-off or self-exclusion rather than asking support to raise limits in the heat of the moment. Support can point you to the controls and prioritise safer-play tickets, but it will not bypass cooling-off on deposit increases as a favour. Pair product tools with independent help if harm extends beyond one brand.",
        "屬於 GGLBET FAQ 答案的警訊包括追損、對家庭預算隱瞞支出、借錢遊玩，以及娛樂停止後仍感到被迫繼續。當這些模式出現，請使用冷靜期或自我排除，而非在情緒激動時要求客服提高上限。客服可指引控制項並優先處理較安全遊玩工單，但不會把跳過存款調升冷卻期當成人情。若傷害超出單一品牌，請把產品工具與獨立協助並用。",
      ),
    },
    {
      type: "checklist",
      id: "bonus-checks",
      title: L("Read these before opting into a GGLBET bonus", "加入 GGLBET 優惠前先讀這些"),
      items: [
        L("Wagering multiple and eligible games in live terms.", "即時條款中的流水倍數與合格遊戲。"),
        L("Maximum bet while wagering.", "流水期間最高投注。"),
        L("Expiry window and any conversion cap.", "期限與任何兌換上限。"),
        L("Whether the qualifying deposit exceeds the method minimum.", "合格存款是否高於方法最低額。"),
        L("That GGLBET pages explain concepts without inventing your offer’s numbers.", "GGLBET 頁面解釋概念，不捏造你優惠上的數字。"),
      ],
    },
    {
      type: "heading",
      id: "contact-journey",
      text: L("When FAQ should hand off to contact", "何時該從 FAQ 轉到聯絡"),
      anchor: "contact-journey",
    },
    {
      type: "paragraph",
      id: "contact-1",
      text: L(
        "Use FAQ for orientation; use contact when you need account-specific status, a stalled cashier request, or a content correction. Include registered email, timezone-aware timestamps, transaction references, and uncropped screenshots. Payment and responsible-gaming messages are prioritised. Never send passwords. If you are already in a ticket thread, update it instead of opening duplicates that slow the queue for everyone.",
        "用 FAQ 定位；需要帳號專屬狀態、卡住的出納請求或內容更正時用聯絡。附上註冊電郵、含時區時間、交易編號與未裁切截圖。支付與負責任博彩訊息優先。勿傳密碼。若已在工單執行緒中，請更新它，勿重複開單拖慢所有人。",
      ),
    },
    {
      type: "callout",
      id: "age-warning",
      variant: "warning",
      title: L("18+ only — gambling is not income", "僅限 18+——博彩不是收入"),
      body: L(
        "Play only with money you can afford to lose. Open responsible gaming if results stop feeling like entertainment, and confirm every money detail inside your signed-in GGLBET session.",
        "只用虧得起的錢遊玩。若結果不再像娛樂，請開啟負責任博彩，並在登入後的 GGLBET 工作階段確認每一項資金細節。",
      ),
    },
  ] as unknown as TrustPageBlock[],
  visualSections: [
    {
      id: "faq-accounts",
      eyebrow: L("Accounts", "帳號"),
      heading: L("Register, verify, then fund", "先註冊、驗證，再入金"),
      subheading: L(
        "Official domains and one account per person",
        "官方網域與每人一組帳號",
      ),
      body: L(
        "GGLBET FAQ starts with account hygiene because most payment delays begin as incomplete verification or duplicate profiles.",
        "GGLBET FAQ 從帳號衛生開始，因為多數支付延誤始於驗證未完成或重複檔案。",
      ),
      mediaSrc: HUB_MEDIA.faqAccount,
      mediaAlt: L("GGLBET FAQ accounts visual", "GGLBET FAQ 帳號視覺"),
      points: [
        {
          title: L("Official register", "官方註冊"),
          body: L(
            "Start from GGLBET navigation, not chat forms.",
            "從 GGLBET 導覽開始，而非聊天表單。",
          ),
        },
        {
          title: L("Early KYC", "儘早 KYC"),
          body: L(
            "Clear documents before first withdrawal.",
            "首次出款前備妥清晰文件。",
          ),
        },
      ],
      ctas: [
        { label: L("Register on GGLBET", "註冊 GGLBET") as unknown as string, href: ROUTES.register, variant: "primary" },
        { label: L("Log in to GGLBET", "登入 GGLBET") as unknown as string, href: ROUTES.login, variant: "outline" },
      ],
    },
    {
      id: "faq-payment",
      eyebrow: L("Payments", "支付"),
      heading: L("Cashier facts live after login", "出納事實在登入後"),
      subheading: L(
        "Malaysia-friendly examples, live rails for truth",
        "馬來西亞友善範例，以即時通道為準",
      ),
      body: L(
        "FPX-style transfer, Touch 'n Go eWallet, DuitNow, and cards appear as documentation patterns—your signed-in cashier lists what you can use now.",
        "FPX 風格轉帳、Touch 'n Go 電子錢包、DuitNow 與卡片是文件模式——登入後出納列出你現在能用的。",
      ),
      mediaSrc: HUB_MEDIA.faqPayment,
      mediaAlt: L("GGLBET payment FAQ visual", "GGLBET 支付 FAQ 視覺"),
      flip: true,
      ctas: [
        { label: L("GGLBET Payment methods", "GGLBET 支付方式") as unknown as string, href: ROUTES.payment, variant: "primary" },
        { label: L("Contact GGLBET", "聯絡 GGLBET") as unknown as string, href: ROUTES.contact, variant: "outline" },
      ],
    },
    {
      id: "faq-download",
      eyebrow: L("Download", "下載"),
      heading: L("Official install only", "只做官方安裝"),
      subheading: L(
        "Android and iOS notes without mirror APKs",
        "Android 與 iOS 備註，不含鏡像 APK",
      ),
      body: L(
        "The download journey protects account security as much as convenience—unofficial files are a common phishing path.",
        "下載旅程保護帳號安全不亞於便利——非官方檔案是常見釣魚路徑。",
      ),
      mediaSrc: HUB_MEDIA.faqDownload,
      mediaAlt: L("GGLBET download FAQ visual", "GGLBET 下載 FAQ 視覺"),
      ctas: [
        { label: L("Download GGLBET", "下載 GGLBET") as unknown as string, href: ROUTES.download, variant: "primary" },
        { label: L("GGLBET Support", "GGLBET 支援中心") as unknown as string, href: ROUTES.support, variant: "outline" },
      ],
    },
    {
      id: "faq-responsible",
      eyebrow: L("Safer play", "較安全遊玩"),
      heading: L("Limits before stakes", "注碼之前先設上限"),
      subheading: L(
        "Cool-off and self-exclusion when you need distance",
        "需要距離時使用冷靜期與自我排除",
      ),
      body: L(
        "Responsible-gaming tools are part of the GGLBET FAQ cluster so help is one click from money questions—not buried after a loss.",
        "負責任博彩工具屬於 GGLBET FAQ 集群，讓協助距離資金問題一鍵之遙——而非輸後才深埋。",
      ),
      mediaSrc: HUB_MEDIA.faqRg,
      mediaAlt: L("GGLBET responsible gaming FAQ visual", "GGLBET 負責任博彩 FAQ 視覺"),
      flip: true,
      ctas: [
        {
          label: L("Responsible gaming", "負責任博彩") as unknown as string,
          href: ROUTES.responsibleGaming,
          variant: "primary",
        },
        { label: L("Contact GGLBET", "聯絡 GGLBET") as unknown as string, href: ROUTES.contact, variant: "outline" },
      ],
    },
  ],
  faqHeading: L("GGLBET FAQ answers", "GGLBET FAQ 解答"),
  faqSubheading: L(
    "Accounts, money, mobile, safer play, and contact",
    "帳號、資金、行動、較安全遊玩與聯絡",
  ),
  faqBody: L(
    "Each answer is written for Malaysia-intent players. Confirm cashier and lobby details inside your signed-in GGLBET session before you move money.",
    "每則答案為馬來西亞意圖玩家而寫。移動資金前，請在登入後的 GGLBET 工作階段確認出納與大廳細節。",
  ),
  faq: [
    {
      question: L(
        "How do I create a GGLBET account?",
        "如何建立 GGLBET 帳號？",
      ),
      answer: L(
        "Open the official registration journey from GGLBET navigation or the official product, enter required fields, confirm legal age, and accept on-screen terms. Use a reachable email and phone for security notices. Only one account per person is allowed. After registration, set limits before funding and complete identity checks early. Start only from official links—not chat mirrors. When registration succeeds, explore the catalog on this hub and open the live lobby after login.",
        "從 GGLBET 導覽或官方產品開啟註冊流程，填寫必要欄位、確認合法年齡，並接受畫面上的條款。使用可用電郵與電話接收安全通知。每人僅限一組帳號。註冊後請先設定上限再入金，並儘早完成身分核對。只從官方連結開始——勿用聊天鏡像。註冊成功後可在本中心探索目錄，登入後開啟即時大廳。",
      ),
    },
    {
      question: L(
        "Why does GGLBET ask me to verify my identity?",
        "為什麼 GGLBET 要求身分驗證？",
      ),
      answer: L(
        "Verification confirms legal age and payment ownership before funds leave the account. Uploading clear government ID and matching address proof before first withdrawal avoids common payout delays. Uncropped, unexpired images review faster. Verification underpins anti-money-laundering controls and protects against takeover payouts. If GGLBET asks for resubmission, follow the exact document list. Never share passwords or one-time codes with anyone claiming to speed KYC outside official channels.",
        "驗證在資金離帳前確認合法年齡與支付歸屬。首次出款前上傳清晰政府證件與相符地址證明，可避免常見出款延誤。未裁切、未過期影像審核更快。驗證支撐防制洗錢控管，並降低盜帳盜領風險。若要求重傳，請依文件清單辦理。切勿向聲稱可加速 KYC 的人提供密碼或一次性驗證碼。",
      ),
    },
    {
      question: L(
        "Which payment methods can I use on GGLBET?",
        "GGLBET 可以使用哪些支付方式？",
      ),
      answer: L(
        "Documentation describes Malaysia-friendly rails such as FPX-style bank transfer, Touch 'n Go eWallet, DuitNow, and card pathways, plus other types that may appear for your account. The signed-in cashier is the authoritative list. Choose a method you can also use for withdrawals where possible. Check minimums and any bonus qualifying deposit before confirming. Do not improvise with someone else’s account if a method is missing—contact support instead.",
        "文件說明 FPX 風格銀行轉帳、Touch 'n Go 電子錢包、DuitNow 與卡片等馬來西亞友善通道，以及你帳號可能出現的其他類型。登入後出納才是權威清單。儘可能選擇也能用於出款的方法。確認前檢查最低額與任何優惠合格存款。若方法缺失，勿借用他人帳戶——請聯絡客服。",
      ),
    },
    {
      question: L(
        "How long do GGLBET withdrawals take?",
        "GGLBET 出款需要多久？",
      ),
      answer: L(
        "Withdrawals are reviewed first, then processed on the rail you selected. Review is fastest when verification is complete, related wagering is finished, and the destination matches the deposit source where required. After approval, e-wallet style rails often settle quicker than card or bank pathways. Documentation estimates are guidance, not stopwatch guarantees. Keep the cashier transaction reference for support.",
        "出款會先審核，再依你選擇的通道處理。驗證完成、相關流水結束，且收款端在需要時符合存款來源時，審核最快。核准後，電子錢包類通常比卡片或銀行路徑更快。文件預估是指引而非秒表保證。請保留出納交易編號供客服使用。",
      ),
    },
    {
      question: L(
        "Is there a minimum deposit on GGLBET?",
        "GGLBET 有最低存款嗎？",
      ),
      answer: L(
        "Yes. Method-specific minimums and maximums appear in the live cashier and can differ between FPX-style transfer, TnG, DuitNow, cards, and other rails. A promotion may set a higher qualifying minimum than the method floor. Treat the signed-in cashier as truth if an example differs. Set a personal deposit limit before first funding even when the method minimum is low.",
        "有。方法專屬最低與最高額顯示在即時出納，且 FPX 風格轉帳、TnG、DuitNow、卡片與其他通道可能不同。優惠可能要求高於方法下限的合格最低存款。若範例不符，以登入出納為準。即使方法最低額很低，仍建議在首存前設定個人存款上限。",
      ),
    },
    {
      question: L(
        "What are wagering requirements on GGLBET?",
        "GGLBET 的流水要求是什麼？",
      ),
      answer: L(
        "A wagering requirement is the qualifying stake total you must complete before bonus funds or related winnings can be withdrawn. Multiples, eligible games, max bet while wagering, expiry, and conversion caps live in the specific offer terms—GGLBET explains the concept without inventing your number. Low-weight games progress slowly. Attempting withdrawal before wagering completes is a common pause reason. Confirm live terms before opting in.",
        "流水要求是提取優惠資金或相關贏分前必須完成的合格投注總額。倍數、合格遊戲、流水期間最高投注、期限與兌換上限以該優惠即時條款為準——GGLBET 解釋概念，不捏造你的數字。低權重遊戲進度慢。流水未完成就申請出款是常見暫停原因。加入前請確認即時條款。",
      ),
    },
    {
      question: L(
        "Are GGLBET games fair, and what does RTP mean?",
        "GGLBET 遊戲公平嗎？RTP 是什麼？",
      ),
      answer: L(
        "GGLBET catalogs titles from studios listed in the official product directory and explains fairness conceptually: certified RNG design makes individual sessions unpredictable even when a studio publishes long-run RTP. RTP is a theoretical long-run statistic, not a forecast of your next hour, and no betting system changes the math. GGLBET does not invent RTP percentages on trust pages. If no published value exists, treat explanations as conceptual only.",
        "GGLBET 目錄收錄官方產品目錄中的工作室標題，並以概念說明公平性：經認證 RNG 設計使單次場次不可預測，即使工作室公布長期 RTP。RTP 是理論長期統計，不能預測你的下一小時，也沒有投注系統能改變數學。GGLBET 不在信任頁捏造 RTP。若無已公開數值，僅作概念說明。",
      ),
    },
    {
      question: L(
        "Can I set deposit limits on GGLBET?",
        "可以在 GGLBET 設定存款上限嗎？",
      ),
      answer: L(
        "Yes. Deposit limits and related controls such as loss limits or session reminders let you set a ceiling before emotion decides. Tightening usually applies quickly; loosening usually needs a cooling-off period. Set limits before first deposit when possible. If you cannot find the control, check account settings and the responsible gaming page, or ask support to point to the menu without sharing your password.",
        "可以。存款上限以及虧損上限或場次提醒等控制，讓你在情緒決定前設好天花板。調降通常很快生效；調升通常需冷卻期。可能的話請在首次存款前設定。若找不到控制項，請查看帳號設定與負責任博彩頁，或請客服指示選單位置且不分享密碼。",
      ),
    },
    {
      question: L(
        "How does self-exclusion work on GGLBET?",
        "GGLBET 的自我排除如何運作？",
      ),
      answer: L(
        "Self-exclusion is a longer lock for a fixed period you choose and should not be reversed early. Cool-off is the shorter break. When exclusion is active, marketing contact should stop and play access remains blocked for the window. Use responsible-gaming journeys or ask support to locate the control. For harm beyond one brand, seek independent helplines. Choose a period long enough to matter if patterns keep repeating.",
        "自我排除是依你選擇固定期間的較長期鎖定，不應提前解除。冷靜期是較短休息。排除生效後，行銷聯絡應停止，期間內遊玩存取維持封鎖。請用負責任博彩流程或請客服協助找到控制項。若傷害超出單一品牌，請尋求獨立求助專線。若模式反覆，請選擇夠長的期間。",
      ),
    },
    {
      question: L(
        "How do I download the GGLBET app safely?",
        "如何安全下載 GGLBET 應用？",
      ),
      answer: L(
        "Open the official GGLBET download page and follow Android or iOS notes published there. Install only from those official routes—never from forum APKs, chat files, or search ads that imitate the brand. After install, sign in with the same account so limits and verification carry over. Keep updates on. If an installer asks for unrelated permissions or payment outside the product, stop and return to the official download page.",
        "開啟官方 GGLBET 下載頁並依該處 Android 或 iOS 備註操作。只從那些官方路徑安裝——勿用論壇 APK、聊天檔案或仿品牌搜尋廣告。安裝後以同一帳號登入，上限與驗證才會延續。保持更新。若安裝程式要求無關權限或產品外付款，請停止並回到官方下載頁。",
      ),
    },
    {
      question: L(
        "What should I include when contacting GGLBET support?",
        "聯絡 GGLBET 客服時應包含什麼？",
      ),
      answer: L(
        "Include your registered email, the date and time with timezone, the page or feature involved, and—for money—cashier transaction references plus uncropped error screenshots. Say what you already tried. Never paste passwords or one-time codes. Update an existing thread instead of opening duplicates. Clear first messages produce faster first-contact resolution.",
        "請附註冊電郵、含時區的日期時間、相關頁面或功能；若涉及資金，請附出納交易編號與未裁切錯誤截圖。說明你已嘗試過什麼。勿貼密碼或一次性驗證碼。更新既有執行緒，勿重複開單。清楚的首則訊息更快一次往返解決。",
      ),
    },
    {
      question: L(
        "Why is a GGLBET payment pending after I sent funds?",
        "為什麼我已匯出資金但 GGLBET 支付仍待處理？",
      ),
      answer: L(
        "Pending states can mean the cashier is waiting on bank or wallet confirmation, a verification check, or a review tied to bonus wagering. Check whether funds left your side and whether the GGLBET balance changed. Provide both references when you contact support. Do not pay a third party who claims they can release a withdrawal for a fee. Confirm the live cashier status after login rather than assuming a FAQ timing table is a guarantee.",
        "待處理可能表示出納在等銀行或錢包確認、驗證檢查，或與優惠流水相關的審核。請確認資金是否已離開你這端、GGLBET 餘額是否變化。聯絡客服時請提供雙方編號。勿向聲稱付費即可放行出款的第三方付款。登入後確認即時出納狀態，勿把 FAQ 時程表當成保證。",
      ),
    },
    {
      question: L(
        "Where should I go after reading the GGLBET FAQ?",
        "讀完 GGLBET FAQ 後該去哪裡？",
      ),
      answer: L(
        "Open payment for cashier framing, download for install notes, responsible gaming for limits, and contact for account-specific tickets. About GGLBET explains company and editorial ownership. Register or log in when you are ready to confirm live rails. Keep this FAQ bookmarked as the Support cluster index for Malaysia-intent questions.",
        "出納架構看支付頁，安裝備註看下載頁，上限看負責任博彩，帳號專屬工單看聯絡。About GGLBET 說明公司與編輯歸屬。準備確認即時通道時再註冊或登入。請把本 FAQ 書籤成馬來西亞意圖問題的 Support 集群索引。",
      ),
    },
  ],
  finalCta: {
    eyebrow: L("GGLBET next step", "GGLBET 下一步"),
    heading: L("Turn FAQ answers into GGLBET action", "把 FAQ 答案變成 GGLBET 行動"),
    subheading: L(
      "Payment, download, safer play, or contact—pick the next route",
      "支付、下載、較安全遊玩或聯絡——選下一條路由",
    ),
    body: L(
      "Use GGLBET FAQ with Payment, Download, and Responsible Gaming before you deposit. Confirm live cashier details inside your signed-in session.",
      "入金前請搭配支付、下載與負責任博彩使用 GGLBET FAQ。在登入工作階段確認即時出納細節。",
    ),
    mediaSrc: HUB_MEDIA.faqCta,
    mediaAlt: L("GGLBET FAQ next steps visual", "GGLBET FAQ 下一步視覺"),
    ctas: [
      { label: L("GGLBET Payment methods", "GGLBET 支付方式") as unknown as string, href: ROUTES.payment, variant: "primary" },
      { label: L("Contact GGLBET", "聯絡 GGLBET") as unknown as string, href: ROUTES.contact, variant: "outline" },
      { label: L("Register on GGLBET", "註冊 GGLBET") as unknown as string, href: ROUTES.register, variant: "soft" },
    ],
  },
});
