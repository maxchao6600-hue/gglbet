import { L } from "@/lib/i18n";
import type { TrustPageBlock } from "@/types/eeat";
import { HUB_MEDIA, ROUTES, createTrustPage } from "./factory";

export const paymentTrustPage = createTrustPage({
  slug: "payment",
  title: L("GGLBET Payment Methods", "GGLBET 支付方式"),
  metaTitle: L(
    "GGLBET Payment Methods | Deposit, Withdraw & Malaysia Cashier",
    "GGLBET 支付方式｜存款、出款與馬來西亞出納",
  ),
  metaDescription: L(
    "Learn how GGLBET deposits and withdrawals work for Malaysia players: banks, e-wallets, processing time, limits, verification, and cashier security. Confirm live methods inside your signed-in GGLBET cashier.",
    "了解馬來西亞玩家如何在 GGLBET 存款與出款：銀行、電子錢包、處理時間、限額、驗證與出納安全。請在已登入的 GGLBET 出納確認即時可用方式。",
  ),
  heroEyebrow: L("GGLBET Support · Payments", "GGLBET 支援 · 支付"),
  heroTitle: L(
    "GGLBET deposits and withdrawals, explained",
    "GGLBET 存款與出款說明",
  ),
  heroDescription: L(
    "Use this GGLBET payment hub to understand deposit rails, withdrawal reviews, Malaysia-friendly banks and e-wallets, processing expectations, and security habits—then confirm every live limit and method inside your signed-in cashier.",
    "透過此 GGLBET 支付中心了解存款通道、出款審核、馬來西亞友善銀行與電子錢包、處理預期與安全習慣——接著在已登入出納確認每項即時限額與方式。",
  ),
  heroImageSrc: HUB_MEDIA.payment,
  lastUpdated: "2026-08-08",
  authorSlug: "gglbet-editorial",
  reviewerSlug: "gglbet-trust-desk",
  schemaType: "WebPage",
  summaryCards: [
    {
      title: L("GGLBET deposit flow", "GGLBET 存款流程"),
      description: L(
        "Sign in, open the cashier, choose an available method, stay within shown limits, and confirm the bank or wallet approval before you play.",
        "登入後開啟出納、選擇可用方式、維持在顯示限額內，並在遊玩前完成銀行或錢包核准。",
      ),
    },
    {
      title: L("GGLBET withdrawal review", "GGLBET 出款審核"),
      description: L(
        "Payouts leave your balance after identity, ownership, and wagering checks. Matching the deposit source usually keeps the review smoother.",
        "出款在身分、歸屬與流水檢查後才離開餘額。與存款來源相符通常使審核更順暢。",
      ),
    },
    {
      title: L("Processing time expectations", "處理時間預期"),
      description: L(
        "Deposits often credit quickly once the sending side succeeds. Withdrawals add platform approval plus the external rail’s own window.",
        "付款端成功後存款常快速入帳。出款另含平台核准與外部通道本身的處理時段。",
      ),
    },
    {
      title: L("Malaysia bank pathways", "馬來西亞銀行路徑"),
      description: L(
        "FPX-style and bank-transfer options may appear for eligible accounts. Always verify the live list inside your GGLBET cashier session.",
        "符合條件的帳號可能看到 FPX 風格與銀行轉帳選項。請一律在 GGLBET 出納工作階段核對即時清單。",
      ),
    },
    {
      title: L("E-wallet options", "電子錢包選項"),
      description: L(
        "Familiar Malaysia wallet-style rails can speed confirmations when listed. Keep wallet details aligned with your verified GGLBET profile.",
        "當清單出現熟悉的馬來西亞錢包風格通道時，可加快確認。請讓錢包資料與已驗證的 GGLBET 資料一致。",
      ),
    },
    {
      title: L("Cashier security", "出納安全"),
      description: L(
        "Fund only through the official GGLBET cashier. Never send money to personal accounts or “agents” who claim they can deposit for you.",
        "只經官方 GGLBET 出納入金。切勿匯款到個人帳戶，或交給聲稱可代存款的「代理」。",
      ),
    },
  ],
  blocks: [
    {
      type: "tldr",
      id: "tldr",
      text: L(
        "GGLBET deposits usually credit quickly after your bank or wallet confirms the transfer. Withdrawals take longer because GGLBET reviews identity, payment ownership, and any open bonus wagering before releasing funds. Complete verification early, prefer methods that support both deposit and withdraw where policy allows, and treat the live cashier on gglbet5.com as the only authoritative list of methods, limits, and fees for your signed-in session.",
        "GGLBET 存款通常在銀行或錢包確認轉帳後快速入帳。出款較久，因為 GGLBET 會在放款前審核身分、支付歸屬與任何未完成的優惠流水。請儘早完成驗證，在政策允許時優先選擇可雙向存提的方式，並以 gglbet5.com 即時出納作為你已登入工作階段中方式、限額與費用的唯一權威清單。",
      ),
    },
    {
      type: "definition",
      id: "definition",
      term: L("GGLBET cashier", "GGLBET 出納"),
      text: L(
        "The GGLBET cashier is the signed-in payment workspace where available deposit and withdrawal methods, minimums, maximums, and any platform-side fees are shown for your account at that moment. Documentation on this page explains concepts and habits; the cashier shows what is actually available to you today.",
        "GGLBET 出納是已登入的支付工作區，會顯示該當下帳號可用的存提方式、最低與最高額，以及任何平台端費用。本頁文件解釋概念與習慣；出納則顯示你今天實際可用的項目。",
      ),
    },
    {
      type: "heading",
      id: "why-cashier-matters",
      text: L(
        "Why the live GGLBET cashier is the source of truth",
        "為何即時 GGLBET 出納才是真相來源",
      ),
      anchor: "why-cashier-matters",
    },
    {
      type: "paragraph",
      id: "cashier-truth-1",
      text: L(
        "Malaysia players searching for GGLBET payment methods, deposit options, or withdrawal timing often want a single frozen list they can trust forever. That list does not exist in a helpful form, because banks, e-wallet partners, maintenance windows, and account eligibility change. GGLBET publishes this support page so you understand how the cashier behaves, what usually delays a payout, and how to prepare before you need money to move. The page is not a substitute for the signed-in product experience on gglbet5.com, where your account sees the methods that are actually enabled.",
        "搜尋 GGLBET 支付方式、存款選項或出款時間的馬來西亞玩家，常希望有一份可永遠信任的固定清單。那種清單並不實用，因為銀行、電子錢包合作方、維護時段與帳號資格會改變。GGLBET 發布本支援頁，是為了讓你了解出納如何運作、什麼通常拖慢出款，以及在需要資金移動前如何準備。本頁不能取代 gglbet5.com 上已登入的產品體驗——那裡才看得到帳號實際啟用的方式。",
      ),
    },
    {
      type: "paragraph",
      id: "cashier-truth-2",
      text: L(
        "When you register or log in to GGLBET, payment tooling becomes personal. A method that appears for one profile may be absent for another because of bank participation, prior verification status, or temporary rail outages. Treating screenshots from social media as gospel creates avoidable frustration. Open the cashier after login, read the limits next to the method you intend to use, and only then commit funds. If something looks missing, contact GGLBET support with your registered email instead of improvising an unofficial transfer.",
        "當你註冊或登入 GGLBET 後，支付工具會變成個人化。某個方式可能因銀行參與、先前驗證狀態或通道短暫中斷，出現在一個資料卻不在另一個。把社群媒體截圖當成真理，只會造成可避免的挫折。登入後開啟出納，閱讀你打算使用的方式旁的限額，再投入資金。若有項目似乎缺失，請用註冊電郵聯絡 GGLBET 客服，勿自行走非官方轉帳。",
      ),
    },
    {
      type: "heading",
      id: "deposit",
      text: L("How GGLBET deposits work", "GGLBET 存款如何運作"),
      anchor: "deposit",
    },
    {
      type: "paragraph",
      id: "deposit-1",
      text: L(
        "A GGLBET deposit is you sending funds into your account balance through an available cashier rail. After you choose a method and amount within the displayed limits, you complete the approval flow your bank, card issuer, or e-wallet presents. Most supported pathways credit the GGLBET balance quickly once the sending side succeeds, which is why deposits often feel near-instant compared with withdrawals. That speed does not mean you should skip safer-play planning: set a personal deposit limit in responsible-gaming tools before you fund entertainment spend.",
        "GGLBET 存款是你透過可用出納通道把資金送入帳號餘額。選擇方式與顯示限額內金額後，完成銀行、發卡行或電子錢包出示的核准流程。多數支援路徑在付款端成功後會快速記入 GGLBET 餘額，因此存款常比出款更接近即時。速度快不代表可以跳過較安全遊玩規劃：請在入金娛樂花費前，先於負責任博彩工具設定個人存款上限。",
      ),
    },
    {
      type: "paragraph",
      id: "deposit-2",
      text: L(
        "If you plan to claim a GGLBET promotion with the deposit, read the offer terms first. Qualifying minimums for bonuses are often higher than the method’s own minimum deposit, and wagering rules can later affect when related funds become withdrawable. Keeping promotion logic separate from payment mechanics prevents a common mix-up: players sometimes treat a paused withdrawal as a “cashier failure” when it is actually an unfinished wagering condition. Check both the cashier and the promotion tracker before you assume something is broken.",
        "若計劃用該筆存款領取 GGLBET 優惠，請先閱讀優惠條款。獎金的合格最低額常高於該方式本身的最低存款，而流水規則之後也會影響相關資金何時可出款。把優惠邏輯與支付機制分開，可避免常見混淆：玩家有時把暫停的出款當成「出納故障」，其實只是流水條件尚未完成。在認定故障前，請同時查出納與優惠追蹤。",
      ),
    },
    {
      type: "steps",
      id: "deposit-steps",
      title: L("Depositing on GGLBET in five steps", "五步驟完成 GGLBET 存款"),
      steps: [
        {
          title: L("Verify before you fund", "入金前先驗證"),
          text: L(
            "Complete identity verification during a calm moment so your first withdrawal is not the first time a document problem appears.",
            "在平靜時刻完成身分驗證，避免第一次出款才發現文件問題。",
          ),
        },
        {
          title: L("Set a GGLBET deposit limit", "設定 GGLBET 存款上限"),
          text: L(
            "Decide your entertainment ceiling in account responsible-gaming settings before you choose a deposit amount.",
            "在選擇存款金額前，先於帳號負責任博彩設定決定娛樂上限。",
          ),
        },
        {
          title: L("Pick a two-way method when possible", "盡可能選雙向方式"),
          text: L(
            "Where policy routes payouts back to the deposit source, choosing a rail that also supports withdrawals reduces later friction.",
            "當政策要求出款回到存款來源時，選擇也支援出款的通道可減少之後摩擦。",
          ),
        },
        {
          title: L("Confirm live limits in the cashier", "在出納確認即時限額"),
          text: L(
            "Read the minimum, maximum, and any fee line shown for your method in the signed-in GGLBET cashier before you confirm.",
            "確認前請閱讀已登入 GGLBET 出納中該方式顯示的最低、最高與任何費用列。",
          ),
        },
        {
          title: L("Keep the transaction reference", "保留交易編號"),
          text: L(
            "If the balance does not update promptly, compare your bank or wallet history with the cashier reference before retrying.",
            "若餘額未迅速更新，重試前請比對銀行或錢包紀錄與出納編號。",
          ),
        },
      ],
    },
    {
      type: "heading",
      id: "withdraw",
      text: L("How GGLBET withdrawals work", "GGLBET 出款如何運作"),
      anchor: "withdraw",
    },
    {
      type: "paragraph",
      id: "withdraw-1",
      text: L(
        "A GGLBET withdrawal moves funds out of your balance after a compliance review. The review typically confirms that you completed identity checks, that the destination payment account belongs to you, and that bonus wagering is not still blocking payout. Only after approval does the external rail’s processing window begin. E-wallet style methods often settle faster after approval than card or traditional bank pathways, but GGLBET cannot control every receiving institution’s schedule. Plan around a realistic window instead of expecting deposit-like speed on every payout.",
        "GGLBET 出款會在合規審核後將資金移出餘額。審核通常確認你已完成身分檢查、收款支付帳戶屬於你，以及優惠流水未再阻擋出款。核准後才進入外部通道的處理時段。核准後電子錢包類方式通常比卡片或傳統銀行路徑更快入帳，但 GGLBET 無法控制每個收款機構的時程。請依務實時段規劃，勿期待每次出款都像存款一樣快。",
      ),
    },
    {
      type: "paragraph",
      id: "withdraw-2",
      text: L(
        "Name mismatches between your GGLBET profile and your bank, e-wallet, or card account are a frequent reason for manual review. So are incomplete documents and withdrawals requested to a different method than the one used to deposit when policy requires matching. Respond to any request for more information only through official GGLBET support channels. Never pay a stranger who claims they can “release” your withdrawal for a fee—that is not how GGLBET payouts work.",
        "GGLBET 資料與銀行、電子錢包或卡片帳戶姓名不符，是人工審核的常見原因。文件未完成，以及在政策要求相符時向不同於存款來源的方式申請出款，也同樣常見。任何補件要求請只經官方 GGLBET 客服管道回應。切勿向聲稱付費即可「放行」出款的陌生人付款——那不是 GGLBET 出款運作方式。",
      ),
    },
    {
      type: "checklist",
      id: "delay-causes",
      title: L(
        "Common reasons a GGLBET payout feels slow",
        "GGLBET 出款感覺緩慢的常見原因",
      ),
      items: [
        L(
          "Identity verification not complete, or documents expired or cropped.",
          "身分驗證未完成，或文件過期、裁切不完整。",
        ),
        L(
          "Active bonus wagering still outstanding on related funds.",
          "相關資金仍有未完成的優惠流水。",
        ),
        L(
          "Withdrawal destination differs from the deposit source when matching is required.",
          "在要求相符時，出款目的地與存款來源不同。",
        ),
        L(
          "Payment account name does not match the verified GGLBET account holder.",
          "支付帳戶姓名與已驗證的 GGLBET 帳戶持有人不符。",
        ),
        L(
          "Request submitted outside the processing hours of the chosen rail.",
          "申請送出時間落在所選通道的處理時段之外。",
        ),
      ],
    },
    {
      type: "heading",
      id: "methods",
      text: L(
        "Banks, e-wallets, and other GGLBET method types",
        "銀行、電子錢包與其他 GGLBET 方式類型",
      ),
      anchor: "methods",
    },
    {
      type: "paragraph",
      id: "methods-1",
      text: L(
        "GGLBET payment guidance groups methods by behaviour rather than promising a permanent catalogue. Bank and FPX-style transfers are familiar to many Malaysia players who already approve payments inside banking apps. E-wallet pathways can feel fast when the wallet balance and naming details are ready. Cards may appear when issuer rules allow gambling-coded merchants for your account. Crypto-style rails, when enabled, depend on network confirmations. None of these categories is universally better; the honest answer to “which method is fastest?” is that it depends on what your live cashier enables and how the receiving side processes approved payouts.",
        "GGLBET 支付指引依行為為方式分組，而非承諾永久目錄。銀行與 FPX 風格轉帳，對已在銀行 App 核准付款的許多馬來西亞玩家來說很熟悉。當錢包餘額與姓名資料就緒時，電子錢包路徑可以很快。在發卡規則允許你的帳號使用博彩類特店時，卡片可能出現。加密貨幣風格通道若啟用，則取決於網路確認。沒有哪一類永遠更好；「哪個最快」的誠實答案是：取決於你的即時出納啟用了什麼，以及收款端如何處理已核准出款。",
      ),
    },
    {
      type: "comparison",
      id: "methods-table",
      caption: L(
        "Typical GGLBET method behaviour at a glance",
        "GGLBET 方式典型行為一覽",
      ),
      headers: [
        L("Method type", "方式類型"),
        L("Deposit feel", "存款感受"),
        L("After withdrawal approval", "出款核准後"),
        L("Best suited for", "較適合"),
      ],
      rows: [
        [
          L("E-wallet style", "電子錢包風格"),
          L("Often quick after wallet confirm", "錢包確認後通常很快"),
          L("Often same-day rail timing", "通道時程常為當日"),
          L("Fast round trips when listed", "清單有時的快速來回"),
        ],
        [
          L("Bank / FPX-style", "銀行／FPX 風格"),
          L("Minutes once bank approves", "銀行核准後數分鐘"),
          L("Banking network window", "銀行網路時段"),
          L("Familiar Malaysia banking apps", "熟悉的馬來西亞銀行 App"),
        ],
        [
          L("Card", "卡片"),
          L("Often instant if issuer allows", "發卡允許時常即時"),
          L("Issuer timeline after approval", "核准後依發卡時程"),
          L("Players who prefer cards", "偏好卡片的玩家"),
        ],
        [
          L("Other enabled rails", "其他已啟用通道"),
          L("Varies by confirmations", "依確認情況而異"),
          L("Varies by network", "依網路而異"),
          L("What your cashier shows today", "今天出納顯示的項目"),
        ],
      ],
    },
    {
      type: "callout",
      id: "fees-callout",
      variant: "info",
      title: L("Fees can come from more than one place", "費用可能來自不只一處"),
      body: L(
        "Any fee charged by GGLBET itself is shown in the cashier before you confirm. Your bank, card issuer, e-wallet provider, or network may apply separate charges or FX spreads that GGLBET does not set. Pause and ask support if a fee line is unclear before large transfers.",
        "任何由 GGLBET 本身收取的費用，會在確認前顯示於出納。銀行、發卡行、電子錢包業者或網路可能另收費用或匯差，非 GGLBET 訂定。大額轉帳前若費用列不清，請先暫停並詢問客服。",
      ),
    },
    {
      type: "heading",
      id: "security",
      text: L("GGLBET payment security habits", "GGLBET 支付安全習慣"),
      anchor: "security",
    },
    {
      type: "paragraph",
      id: "security-1",
      text: L(
        "Cashier phishing is common around online casino login and deposit intent. Protect GGLBET payments by starting from bookmarked official URLs, refusing to send funds to personal accounts outside the cashier, and never sharing one-time passwords with anyone who messages you first. GGLBET support will not ask you to bypass the cashier through an “agent deposit.” If a deposit succeeds on the bank or wallet side but the GGLBET balance does not update, collect both references and contact official support for reconciliation instead of retrying blindly.",
        "圍繞線上娛樂城登入與存款意圖的出納釣魚很常見。保護 GGLBET 支付的方式是：從書籤中的官方網址開始、拒絕匯款到出納外的個人帳戶，且絕不把一次性密碼分享給先傳訊給你的人。GGLBET 客服不會要求你透過「代理存款」繞過出納。若銀行或錢包端顯示成功但 GGLBET 餘額未更新，請蒐集兩邊編號並聯絡官方客服對帳，而非盲目重試。",
      ),
    },
    {
      type: "callout",
      id: "agent-warning",
      variant: "warning",
      title: L("No unofficial payment agents", "沒有非官方支付代理"),
      body: L(
        "Anyone asking you to transfer to a personal bank account, Touch ’n Go number, or DuitNow proxy “on behalf of GGLBET” is not an official payment path. Use only the signed-in cashier, then confirm details on gglbet5.com when you need the product source of truth.",
        "任何要求你「代表 GGLBET」轉帳到個人銀行帳戶、Touch ’n Go 號碼或 DuitNow proxy 的人，都不是官方支付路徑。請只用已登入出納；需要產品真相來源時，再於 gglbet5.com 確認細節。",
      ),
    },
    {
      type: "heading",
      id: "malaysia-habits",
      text: L(
        "Practical cashier habits for Malaysia GGLBET players",
        "給馬來西亞 GGLBET 玩家的務實出納習慣",
      ),
      anchor: "malaysia-habits",
    },
    {
      type: "paragraph",
      id: "malaysia-1",
      text: L(
        "Build a short personal routine around GGLBET login and deposit moments. Bookmark the official domain, confirm responsible-gaming deposit limits before you open the cashier, and photograph or save transaction references until balances update. When a bank app shows a success that GGLBET has not mirrored yet, wait for a clear terminal state before retrying the same amount. That single habit prevents many duplicate pending transfers. If you switch between FPX-style banking, wallet-style rails, and cards across sessions, keep one primary method for most funding so ownership reviews stay predictable.",
        "圍繞 GGLBET 登入與存款時刻建立簡短個人流程。將官方網域加入書籤、開啟出納前確認負責任博彩存款上限，並在餘額更新前拍照或保存交易編號。當銀行 App 顯示成功但 GGLBET 尚未對應時，在重試同一金額前先等到清楚終態。這一個習慣就能避免許多重複處理中轉帳。若你在不同場次切換 FPX 風格銀行、錢包風格通道與卡片，請固定一個主要入金方式，讓歸屬審核更可預期。",
      ),
    },
    {
      type: "paragraph",
      id: "malaysia-2",
      text: L(
        "Withdrawal planning deserves the same discipline. Complete verification after your first deposit rather than on the evening you want a payout. Check whether bonus wagering still applies before you assume the cashier is “stuck.” Read the live estimate for your method, then give the upper end of that window time to complete before opening a second request. When you finally need help, contact GGLBET with the registered email, method, amount, time, and references—support can move faster when they are not reconstructing the story from scratch.",
        "出款規劃需要同樣紀律。請在首次存款後完成驗證，而不是想兌現的那個晚上。在認定出納「卡住」前，先檢查優惠流水是否仍適用。閱讀你方式的即時估算，然後在開啟第二筆申請前，給該時段上限足夠時間完成。真正需要協助時，請用註冊電郵向 GGLBET 提供方式、金額、時間與編號——客服不必從頭重建故事時會更快。",
      ),
    },
    {
      type: "paragraph",
      id: "closing",
      text: L(
        "Use this GGLBET payment page as preparation, then finish every real decision inside the live cashier after login. Pair deposits with responsible-gaming limits, keep verification current, and open the download or FAQ hubs when you need adjacent support topics. When something still looks wrong, the contact path with your registered email is faster than repeating the same failed amount. Confirm live methods, limits, and fees on gglbet5.com inside your signed-in session whenever documentation and the product could diverge.",
        "把本 GGLBET 支付頁當作準備，真正決定則在登入後的即時出納完成。存款請搭配負責任博彩上限、保持驗證最新，需要相鄰支援主題時再開啟下載或 FAQ 中心。若仍有異常，用註冊電郵走聯絡路徑，會比重複同一失敗金額更快。每當文件與產品可能分歧時，請在 gglbet5.com 已登入工作階段確認即時方式、限額與費用。",
      ),
    },
  ] as unknown as TrustPageBlock[],
  visualSections: [
    {
      id: "visual-deposit",
      eyebrow: L("Deposit", "存款"),
      heading: L(
        "Fund your GGLBET balance with clarity",
        "清楚為 GGLBET 餘額入金",
      ),
      subheading: L(
        "Limits, method choice, and confirmation before play",
        "遊玩前的限額、方式選擇與確認",
      ),
      body: L(
        "Start every GGLBET deposit from the signed-in cashier. Read the live minimum and maximum, complete the bank or wallet approval, and wait for the balance update before opening games. Keep the transaction reference until the credit appears.",
        "每次 GGLBET 存款都從已登入出納開始。閱讀即時最低與最高額、完成銀行或錢包核准，並在開啟遊戲前等待餘額更新。入帳前請保留交易編號。",
      ),
      mediaSrc: HUB_MEDIA.deposit,
      mediaAlt: L(
        "GGLBET deposit cashier visual",
        "GGLBET 存款出納視覺",
      ),
      points: [
        {
          title: L("Live limits first", "先看即時限額"),
          body: L(
            "Cashier values override any remembered screenshot.",
            "出納數值優先於任何記過的截圖。",
          ),
        },
        {
          title: L("Safer-play ceiling", "較安全遊玩上限"),
          body: L(
            "Set a deposit limit before you choose an amount.",
            "選擇金額前先設定存款上限。",
          ),
        },
      ],
      ctas: [
        { label: L("Register on GGLBET", "註冊 GGLBET") as unknown as string, href: ROUTES.register, variant: "primary" },
        { label: L("Log in to GGLBET", "登入 GGLBET") as unknown as string, href: ROUTES.login, variant: "outline" },
      ],
    },
    {
      id: "visual-withdraw",
      eyebrow: L("Withdraw", "出款"),
      heading: L(
        "Request GGLBET withdrawals with fewer stalls",
        "減少卡住的 GGLBET 出款申請",
      ),
      subheading: L(
        "Verification, matching methods, and realistic timing",
        "驗證、相符方式與務實時間",
      ),
      body: L(
        "GGLBET withdrawals review identity and ownership before the rail moves money. Finish KYC early, withdraw to a matching destination when required, and track status with the cashier reference instead of submitting duplicate requests.",
        "GGLBET 出款在通道移動資金前會審核身分與歸屬。請儘早完成 KYC、在需要時向相符收款端出款，並用出納編號追蹤狀態，而非重複送出申請。",
      ),
      mediaSrc: HUB_MEDIA.withdraw,
      mediaAlt: L(
        "GGLBET withdrawal guidance visual",
        "GGLBET 出款指引視覺",
      ),
      flip: true,
      points: [
        {
          title: L("Verify early", "儘早驗證"),
          body: L(
            "Do not wait until the first cash-out to upload documents.",
            "勿等到第一次兌現才上傳文件。",
          ),
        },
        {
          title: L("One request at a time", "一次一筆申請"),
          body: L(
            "Duplicates can confuse status without speeding approval.",
            "重複申請會混淆狀態，卻不會加快核准。",
          ),
        },
      ],
    },
    {
      id: "visual-methods",
      eyebrow: L("Methods", "方式"),
      heading: L(
        "Banks and e-wallets in the GGLBET cashier",
        "GGLBET 出納中的銀行與電子錢包",
      ),
      subheading: L(
        "Malaysia-friendly rails when your session enables them",
        "當工作階段啟用時的馬來西亞友善通道",
      ),
      body: L(
        "FPX-style bank flows, wallet-style options, cards, and other rails appear only when enabled for your account. Confirm availability inside the live GGLBET cashier on gglbet5.com rather than assuming a social post is current.",
        "FPX 風格銀行流程、錢包風格選項、卡片與其他通道，僅在帳號啟用時出現。請在 gglbet5.com 的即時 GGLBET 出納確認可用性，勿假設社群貼文仍有效。",
      ),
      mediaSrc: HUB_MEDIA.paymentMethods,
      mediaAlt: L(
        "GGLBET payment methods visual",
        "GGLBET 支付方式視覺",
      ),
      points: [
        {
          title: L("Match account names", "核對帳戶姓名"),
          body: L(
            "Aligned naming reduces ownership review friction later.",
            "姓名一致可降低之後歸屬審核摩擦。",
          ),
        },
        {
          title: L("Method-specific caps", "方式專屬上限"),
          body: L(
            "Minimums and maximums differ by rail and account status.",
            "最低與最高額因通道與帳號狀態而異。",
          ),
        },
      ],
    },
    {
      id: "visual-security",
      eyebrow: L("Security", "安全"),
      heading: L(
        "Keep GGLBET payment sessions protected",
        "保護 GGLBET 支付工作階段",
      ),
      subheading: L(
        "Official cashier only—no agent shortcuts",
        "只用官方出納——沒有代理捷徑",
      ),
      body: L(
        "Protect deposits and withdrawals by using official GGLBET login, refusing password sharing, and ignoring anyone who asks you to fund a personal account outside the cashier. Official product details live on gglbet5.com when you need to confirm the live experience.",
        "透過官方 GGLBET 登入、拒絕分享密碼，並忽略要求你在出納外向個人帳戶入金的人，來保護存提款。需要確認即時體驗時，官方產品細節在 gglbet5.com。",
      ),
      mediaSrc: HUB_MEDIA.paymentSecurity,
      mediaAlt: L(
        "GGLBET payment security visual",
        "GGLBET 支付安全視覺",
      ),
      flip: true,
      ctas: [
        { label: L("Contact GGLBET", "聯絡 GGLBET") as unknown as string, href: ROUTES.contact, variant: "secondary" },
        {
          label: L("Responsible gaming", "負責任博彩") as unknown as string,
          href: ROUTES.responsibleGaming,
          variant: "outline",
        },
      ],
    },
  ],
  faqHeading: L(
    "GGLBET payment FAQ for Malaysia players",
    "給馬來西亞玩家的 GGLBET 支付常見問題",
  ),
  faqSubheading: L(
    "Deposits, withdrawals, banks, e-wallets, and cashier security",
    "存款、出款、銀行、電子錢包與出納安全",
  ),
  faqBody: L(
    "These answers explain how GGLBET payments usually behave. Always confirm methods, limits, and fees inside your signed-in cashier session.",
    "這些回答說明 GGLBET 支付的常見行為。請一律在已登入出納工作階段確認方式、限額與費用。",
  ),
  faq: [
    {
      question: L(
        "How do GGLBET deposits work for Malaysia players?",
        "馬來西亞玩家的 GGLBET 存款如何運作？",
      ),
      answer: L(
        "After you log in to GGLBET, open the cashier, choose an available method, enter an amount within the shown limits, and complete the bank or wallet approval. Most supported rails credit the balance quickly once the sending side succeeds. Set a personal deposit limit first, and confirm the live method list on gglbet5.com rather than relying on screenshots. Keep the transaction reference until the balance updates. Never deposit through an unofficial agent outside the cashier.",
        "登入 GGLBET 後開啟出納、選擇可用方式、輸入顯示限額內金額，並完成銀行或錢包核准。多數支援通道在付款端成功後會快速記入餘額。請先設定個人存款上限，並以 gglbet5.com 即時方式清單為準，勿依賴截圖。餘額更新前請保留交易編號。切勿透過出納外的非官方代理存款。",
      ),
    },
    {
      question: L(
        "How do GGLBET withdrawals work?",
        "GGLBET 出款如何運作？",
      ),
      answer: L(
        "GGLBET withdrawals leave your balance after a review that checks identity status, payment ownership, and whether bonus wagering still blocks payout. Submit the request in the cashier to a destination that matches your deposit source where policy requires it, then wait for approval before the rail’s external window begins. Outstanding wagering or mismatched names are common reasons a request returns for more information. Track status with the cashier reference and contact official support only.",
        "GGLBET 出款會在審核身分狀態、支付歸屬，以及優惠流水是否仍阻擋出款後離開餘額。請在出納向政策要求時符合存款來源的收款端送出申請，核准後才進入通道外部時段。未完成流水或姓名不符，是常見的補件退回原因。請用出納編號追蹤狀態，並只聯絡官方客服。",
      ),
    },
    {
      question: L(
        "Does GGLBET support FPX-style bank transfer?",
        "GGLBET 支援 FPX 風格銀行轉帳嗎？",
      ),
      answer: L(
        "GGLBET documents FPX-style instant bank transfer as a Malaysia-friendly deposit pathway many players recognise from banking apps. When the rail appears in your live cashier, select your bank, approve the transfer, and wait for the GGLBET balance to update. Availability can vary by account and maintenance windows, so confirm inside the signed-in cashier on gglbet5.com before a time-sensitive deposit. Keep bank confirmation screenshots if you need support.",
        "GGLBET 將 FPX 風格即時銀行轉帳說明為許多玩家從銀行 App 熟悉的馬來西亞友善存款路徑。當即時出納出現該通道時，選擇銀行、核准轉帳，並等待 GGLBET 餘額更新。可用性可能因帳號與維護時段而異，趕時間存款前請先於 gglbet5.com 登入出納確認。若需客服協助，請保留銀行確認截圖。",
      ),
    },
    {
      question: L(
        "Can I use Touch 'n Go eWallet with GGLBET?",
        "可以在 GGLBET 使用 Touch 'n Go 電子錢包嗎？",
      ),
      answer: L(
        "Touch 'n Go eWallet is documented as a familiar Malaysia e-wallet style option when it appears in your live GGLBET cashier. Follow the on-screen wallet approval steps and verify the balance updates before you play. Keep wallet name details aligned with your verified profile to reduce later withdrawal friction. Confirm live limits on gglbet5.com. If the wallet shows success but GGLBET does not, keep both references and contact support.",
        "當即時 GGLBET 出納出現 Touch 'n Go 電子錢包時，文件將其說明為熟悉的馬來西亞電子錢包風格選項。依畫面完成錢包核准，並在遊玩前確認餘額已更新。請讓錢包姓名與已驗證資料一致，以降低日後出款摩擦。請在 gglbet5.com 確認即時限額。若錢包顯示成功但 GGLBET 未入帳，請保留兩邊編號並聯絡客服。",
      ),
    },
    {
      question: L(
        "Is DuitNow available for GGLBET payments?",
        "GGLBET 支付可以使用 DuitNow 嗎？",
      ),
      answer: L(
        "DuitNow may appear for eligible GGLBET accounts when the live cashier enables that Malaysia proxy or transfer style rail. A documentation mention is not a permanent guarantee for every player. Open the cashier after login on gglbet5.com, confirm whether DuitNow is listed, and complete only the official approval flow. Avoid third-party “DuitNow agents” who ask you to transfer to personal accounts outside the cashier.",
        "當即時出納啟用該馬來西亞 proxy 或轉帳風格通道時，符合條件的 GGLBET 帳號可能看到 DuitNow。文件提及不代表每位玩家永久保證可用。請在 gglbet5.com 登入後開啟出納，確認是否列出 DuitNow，並只完成官方核准流程。避免要求你轉帳到出納外個人帳戶的第三方「DuitNow 代理」。",
      ),
    },
    {
      question: L(
        "Can I deposit or withdraw with cards on GGLBET?",
        "可以在 GGLBET 用卡片存提款嗎？",
      ),
      answer: L(
        "Card pathways may appear for GGLBET players when issuer rules allow. Deposits that credit quickly can still withdraw on the card network’s slower schedule after approval. Use a card in your own name that matches your verified profile. Issuers may decline gambling-coded merchants even when GGLBET shows the method. Confirm card presence and limits in the live cashier and keep authorisation references for support.",
        "在發卡規則允許時，GGLBET 玩家可能看到卡片路徑。快速入帳的存款，核准後出款仍可能依卡組織較慢時程。請使用與已驗證資料相符的本人姓名卡片。即使 GGLBET 顯示該方式，發卡行仍可能拒掉博彩類特店。請在即時出納確認卡片與限額，並為客服保留授權編號。",
      ),
    },
    {
      question: L(
        "Where do I see GGLBET deposit and withdrawal limits?",
        "在哪裡查看 GGLBET 存提款限額？",
      ),
      answer: L(
        "Authoritative GGLBET limits are the minimums, maximums, and daily caps shown in the live cashier when you submit. Documentation explains typical behaviour but cannot override your signed-in session on gglbet5.com. Personal responsible-gaming deposit limits can be stricter than method caps. If a limit looks unexpected, screenshot it and ask support whether it is a method cap, account rule, or safer-play setting you configured.",
        "權威的 GGLBET 限額是送出當下即時出納顯示的最低、最高與每日上限。文件解釋典型行為，但不能覆寫你在 gglbet5.com 的登入工作階段。個人負責任博彩存款上限可以比方式上限更嚴。若限額看起來異常，請截圖並詢問客服那是方式上限、帳號規則，或你設定的較安全遊玩設定。",
      ),
    },
    {
      question: L(
        "Why must I verify before a GGLBET payout?",
        "為什麼 GGLBET 出款前必須驗證？",
      ),
      answer: L(
        "GGLBET requires identity and payment-ownership checks before payouts so funds return to the rightful account holder and meet anti-money-laundering expectations. Completing verification after your first deposit—but before your first withdrawal—prevents the most common stall. Clear, unexpired documents review faster. Verification is separate from wagering checks: a fully verified account can still wait if bonus requirements remain open.",
        "GGLBET 在出款前要求身分與支付歸屬檢查，確保資金回到正確帳戶持有人並符合防制洗錢期待。首存後、首提前完成驗證，可避免最常見卡住。清晰未過期文件較快審完。驗證與流水檢查是分開的：即使已完全驗證，優惠要求未完成仍可能等待。",
      ),
    },
    {
      question: L(
        "What should I do if a GGLBET deposit fails?",
        "GGLBET 存款失敗該怎麼辦？",
      ),
      answer: L(
        "Check the cashier message and your bank, wallet, or card app history to see whether funds left your side. Wait for a clear success or failure before retrying the same amount, or you may create duplicate pending transfers. Collect time, amount, method, and references, then contact GGLBET support through the official contact page with your registered email. If the sending side shows success but GGLBET does not, say so explicitly so reconciliation can start.",
        "請看出納訊息與銀行、錢包或卡片 App 紀錄，確認資金是否已離開你這端。在狀態未明前勿用同一金額重試，以免產生重複處理中轉帳。蒐集時間、金額、方式與編號，經官方聯絡頁用註冊電郵聯繫 GGLBET 客服。若付款端顯示成功但 GGLBET 未入帳，請明確說明以便開始對帳。",
      ),
    },
    {
      question: L(
        "Are there fees on GGLBET deposits or withdrawals?",
        "GGLBET 存提款有手續費嗎？",
      ),
      answer: L(
        "Any fee charged by GGLBET itself is shown in the cashier before you confirm. Banks, card issuers, e-wallet providers, and networks may apply their own charges or FX spreads that GGLBET does not set. Treat the live cashier on gglbet5.com as the place where platform-side fees are disclosed for your session. Ask support before confirming large transfers if a fee line looks unclear.",
        "任何由 GGLBET 本身收取的費用，會在確認前顯示於出納。銀行、發卡行、電子錢包業者與網路可能另收費用或匯差，非 GGLBET 訂定。請以 gglbet5.com 即時出納作為你工作階段揭露平台端費用的地方。若費用列不清，請在確認大額轉帳前先詢問客服。",
      ),
    },
    {
      question: L(
        "How long do GGLBET withdrawals usually take?",
        "GGLBET 出款通常需要多久？",
      ),
      answer: L(
        "Expect two layers: GGLBET approval time, then the external rail’s processing window. E-wallet style payouts often move faster after approval than card or bank timelines, but receiving institutions still set their own clocks. Incomplete KYC or open wagering extends the approval layer. Use the cashier estimate as planning guidance, not a guarantee, and avoid resubmitting before the upper end of the stated window.",
        "請預期兩層：GGLBET 核准時間，接著是外部通道處理時段。核准後電子錢包風格出款通常比卡片或銀行時程更快，但收款機構仍有自己的時鐘。KYC 未完成或流水未結束會延長核准層。請把出納估算當規劃指引而非保證，並在所述時段上限前避免重新送出。",
      ),
    },
    {
      question: L(
        "Can I withdraw to a different method than I deposited with?",
        "可以出款到與存款不同的方式嗎？",
      ),
      answer: L(
        "Many platforms, GGLBET included in documented guidance, prefer returning funds to the original deposit source up to the deposited amount for anti-fraud reasons. When that policy applies, choosing a different destination can trigger extra review or a decline until matching is satisfied. Check the withdrawal section of your live cashier for the options actually offered to your account, and ask support if you need to understand a specific restriction.",
        "許多平台——GGLBET 文件指引亦然——基於防詐考量，傾向在已存金額範圍內將資金退回原存款來源。當該政策適用時，選擇不同收款端可能觸發額外審核或拒絕，直到相符條件滿足。請在即時出納的出款區查看帳號實際提供的選項；若需理解特定限制，請詢問客服。",
      ),
    },
    {
      question: L(
        "How do I keep GGLBET payment details secure?",
        "如何保護 GGLBET 支付資料安全？",
      ),
      answer: L(
        "Bookmark official GGLBET and gglbet5.com URLs, fund only through the signed-in cashier, and never share OTPs or passwords with anyone who contacts you first. Ignore “agent deposit” offers and lookalike pages that appear in ads or chats. If you suspect a phishing attempt, change your password from a known-good session, review recent cashier activity, and contact official support. Pair payment security with responsible-gaming limits so funding stays intentional.",
        "將官方 GGLBET 與 gglbet5.com 網址加入書籤，只經已登入出納入金，且絕不把 OTP 或密碼分享給先聯絡你的人。忽略「代理存款」提議與出現在廣告或聊天中的仿站。若懷疑釣魚，請從已知安全的工作階段更改密碼、檢查近期出納活動，並聯絡官方客服。支付安全請搭配負責任博彩上限，讓入金保持有意識。",
      ),
    },
  ],
  finalCta: {
    eyebrow: L("Next step", "下一步"),
    heading: L(
      "Ready to use the GGLBET cashier with clearer expectations?",
      "準備好以更清楚的預期使用 GGLBET 出納了嗎？",
    ),
    subheading: L(
      "Log in, confirm live methods, or get help",
      "登入、確認即時方式，或取得協助",
    ),
    body: L(
      "Open your signed-in GGLBET session to see today’s deposit and withdrawal options, review responsible-gaming limits before you fund play, or contact support if a transfer needs reconciliation.",
      "開啟已登入的 GGLBET 工作階段查看今天的存提選項，入金前複核負責任博彩上限，或在需要對帳時聯絡客服。",
    ),
    mediaSrc: HUB_MEDIA.paymentCta,
    mediaAlt: L("GGLBET payment next steps", "GGLBET 支付下一步"),
    ctas: [
      { label: L("Log in to GGLBET", "登入 GGLBET") as unknown as string, href: ROUTES.login, variant: "primary" },
      { label: L("Register on GGLBET", "註冊 GGLBET") as unknown as string, href: ROUTES.register, variant: "outline" },
      { label: L("GGLBET FAQ", "GGLBET 常見問題") as unknown as string, href: ROUTES.faq, variant: "secondary" },
      { label: L("Contact GGLBET", "聯絡 GGLBET") as unknown as string, href: ROUTES.contact, variant: "soft" },
    ],
  },
});
