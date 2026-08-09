import { L } from "@/lib/i18n";
import type { TrustPageBlock } from "@/types/eeat";
import { HUB_MEDIA, ROUTES, createTrustPage } from "./factory";

export const downloadTrustPage = createTrustPage({
  slug: "download",
  title: L("Download the GGLBET App", "下載 GGLBET 應用"),
  metaTitle: L(
    "Download GGLBET | Android, iOS & Safe Install Guide",
    "下載 GGLBET｜Android、iOS 與安全安裝指南",
  ),
  metaDescription: L(
    "Download GGLBET safely for Malaysia players: official Android and iOS paths, installation steps, updates, permissions, troubleshooting, and when to use mobile web instead. Confirm live download details after GGLBET login.",
    "馬來西亞玩家如何安全下載 GGLBET：官方 Android 與 iOS 路徑、安裝步驟、更新、權限、疑難排解，以及何時改用行動網頁。請於登入 GGLBET 後確認即時下載細節。",
  ),
  heroEyebrow: L("GGLBET Support · Download", "GGLBET 支援 · 下載"),
  heroTitle: L(
    "Download GGLBET from official sources only",
    "只從官方來源下載 GGLBET",
  ),
  heroDescription: L(
    "Install the GGLBET mobile experience with clear Android and iOS notes, safer permissions habits, update guidance, and troubleshooting—then sign in with the same account you use on the web.",
    "依清楚的 Android 與 iOS 備註安裝 GGLBET 行動體驗，搭配較安全的權限習慣、更新指引與疑難排解——接著以與網頁相同的帳號登入。",
  ),
  heroImageSrc: HUB_MEDIA.download,
  lastUpdated: "2026-08-08",
  authorSlug: "gglbet-editorial",
  reviewerSlug: "gglbet-trust-desk",
  schemaType: "WebPage",
  summaryCards: [
    {
      title: L("GGLBET Android path", "GGLBET Android 路徑"),
      description: L(
        "When an official APK is offered, download only from GGLBET or gglbet5.com links, allow install for that source, then sign in.",
        "當提供官方 APK 時，只從 GGLBET 或 gglbet5.com 連結下載，為該來源允許安裝，然後登入。",
      ),
    },
    {
      title: L("GGLBET iOS notes", "GGLBET iOS 備註"),
      description: L(
        "Follow the current official iOS instructions on the download page. Avoid stranger profiles, IPA blogs, and random TestFlight links.",
        "遵循下載頁現行官方 iOS 說明。避免陌生人描述檔、IPA 部落格與隨機 TestFlight 連結。",
      ),
    },
    {
      title: L("Installation checklist", "安裝檢查清單"),
      description: L(
        "Free storage, a supported OS version, a stable connection, and an official starting URL keep installs predictable.",
        "足夠儲存空間、受支援的系統版本、穩定連線與官方起始網址，讓安裝更可預期。",
      ),
    },
    {
      title: L("Updates that matter", "重要的更新"),
      description: L(
        "Keep GGLBET current for security fixes and login compatibility. Return to official update paths—not random APK sites.",
        "保持 GGLBET 最新以取得安全性修正與登入相容。回到官方更新路徑——而非隨意 APK 站。",
      ),
    },
    {
      title: L("Troubleshooting installs", "安裝疑難排解"),
      description: L(
        "Storage, OS blocks, corrupted downloads, and unofficial packages cause most failures. Re-download officially before trying risky mirrors.",
        "儲存空間、系統阻擋、損壞下載與非官方套件造成多數失敗。在嘗試高風險鏡像前，先從官方重新下載。",
      ),
    },
    {
      title: L("Same GGLBET account", "同一 GGLBET 帳號"),
      description: L(
        "Mobile and web share verification, balance, and responsible-gaming limits after you log in with the same credentials.",
        "使用相同憑證登入後，手機與網頁共享驗證、餘額與負責任博彩上限。",
      ),
    },
  ],
  blocks: [
    {
      type: "tldr",
      id: "tldr",
      text: L(
        "Download GGLBET only from this official hub or links that clearly originate on gglbet5.com. Android may use an official installer package; iOS follows the current official notes published for Apple devices. After install, sign in with your existing GGLBET account so limits and verification carry over. If you cannot validate a package, use the mobile browser experience until you can.",
        "請只從此官方中心，或明確來自 gglbet5.com 的連結下載 GGLBET。Android 可能使用官方安裝套件；iOS 則遵循為 Apple 裝置公布的現行官方備註。安裝後以既有 GGLBET 帳號登入，上限與驗證才會延續。若無法驗證套件，請先用行動瀏覽器體驗，直到可以驗證為止。",
      ),
    },
    {
      type: "definition",
      id: "definition",
      term: L("Official GGLBET build", "官方 GGLBET 版本"),
      text: L(
        "An official build is an application package or published access path distributed by GGLBET through this download page, an approved store listing when available, or another route documented on gglbet5.com. Packages from forums, chat attachments, or “modded APK” sites are not supported and are a common credential-theft vector.",
        "官方版本是 GGLBET 經本下載頁、可用時的核准商店上架，或 gglbet5.com 記錄的其他路徑所發行的應用套件或存取方式。來自論壇、聊天附件或「改版 APK」站的套件不受支援，且是常見憑證盜取途徑。",
      ),
    },
    {
      type: "heading",
      id: "why-official",
      text: L(
        "Why official GGLBET download links matter",
        "為何官方 GGLBET 下載連結很重要",
      ),
      anchor: "why-official",
    },
    {
      type: "paragraph",
      id: "why-1",
      text: L(
        "Malaysia players searching for GGLBET download, GGLBET app, or APK install guides often meet lookalike pages in ads and chat groups. Repackaged gambling apps can overlay fake login screens, steal one-time passwords, or silently exfiltrate session tokens while still using familiar branding. The safest habit is simple: type or bookmark the official GGLBET domain yourself, open the download section after you trust the page, and ignore files people send you unsolicited. A cheaper or “unlocked” APK is not a shortcut; it is a compromise of your account and payment methods.",
        "搜尋 GGLBET 下載、GGLBET 應用或 APK 安裝指南的馬來西亞玩家，常在廣告與聊天群遇到仿站。重新包裝的博彩應用可能疊加假登入畫面、盜取一次性密碼，或在仍使用熟悉品牌的情況下悄悄竊取工作階段權杖。最安全的習慣很簡單：自行輸入或書籤官方 GGLBET 網域、在信任頁面後開啟下載區，並忽略別人主動寄來的檔案。更便宜或「解鎖」APK 不是捷徑，而是對帳號與支付方式的妥協。",
      ),
    },
    {
      type: "paragraph",
      id: "why-2",
      text: L(
        "GGLBET login and register flows are the same account whether you arrive from mobile web or an installed experience. Nothing about your balance or responsible-gaming limits should require a second profile. If an installer asks you to create a “special mobile-only” account through an unfamiliar form, stop and return to the official download page. Confirm live install instructions inside your signed-in session or on gglbet5.com whenever distribution notes change with platform policy.",
        "無論你從行動網頁或已安裝體驗進入，GGLBET 登入與註冊流程都是同一帳號。餘額或負責任博彩上限不應需要第二組資料。若安裝程式要求你透過陌生表單建立「手機專用」帳號，請停止並回到官方下載頁。每當發行備註隨平台政策變化時，請在已登入工作階段或 gglbet5.com 確認即時安裝說明。",
      ),
    },
    {
      type: "heading",
      id: "requirements",
      text: L("Device requirements before you install", "安裝前的裝置需求"),
      anchor: "requirements",
    },
    {
      type: "checklist",
      id: "requirements-list",
      title: L("GGLBET install readiness checklist", "GGLBET 安裝就緒檢查清單"),
      items: [
        L(
          "A currently supported version of Android or iOS.",
          "目前受支援的 Android 或 iOS 版本。",
        ),
        L(
          "Enough free storage for the app package and cache.",
          "足夠的應用套件與快取儲存空間。",
        ),
        L(
          "A stable connection—live casino streams need consistent bandwidth.",
          "穩定連線——真人娛樂串流需要持續頻寬。",
        ),
        L(
          "An existing GGLBET account, or a few minutes to register one officially.",
          "既有 GGLBET 帳號，或幾分鐘經官方註冊一個。",
        ),
        L(
          "A bookmarked official download URL so ads cannot redirect you.",
          "書籤中的官方下載網址，避免廣告導向。",
        ),
      ],
    },
    {
      type: "heading",
      id: "android",
      text: L("GGLBET Android download and install", "GGLBET Android 下載與安裝"),
      anchor: "android",
    },
    {
      type: "paragraph",
      id: "android-1",
      text: L(
        "For Android, GGLBET may distribute an official installer package through the download page when store listing routes differ by region. That model is common for real-money gaming apps and is not by itself a warning sign—provided the file comes from GGLBET or gglbet5.com. Download the package, open it, and allow install permission for that specific source if Android prompts you. After installation, review whether you can narrow or revoke broad unknown-source permissions in system settings.",
        "在 Android 上，當商店上架路徑因地區而異時，GGLBET 可能經下載頁提供官方安裝套件。對真錢遊戲應用而言這很常見，本身不是警訊——前提是檔案來自 GGLBET 或 gglbet5.com。下載套件並開啟；若 Android 提示，僅為該特定來源允許安裝權限。安裝後，請在系統設定檢視能否縮小或收回過寬的未知來源權限。",
      ),
    },
    {
      type: "steps",
      id: "android-steps",
      title: L("Android install steps", "Android 安裝步驟"),
      steps: [
        {
          title: L("Start on an official GGLBET page", "從官方 GGLBET 頁開始"),
          text: L(
            "Type or open your bookmark. Do not tap download links from SMS, ads, or chat attachments.",
            "輸入或開啟書籤。勿點簡訊、廣告或聊天附件中的下載連結。",
          ),
        },
        {
          title: L("Fetch the official package", "取得官方套件"),
          text: L(
            "Use the Android control on the GGLBET download page or the signed-in product download entry.",
            "使用 GGLBET 下載頁的 Android 控制項，或已登入產品中的下載入口。",
          ),
        },
        {
          title: L("Allow install for that source only", "僅為該來源允許安裝"),
          text: L(
            "Grant the prompt for the browser or file manager you used, then return to complete installation.",
            "為你使用的瀏覽器或檔案管理員授予提示，再返回完成安裝。",
          ),
        },
        {
          title: L("Sign in and confirm limits", "登入並確認上限"),
          text: L(
            "Open GGLBET, log in with your web credentials, and verify deposit limits look correct.",
            "開啟 GGLBET，以網頁憑證登入，並確認存款上限看起來正確。",
          ),
        },
      ],
    },
    {
      type: "heading",
      id: "ios",
      text: L("GGLBET iOS access notes", "GGLBET iOS 存取備註"),
      anchor: "ios",
    },
    {
      type: "paragraph",
      id: "ios-1",
      text: L(
        "iOS access notes on the GGLBET download page explain how Apple device users reach the official experience. Depending on current Apple policy and what GGLBET publishes, that may involve a store listing, a guided web flow, or adding the mobile site to the home screen. Always follow the instructions shown today on the official download page or gglbet5.com rather than third-party “iOS IPA” blogs. Do not trust configuration profiles or enterprise certificates pushed by strangers—those are a frequent malware path.",
        "GGLBET 下載頁的 iOS 存取備註說明 Apple 裝置使用者如何到達官方體驗。依現行 Apple 政策與 GGLBET 公布內容，可能涉及商店上架、導引式網頁流程，或把行動網站加入主畫面。請一律遵循官方下載頁或 gglbet5.com 今天顯示的說明，而非第三方「iOS IPA」部落格。勿信任陌生人推播的組態描述檔或企業憑證——那是常見惡意路徑。",
      ),
    },
    {
      type: "paragraph",
      id: "ios-2",
      text: L(
        "If an official iOS route is temporarily unavailable in your region, use Safari on the mobile GGLBET site until the documented path returns. After first launch, sign in with the same account you use on the web so verification status and responsible-gaming limits remain consistent. GGLBET will never ask you to install from a random TestFlight link sent by message to “unlock” a withdrawal.",
        "若你所在地區暫時沒有官方 iOS 路徑，請用 Safari 開啟行動版 GGLBET，直到文件路徑恢復。首次啟動後，以與網頁相同的帳號登入，驗證狀態與負責任博彩上限才會一致。GGLBET 絕不會要求你安裝陌生人訊息送來的隨機 TestFlight 連結來「解鎖」出款。",
      ),
    },
    {
      type: "heading",
      id: "updates",
      text: L("Keeping the GGLBET app updated", "保持 GGLBET 應用更新"),
      anchor: "updates",
    },
    {
      type: "paragraph",
      id: "updates-1",
      text: L(
        "Updates carry security fixes, login compatibility changes, and catalog improvements. If you installed from an official store listing, use that store’s update mechanism and leave auto-update on when possible. If you installed an official Android package from the GGLBET download page, return to that same official page or an in-app update prompt rather than searching random APK sites for a newer file. Outdated builds are a common cause of playback errors and failed logins that look like account problems.",
        "更新帶來安全性修正、登入相容變更與目錄改善。若從官方商店安裝，請用該商店更新機制，並盡可能開啟自動更新。若從 GGLBET 下載頁的官方 Android 套件安裝，請回到同一官方頁或應用內更新提示，而非在隨意 APK 站尋找較新檔案。過期版本常造成播放錯誤與登入失敗，看起來像帳號問題。",
      ),
    },
    {
      type: "callout",
      id: "mirror-warning",
      variant: "warning",
      title: L("Never install from unofficial mirrors", "切勿從非官方鏡像安裝"),
      body: L(
        "If a download link cannot be traced to GGLBET or gglbet5.com, delete the file. Repackaged apps are a leading way attackers steal online casino login credentials.",
        "若下載連結無法追溯至 GGLBET 或 gglbet5.com，請刪除檔案。重新包裝的應用是攻擊者盜取線上娛樂城登入憑證的主要方式之一。",
      ),
    },
    {
      type: "heading",
      id: "troubleshooting",
      text: L("Troubleshooting GGLBET install problems", "GGLBET 安裝問題疑難排解"),
      anchor: "troubleshooting",
    },
    {
      type: "paragraph",
      id: "trouble-1",
      text: L(
        "Common blockers include insufficient storage, an unsupported operating system version, a security setting preventing installs from the chosen source, or a corrupted download that did not come from the official link. Free space, update your OS if possible, re-download from the official download page, and retry. On Android, confirm you allowed install permission only for the official source. On iOS, follow current official notes rather than risky third-party workarounds.",
        "常見阻擋包括儲存空間不足、作業系統版本不受支援、安全性設定阻止所選來源安裝，或並非來自官方連結的損壞下載。請釋放空間、在可能時更新系統、從官方下載頁重新下載後再試。Android 上請確認僅為官方來源允許安裝權限。iOS 請遵循現行官方備註，而非高風險第三方變通。",
      ),
    },
    {
      type: "comparison",
      id: "app-vs-web",
      caption: L("GGLBET app versus mobile web", "GGLBET 應用與行動網頁"),
      headers: [
        L("Capability", "能力"),
        L("Installed app path", "已安裝應用路徑"),
        L("Mobile web", "行動網頁"),
      ],
      rows: [
        [
          L("Full catalog access", "完整目錄存取"),
          L("Yes after official install", "官方安裝後可用"),
          L("Yes in modern browsers", "現代瀏覽器可用"),
        ],
        [
          L("Update habit", "更新習慣"),
          L("Store or official package updates", "商店或官方套件更新"),
          L("Always current page", "頁面始終最新"),
        ],
        [
          L("When validation is unclear", "驗證不清時"),
          L("Pause install", "暫停安裝"),
          L("Prefer web until sure", "確定前優先用網頁"),
        ],
        [
          L("Same account limits", "同一帳號上限"),
          L("Yes after login", "登入後相同"),
          L("Yes after login", "登入後相同"),
        ],
      ],
    },
    {
      type: "callout",
      id: "permissions-tip",
      variant: "tip",
      title: L("Review permissions deliberately", "有意識地檢視權限"),
      body: L(
        "Grant what the official install flow explains. Treat unexpected SMS, accessibility, or remote-control permission requests as a reason to uninstall and return to an official GGLBET source.",
        "只授予官方安裝流程有說明的項目。把意外的簡訊、輔助使用或遠端控制權限請求，視為卸載並回到官方 GGLBET 來源的理由。",
      ),
    },
    {
      type: "heading",
      id: "after-install",
      text: L(
        "After install: login, limits, and first session habits",
        "安裝後：登入、上限與首場習慣",
      ),
      anchor: "after-install",
    },
    {
      type: "paragraph",
      id: "after-1",
      text: L(
        "The first GGLBET mobile session should verify three things before you chase a game: the login screen matches the real brand, your responsible-gaming deposit limit still reads as expected, and the cashier opens from the same account you use on desktop. Malaysia players who download during a promotion rush sometimes skip that check and only notice a mismatch later. Take thirty seconds. If anything looks off—unexpected overlays, unfamiliar permission prompts, or a login form that appeared before the real app finished launching—uninstall and return to the official download page.",
        "第一次 GGLBET 手機場次在追遊戲前，應先確認三件事：登入畫面符合真正品牌、負責任博彩存款上限仍如預期，以及出納來自你在桌面使用的同一帳號。在優惠熱潮中下載的馬來西亞玩家有時會跳過檢查，稍後才發現不符。請花三十秒。若有任何不妥——意外覆蓋層、陌生權限提示，或真正應用尚未啟動完成就出現的登入表單——請卸載並回到官方下載頁。",
      ),
    },
    {
      type: "paragraph",
      id: "after-2",
      text: L(
        "Notifications are optional for many players. Accept them only if you want account or product alerts; declining should not block catalog access on a genuine GGLBET build. Keep automatic updates enabled when your install path supports them, and bookmark this download hub so reinstalls never start from a search ad. When live casino streams stutter, check bandwidth before blaming the package—mobile web and the app both need a stable connection. Pair the download habit with payment security: never approve wallet or bank requests that did not originate from your own signed-in cashier session.",
        "對許多玩家而言通知是選擇性的。只有在你想要帳號或產品提醒時才接受；在真正的 GGLBET 版本上，拒絕不應阻擋目錄存取。當安裝路徑支援時請開啟自動更新，並將此下載中心加入書籤，讓重裝永不從搜尋廣告開始。真人娛樂串流卡頓時，先檢查頻寬再怪罪套件——行動網頁與應用都需要穩定連線。請把下載習慣與支付安全搭配：切勿核准並非來自你本人已登入出納工作階段的錢包或銀行請求。",
      ),
    },
    {
      type: "paragraph",
      id: "after-3",
      text: L(
        "If you manage a shared household device, protect GGLBET login the same way you protect banking apps: use your own credentials, lock the phone, and do not leave the session open unattended. Teaching a relative to install from the official page is helpful; forwarding an APK file in a family chat is not. When distribution notes change because of platform policy, trust the live instructions on gglbet5.com or inside your signed-in product over screenshots saved months earlier.",
        "若你管理共用家用裝置，請像保護銀行 App 一樣保護 GGLBET 登入：使用自己的憑證、鎖定手機，且勿讓工作階段無人看管。教親戚從官方頁安裝是有幫助的；在家庭聊天轉傳 APK 則不是。當發行備註因平台政策改變時，請相信 gglbet5.com 或已登入產品中的即時說明，而非數月前保存的截圖。",
      ),
    },
    {
      type: "paragraph",
      id: "closing",
      text: L(
        "Treat this GGLBET download page as your install playbook, then confirm any live button labels or platform notes inside the signed-in product or on gglbet5.com. After you are in, revisit payment and responsible-gaming hubs so cashier and safer-play settings match how you intend to use the mobile experience. Official sources, deliberate permissions, and the same account everywhere keep Malaysia download intent from turning into an avoidable security incident.",
        "把本 GGLBET 下載頁當作安裝劇本，接著在已登入產品或 gglbet5.com 確認任何即時按鈕文案或平台備註。進入後請回到支付與負責任博彩中心，讓出納與較安全遊玩設定符合你使用行動體驗的方式。官方來源、有意識的權限，以及到處使用同一帳號，能避免馬來西亞下載意圖變成可避免的資安事件。",
      ),
    },
  ] as unknown as TrustPageBlock[],
  visualSections: [
    {
      id: "visual-android",
      eyebrow: L("Android", "Android"),
      heading: L(
        "Install GGLBET on Android from official links",
        "從官方連結在 Android 安裝 GGLBET",
      ),
      subheading: L(
        "Package, permission, then sign-in",
        "套件、權限，然後登入",
      ),
      body: L(
        "Download the official Android package only from GGLBET or gglbet5.com, allow install for that source, open the app, and sign in with your existing account so verification and deposit limits carry over.",
        "只從 GGLBET 或 gglbet5.com 下載官方 Android 套件，為該來源允許安裝，開啟應用，並以既有帳號登入，讓驗證與存款上限延續。",
      ),
      mediaSrc: HUB_MEDIA.android,
      mediaAlt: L("GGLBET Android download visual", "GGLBET Android 下載視覺"),
      points: [
        {
          title: L("Official file only", "只用官方檔"),
          body: L(
            "Ignore chat APKs and “modded” mirrors.",
            "忽略聊天 APK 與「改版」鏡像。",
          ),
        },
        {
          title: L("Narrow permissions", "縮小權限"),
          body: L(
            "Review unknown-source access after install.",
            "安裝後檢視未知來源存取。",
          ),
        },
      ],
      ctas: [
        { label: L("Log in to GGLBET", "登入 GGLBET") as unknown as string, href: ROUTES.login, variant: "primary" },
        { label: L("Register on GGLBET", "註冊 GGLBET") as unknown as string, href: ROUTES.register, variant: "outline" },
      ],
    },
    {
      id: "visual-ios",
      eyebrow: L("iOS", "iOS"),
      heading: L(
        "Follow current GGLBET iOS instructions",
        "遵循現行 GGLBET iOS 說明",
      ),
      subheading: L(
        "No stranger profiles or IPA blogs",
        "沒有陌生人描述檔或 IPA 部落格",
      ),
      body: L(
        "Apple device users should use the official notes on this download page or gglbet5.com. If a native path is unavailable, Safari on the mobile GGLBET site remains a valid way to play while you wait for documented options.",
        "Apple 裝置使用者應使用本下載頁或 gglbet5.com 的官方備註。若原生路徑不可用，等待文件選項期間，Safari 開啟行動版 GGLBET 仍是有效遊玩方式。",
      ),
      mediaSrc: HUB_MEDIA.ios,
      mediaAlt: L("GGLBET iOS access visual", "GGLBET iOS 存取視覺"),
      flip: true,
      points: [
        {
          title: L("Official notes win", "官方備註優先"),
          body: L(
            "Platform policy can change published steps.",
            "平台政策可能改變已公布步驟。",
          ),
        },
        {
          title: L("Same credentials", "相同憑證"),
          body: L(
            "Web and mobile share one GGLBET account.",
            "網頁與手機共享一個 GGLBET 帳號。",
          ),
        },
      ],
    },
    {
      id: "visual-install",
      eyebrow: L("Installation", "安裝"),
      heading: L(
        "A calm GGLBET installation sequence",
        "平靜的 GGLBET 安裝順序",
      ),
      subheading: L(
        "Storage, OS, official URL, then launch",
        "儲存、系統、官方網址，然後啟動",
      ),
      body: L(
        "Free space, confirm your OS is supported, start from a bookmarked official URL, complete the platform-specific steps, and only then enter your GGLBET password on a screen that matches the real brand experience.",
        "釋放空間、確認系統受支援、從書籤官方網址開始、完成平台專屬步驟，然後才在符合真正品牌體驗的畫面上輸入 GGLBET 密碼。",
      ),
      mediaSrc: HUB_MEDIA.install,
      mediaAlt: L("GGLBET installation visual", "GGLBET 安裝視覺"),
      points: [
        {
          title: L("Validate branding", "驗證品牌"),
          body: L(
            "Fake overlays often appear before real login.",
            "假覆蓋層常出現在真正登入前。",
          ),
        },
        {
          title: L("Keep a web fallback", "保留網頁備援"),
          body: L(
            "Mobile web works while you troubleshoot installs.",
            "排查安裝時仍可用行動網頁。",
          ),
        },
      ],
    },
    {
      id: "visual-download-hub",
      eyebrow: L("Download hub", "下載中心"),
      heading: L(
        "Return here for safe GGLBET updates",
        "回到此處安全更新 GGLBET",
      ),
      subheading: L(
        "Official sources beat search ads",
        "官方來源勝過搜尋廣告",
      ),
      body: L(
        "Bookmark this GGLBET download hub so future updates and reinstalls start from a known-good page. Pair the app with payment and responsible-gaming settings once you are signed in.",
        "將此 GGLBET 下載中心加入書籤，讓未來更新與重裝從已知安全的頁面開始。登入後請把應用與支付、負責任博彩設定搭配使用。",
      ),
      mediaSrc: HUB_MEDIA.downloadUpdate,
      mediaAlt: L("GGLBET download hub visual", "GGLBET 下載中心視覺"),
      flip: true,
      ctas: [
        { label: L("GGLBET FAQ", "GGLBET 常見問題") as unknown as string, href: ROUTES.faq, variant: "secondary" },
        { label: L("GGLBET Payment methods", "GGLBET 支付方式") as unknown as string, href: ROUTES.payment, variant: "outline" },
      ],
    },
  ],
  faqHeading: L(
    "GGLBET download FAQ for Malaysia players",
    "給馬來西亞玩家的 GGLBET 下載常見問題",
  ),
  faqSubheading: L(
    "Android, iOS, updates, permissions, and troubleshooting",
    "Android、iOS、更新、權限與疑難排解",
  ),
  faqBody: L(
    "Use these answers to install GGLBET safely. Confirm any live download controls inside your signed-in session or on gglbet5.com.",
    "用這些回答安全安裝 GGLBET。請在已登入工作階段或 gglbet5.com 確認任何即時下載控制項。",
  ),
  faq: [
    {
      question: L(
        "How do I download GGLBET safely in Malaysia?",
        "在馬來西亞如何安全下載 GGLBET？",
      ),
      answer: L(
        "Start from the official GGLBET download page or a link that clearly originates on gglbet5.com. Avoid ads, chat attachments, and search results that push unknown APK hosts. After install, confirm you land on the real GGLBET login experience before entering passwords. If provenance is unclear, use mobile web until you can verify an official package.",
        "從官方 GGLBET 下載頁，或明確來自 gglbet5.com 的連結開始。避免廣告、聊天附件，以及導向未知 APK 主機的搜尋結果。安裝後，確認進入真正的 GGLBET 登入體驗再輸入密碼。若來源不清，請先用行動網頁，直到能驗證官方套件。",
      ),
    },
    {
      question: L(
        "How do I install the GGLBET Android APK?",
        "如何安裝 GGLBET Android APK？",
      ),
      answer: L(
        "Download the official package only from the GGLBET download page or gglbet5.com, open it, and allow install permission for that source if Android prompts you. Sign in with your existing account so verification and limits carry over. Free storage first. If Android refuses the package, note the error and contact support rather than downloading a “fixed” APK from a forum.",
        "只從 GGLBET 下載頁或 gglbet5.com 下載官方套件並開啟；若 Android 提示，僅為該來源允許安裝權限。以既有帳號登入，驗證與上限才會延續。請先釋放儲存空間。若 Android 拒絕套件，請記下錯誤並聯絡客服，勿從論壇下載「已修復」APK。",
      ),
    },
    {
      question: L(
        "What should iOS users know about GGLBET download?",
        "iOS 使用者下載 GGLBET 需注意什麼？",
      ),
      answer: L(
        "Follow the current official iOS notes on the GGLBET download page or gglbet5.com. Do not trust stranger profiles, enterprise certificates, or IPA blogs. If an official route is temporarily unavailable, use Safari on the mobile GGLBET site. After launch, sign in with the same web account so limits stay consistent.",
        "遵循 GGLBET 下載頁或 gglbet5.com 的現行官方 iOS 備註。勿信任陌生人描述檔、企業憑證或 IPA 部落格。若官方路徑暫時不可用，請用 Safari 開啟行動版 GGLBET。啟動後以與網頁相同的帳號登入，上限才會一致。",
      ),
    },
    {
      question: L(
        "Why must I use official GGLBET download links only?",
        "為什麼只能使用官方 GGLBET 下載連結？",
      ),
      answer: L(
        "Unofficial mirrors can inject credential-stealing code or fake login overlays while still looking like GGLBET. Official builds receive security updates; pirate builds usually do not. If a friend sends an APK, delete it and fetch a fresh copy from GGLBET yourself. Bookmark the official URL so search ads cannot redirect you to clones.",
        "非官方鏡像可能植入盜取憑證的程式或假登入覆蓋層，卻仍看起來像 GGLBET。官方版本會收到安全性更新；盜版通常不會。若朋友傳來 APK，請刪除並自行從 GGLBET 重新取得。將官方網址加入書籤，避免搜尋廣告導向仿站。",
      ),
    },
    {
      question: L(
        "What permissions does the GGLBET app request?",
        "GGLBET 應用會要求哪些權限？",
      ),
      answer: L(
        "Expect permissions needed for install, cache, optional notifications, and network features used for secure login and live streams. Grant only what the official flow explains. If a sideloaded package demands aggressive accessibility or SMS permissions unrelated to play, uninstall it and reinstall from an official link. Legitimate support will not ask for remote-control permissions to “verify” the app.",
        "預期會有安裝、快取、選擇性通知，以及安全登入與串流所需的網路相關權限。只授予官方流程有說明的項目。若側載套件要求與遊玩無關的激烈輔助使用或簡訊權限，請卸載並從官方連結重裝。合法客服不會要求遠端控制權限來「驗證」應用。",
      ),
    },
    {
      question: L(
        "How do I log in to GGLBET after installing?",
        "安裝後如何登入 GGLBET？",
      ),
      answer: L(
        "Open the app and sign in with the same credentials you use on the website. There is no separate mobile-only account: verification, balance, and responsible-gaming limits follow the same profile. Confirm branding looks right before typing your password. Reset credentials only through official flows if login fails.",
        "開啟應用並以與網站相同的憑證登入。沒有獨立的手機專用帳號：驗證、餘額與負責任博彩上限跟隨同一資料。輸入密碼前請確認品牌看起來正確。若登入失敗，只經官方流程重設憑證。",
      ),
    },
    {
      question: L(
        "How do I update the GGLBET app?",
        "如何更新 GGLBET 應用？",
      ),
      answer: L(
        "Use the official store update path when you installed from a store listing. If you used an official Android package from the GGLBET download page, return to that page or an in-app prompt—never random APK sites. Know your login method before updating so a reinstall does not strand you. Updates should not require a second “helper” APK from chat.",
        "若從商店上架安裝，請用官方商店更新路徑。若使用 GGLBET 下載頁的官方 Android 套件，請回到該頁或應用內提示——絕非隨意 APK 站。更新前請確認登入方式，以免重裝後無法進入。更新不應要求聊天室傳來的第二個「助手」APK。",
      ),
    },
    {
      question: L(
        "How do I know my GGLBET install is secure?",
        "如何確認 GGLBET 安裝是安全的？",
      ),
      answer: L(
        "A secure install starts from an official link, matches GGLBET branding, and never asks for password sharing outside the login field. Review permissions and confirm deposit limits still match your safer-play choices. Be suspicious of overlays before login or unexpected accessibility requests. If anything feels off, uninstall, change your password from a known-good browser session on gglbet5.com, and contact support.",
        "安全安裝始於官方連結、符合 GGLBET 品牌，且除登入欄位外絕不要求分享密碼。檢視權限，並確認存款上限仍符合較安全遊玩選擇。對登入前的覆蓋層或意外輔助使用請求保持警覺。若有不妥，請卸載，從 gglbet5.com 已知安全的瀏覽器工作階段更改密碼，並聯絡客服。",
      ),
    },
    {
      question: L(
        "Can I play GGLBET without installing an app?",
        "不安裝應用也能玩 GGLBET 嗎？",
      ),
      answer: L(
        "Yes. The GGLBET mobile web experience runs in modern browsers and stays current without a separate update step. Use official URLs, sign in, and the same account limits apply. Some notification features may be limited compared with a native path, but catalog, cashier, and responsible-gaming tools remain available.",
        "可以。GGLBET 行動網頁可在現代瀏覽器運作，無需另一次更新即可保持最新。請使用官方網址登入，同一帳號上限同樣適用。部分通知功能可能不如原生路徑完整，但目錄、出納與負責任博彩工具仍可用。",
      ),
    },
    {
      question: L(
        "Why will my device not install GGLBET?",
        "為什麼裝置無法安裝 GGLBET？",
      ),
      answer: L(
        "Typical causes are low storage, unsupported OS versions, blocked install permissions, or a corrupted unofficial download. Free space, update the OS when possible, re-download from the official page, and retry. Do not “fix” failures by grabbing alternate APKs from search results. Mobile web remains available while you troubleshoot.",
        "典型原因是儲存空間不足、系統版本不受支援、安裝權限被擋，或非官方損壞下載。請釋放空間、在可能時更新系統、從官方頁重新下載後再試。勿用搜尋結果中的替代 APK「修復」失敗。排查期間仍可使用行動網頁。",
      ),
    },
    {
      question: L(
        "Does the GGLBET app keep my responsible-gaming limits?",
        "GGLBET 應用會保留我的負責任博彩上限嗎？",
      ),
      answer: L(
        "Yes. After you log in with the same credentials, deposit limits and related safer-play settings belong to the account, not to a specific device. Confirm the values on first launch. If numbers look wrong, adjust them in account settings and contact support if they do not match what you set on web.",
        "會。使用相同憑證登入後，存款上限與相關較安全遊玩設定屬於帳號，而非特定裝置。首次啟動時請確認數值。若數字不對，請在帳號設定調整；若與網頁設定不符，請聯絡客服。",
      ),
    },
    {
      question: L(
        "What should I do if GGLBET crashes after install?",
        "安裝後 GGLBET 崩潰該怎麼辦？",
      ),
      answer: L(
        "Confirm you installed the official build, update your OS and graphics-related system patches when available, clear cache if your device offers that for the app, and reinstall from the official download page once. Collect device model, OS version, and the exact error for GGLBET support. Avoid “optimizer” APKs that claim to fix crashes.",
        "確認安裝的是官方版本，在可用時更新系統與圖形相關修補，若裝置提供應用快取清除請清除，並從官方下載頁重裝一次。為 GGLBET 客服蒐集裝置型號、系統版本與確切錯誤。避免聲稱可修復崩潰的「優化」APK。",
      ),
    },
    {
      question: L(
        "Can someone else install GGLBET for me via chat?",
        "別人可以透過聊天幫我安裝 GGLBET 嗎？",
      ),
      answer: L(
        "Do not let strangers install packages on your phone or send you APKs “as a favour.” Even well-meaning friends should point you to the official GGLBET download page instead of forwarding files. You should complete the install yourself from a bookmarked official URL, then log in privately. This habit protects Malaysia players who are frequently targeted with lookalike casino installers.",
        "勿讓陌生人在你的手機上安裝套件，或「好心」寄來 APK。即使出於善意的朋友，也應導向官方 GGLBET 下載頁，而非轉傳檔案。你應自行從書籤官方網址完成安裝，再私下登入。此習慣可保護常被仿冒娛樂城安裝程式鎖定的馬來西亞玩家。",
      ),
    },
  ],
  finalCta: {
    eyebrow: L("Install with confidence", "放心安裝"),
    heading: L(
      "Ready to download GGLBET the official way?",
      "準備好用官方方式下載 GGLBET 了嗎？",
    ),
    subheading: L(
      "Log in, register, or review nearby support topics",
      "登入、註冊，或查看附近支援主題",
    ),
    body: L(
      "Use official links, complete platform-specific steps, then confirm your responsible-gaming limits after the first GGLBET login on mobile.",
      "使用官方連結、完成平台專屬步驟，然後在手機首次登入 GGLBET 後確認負責任博彩上限。",
    ),
    mediaSrc: HUB_MEDIA.downloadCta,
    mediaAlt: L("GGLBET download next steps", "GGLBET 下載下一步"),
    ctas: [
      { label: L("Register on GGLBET", "註冊 GGLBET") as unknown as string, href: ROUTES.register, variant: "primary" },
      { label: L("Log in to GGLBET", "登入 GGLBET") as unknown as string, href: ROUTES.login, variant: "outline" },
      { label: L("GGLBET Payment methods", "GGLBET 支付方式") as unknown as string, href: ROUTES.payment, variant: "secondary" },
      {
        label: L("Responsible gaming", "負責任博彩") as unknown as string,
        href: ROUTES.responsibleGaming,
        variant: "soft",
      },
    ],
  },
});
