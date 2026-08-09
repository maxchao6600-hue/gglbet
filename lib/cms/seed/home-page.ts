import { homeFaqItems } from "@/lib/cms/seed/faq/home-faq";
import {
  ROUTES,
  getGuideCategoryHref,
} from "@/constants/routes";
import { L } from "@/lib/i18n";
import type { HomePageContent } from "@/types/home";

/**
 * Bilingual homepage CMS seed. Locale resolution unwraps L() via toBilingualDoc.
 * Catalog cards (games, providers, promotions, news, guides) stay empty — page.tsx injects live CMS.
 */
export const homePageSeed = {
  seo: {
    title: L(
      "GGLBET Online Casino Malaysia — Slots, Login & Download",
      "GGLBET 馬來西亞線上娛樂城｜老虎機、登入與下載",
    ),
    description: L(
      "GGLBET is a Malaysia-focused online casino for slots, live tables, sports, fishing and lottery. Register, log in, download the app, deposit securely, and play with clear promotions and responsible-gaming tools.",
      "GGLBET 是面向馬來西亞玩家的線上娛樂城，涵蓋老虎機、真人娛樂、體育、捕魚與彩票。註冊、登入、下載 App、安全存款，並以清楚優惠與負責任博彩工具安心遊玩。",
    ),
    path: ROUTES.home,
  },
  hero: {
    brand: L("GGLBET", "GGLBET"),
    heading: L(
      "GGLBET Online Casino — Slots, Live Tables & Sports for Malaysia Players",
      "GGLBET 線上娛樂城｜老虎機、真人娛樂與體育投注",
    ),
    subheading: L(
      "One catalog for GGLBET login, register, and download — built so Malaysia players can move from intent to play without guesswork.",
      "整合 GGLBET 登入、註冊與下載路徑，讓馬來西亞玩家從需求到開玩更直觀、少繞路。",
    ),
    supporting: L(
      "Browse slots, live casino, sports betting, fishing games, and lottery with provider context, payment clarity, and safer-play guidance on every major journey.",
      "瀏覽老虎機、真人娛樂城、體育投注、捕魚與彩票，並在主要流程中提供遊戲商資訊、支付說明與負責任博彩指引。",
    ),
    media: {
      label: L(
        "GGLBET homepage hero atmosphere",
        "GGLBET 首頁主視覺氛圍",
      ),
      tone: "brand",
    },
    primaryCta: {
      label: L("Register", "立即註冊"),
      href: ROUTES.register,
      variant: "primary",
    },
    secondaryCta: {
      label: L("Log in", "會員登入"),
      href: ROUTES.login,
      variant: "outline",
    },
    tertiaryCta: {
      label: L("Download app", "下載 App"),
      href: ROUTES.download,
      variant: "ghost",
    },
    trustLine: L(
      "Adults 18+ · Encrypted account journeys · Documented payments · 24/7 support",
      "僅限 18 歲以上 · 加密帳號流程 · 支付方式說明清楚 · 全天候客服",
    ),
  },
  about: {
    id: "about-gglbet",
    eyebrow: L("About GGLBET", "關於 GGLBET"),
    heading: L(
      "About GGLBET: a clearer online casino for Malaysia",
      "關於 GGLBET：為馬來西亞玩家打造更清楚的線上娛樂城",
    ),
    subheading: L(
      "Catalog depth, payment honesty, and account journeys that respect your time",
      "館藏深度、支付資訊誠實，以及尊重時間成本的帳號流程",
    ),
    body: L(
      "GGLBET exists for players who compare login, registration, download options, and game quality before they commit — especially Malaysia audiences who want practical structure, not decorative slogans.",
      "GGLBET 服務那些會先比較登入、註冊、下載與遊戲品質再決定的玩家——特別是重視實用結構、而非裝飾性口號的馬來西亞觀眾。",
    ),
    media: {
      label: L("About GGLBET brand story", "GGLBET 品牌故事視覺"),
      tone: "brand",
    },
    ctas: [
      {
        label: L("About the company", "認識品牌"),
        href: ROUTES.about,
        variant: "soft",
      },
      {
        label: L("Contact GGLBET", "聯絡 GGLBET"),
        href: ROUTES.contact,
        variant: "ghost",
      },
    ],
    paragraphs: [
      L(
        "GGLBET started from a product belief: an online casino should be understandable before it is persuasive. People searching for GGLBET login help, GGLBET register steps, or GGLBET download instructions are usually finishing a task. Categories explain what you can play. Provider pages explain who builds the titles. Payment guidance explains how money moves. FAQ and support explain what to do when something is unclear.",
        "GGLBET 的起點是產品信念：線上娛樂城應先讓人看懂，再談說服。搜尋 GGLBET 登入、註冊或下載的人通常是在完成任務。分類說明能玩什麼，遊戲商頁說明誰製作遊戲，支付指引說明資金如何流動，FAQ 與客服則說明遇到不清楚狀況時該怎麼做。",
      ),
      L(
        "The catalog mirrors how Malaysia players actually shop experiences side by side. Slot games cover quick mobile sessions and longer feature-driven play. Live casino brings real-time tables and studio formats. Sports betting supports fans who follow leagues and markets. Fishing games and lottery serve arcade rhythm or draw-style outcomes. Instead of burying variety behind one banner, GGLBET gives each intent a clear path.",
        "館藏對應馬來西亞玩家真實的並排比較方式：老虎機涵蓋短局手機遊玩與較長特色玩法；真人娛樂城提供即時牌桌與工作室型式；體育投注服務關注聯賽與盤口的球迷；捕魚與彩票則對應街機節奏或開獎型結果。GGLBET 不以單一橫幅掩蓋多樣性，而是為每種意圖保留清楚路徑。",
      ),
      L(
        "Promotions are treated as decisions. An online casino bonus only helps when eligibility, timelines, and contribution rules are readable. Featured offers on this page are introductions; campaign pages carry formal terms. Security is operational: encrypted connections for register, login, deposit, and withdraw; multiple local-friendly payment rails; visible studios for fair-play context; and responsible gaming language before problems escalate.",
        "優惠被視為決策，而非裝飾。線上娛樂城獎金只有在資格、時程與流水規則可讀時才有幫助。本頁精選優惠是導讀，正式條款在活動詳情頁。安全是營運課題：註冊、登入、存款與取款使用加密連線；提供在地友善的多元支付；遊戲商可見以利公平性判斷；並在問題擴大前提供負責任博彩資訊。",
      ),
      L(
        "Using GGLBET follows a deliberate loop: register with accurate details, log in through official pages, explore categories that match your intent, read promotions carefully, fund through documented methods, and withdraw with verification readiness. Mobile players follow Android APK or iOS guidance on the download page. If you want a homepage that behaves like a map rather than a billboard, you are in the right place.",
        "使用 GGLBET 有清楚循環：以正確資料註冊、經官方頁面登入、依意圖探索分類、仔細閱讀優惠、以說明清楚的方式存款，並在驗證就緒後取款。手機玩家可在下載頁依 Android APK 或 iOS 指引操作。若你要的是像地圖而非看板的首頁，這裡就是正確位置。",
      ),
    ],
    points: [
      L(
        "Experience: task-based journeys for register, login, download, deposit, and withdraw",
        "體驗：註冊、登入、下載、存款與取款皆以任務導向流程設計",
      ),
      L(
        "Expertise: category education across slots, live casino, sports, fishing, and lottery",
        "專業：涵蓋老虎機、真人、體育、捕魚與彩票的分類教育",
      ),
      L(
        "Authoritativeness: consistent internal links to guides, news, VIP, and payments",
        "權威性：穩定內連至攻略、新聞、VIP 與支付說明",
      ),
      L(
        "Trustworthiness: responsible gaming, support access, and security-minded UX",
        "可信度：負責任博彩、客服入口與以安全為先的使用體驗",
      ),
    ],
  },
  whyChoose: {
    id: "why-choose-gglbet",
    eyebrow: L("Why Choose GGLBET", "為何選擇 GGLBET"),
    heading: L(
      "Why choose GGLBET for online casino play in Malaysia",
      "為何馬來西亞玩家選擇 GGLBET 線上娛樂城",
    ),
    subheading: L(
      "Clarity first — catalog quality, payment honesty, and safer-play guidance",
      "清楚優先——館藏品質、支付誠實與負責任博彩指引",
    ),
    body: L(
      "GGLBET focuses on helpful product information first: category context, provider trust signals, promotion pathways, and support resources. That makes GGLBET login, registration, and day-to-day browsing easier for new and returning Malaysia players.",
      "GGLBET 優先提供有用的產品資訊：分類脈絡、遊戲商信任訊號、優惠路徑與支援資源，讓馬來西亞新舊玩家在登入、註冊與日常瀏覽時更省力。",
    ),
    media: {
      label: L("Why choose GGLBET visual", "為何選擇 GGLBET 視覺"),
      tone: "secondary",
    },
    ctas: [
      {
        label: L("About GGLBET", "關於 GGLBET"),
        href: ROUTES.about,
        variant: "soft",
      },
    ],
    points: [
      {
        title: L("GGLBET game discovery", "GGLBET 遊戲探索"),
        body: L(
          "On GGLBET, slots, live casino, sports betting, fishing, and lottery are organized so you can compare formats quickly instead of scrolling anonymous thumbnails.",
          "在 GGLBET，老虎機、真人娛樂、體育投注、捕魚與彩票分門別類，讓你快速比較玩法，而不是在無名縮圖中盲目滑動。",
        ),
      },
      {
        title: L("Transparent GGLBET promotions", "透明的 GGLBET 優惠"),
        body: L(
          "GGLBET promotion pages emphasize eligibility cues and next steps. Homepage summaries introduce offers; campaign terms remain the source of truth.",
          "GGLBET 優惠頁強調資格提示與下一步動作。首頁摘要只作導讀，活動條款才是最終依據。",
        ),
      },
      {
        title: L("Secure GGLBET account journeys", "安全的 GGLBET 帳號流程"),
        body: L(
          "GGLBET register, login, deposit, and withdraw flows are documented with practical expectations so verification and payouts stay smoother later.",
          "GGLBET 註冊、登入、存款與取款流程附實用預期說明，讓後續驗證與出款更順暢。",
        ),
      },
      {
        title: L("Responsible play on GGLBET", "在 GGLBET 負責任遊玩"),
        body: L(
          "Safer-play education on GGLBET sits beside entertainment so adults can set healthier boundaries before a session stretches too far.",
          "GGLBET 在娛樂之外同步提供較安全遊玩教育，讓成年人在場次過長前就能設定更健康的界線。",
        ),
      },
    ],
  },
  gameCategories: {
    id: "game-categories",
    eyebrow: L("GGLBET Game Categories", "GGLBET 遊戲分類"),
    heading: L(
      "Browse GGLBET games by category",
      "依分類瀏覽 GGLBET 遊戲",
    ),
    subheading: L(
      "GGLBET slots, live casino, sports, fishing, and lottery in one catalog",
      "GGLBET 老虎機、真人娛樂、體育、捕魚與彩票一次到位",
    ),
    body: L(
      "GGLBET category pages help Malaysia players move from intent to action. Whether you want GGLBET slot games, live dealer tables, sports markets, fishing titles, or lottery draws, each path includes context before you commit.",
      "GGLBET 分類頁幫助馬來西亞玩家從意圖走到行動。無論你要 GGLBET 老虎機、真人荷官桌、體育盤口、捕魚或彩票開獎，每條路徑都會先提供脈絡再讓你投入。",
    ),
    media: {
      label: L("GGLBET game categories overview", "GGLBET 遊戲分類總覽"),
      tone: "brand",
    },
    ctas: [
      {
        label: L("Browse GGLBET games", "瀏覽 GGLBET 遊戲"),
        href: ROUTES.games,
        variant: "primary",
      },
    ],
    items: [
      {
        title: L("Slot Games", "老虎機"),
        body: L(
          "Feature-rich reels for short mobile sessions or longer feature hunts across popular GGLBET slot studios.",
          "適合短局手機遊玩或較長特色追逐的豐富轉輪，涵蓋 GGLBET 熱門老虎機廠商。",
        ),
        href: ROUTES.slots,
        media: { label: L("Slot games category", "老虎機分類"), tone: "brand" },
      },
      {
        title: L("Live Casino", "真人娛樂城"),
        body: L(
          "Real-time blackjack, roulette, baccarat, and studio shows with human-hosted pacing.",
          "即時二十一點、輪盤、百家樂與工作室節目，節奏由真人主持。",
        ),
        href: ROUTES.liveCasino,
        media: {
          label: L("Live casino category", "真人娛樂分類"),
          tone: "secondary",
        },
      },
      {
        title: L("Sports Betting", "體育投注"),
        body: L(
          "Pre-match and in-play markets with clear event navigation for league followers.",
          "賽前與滾球盤口，賽事導覽清楚，方便關注聯賽的球迷。",
        ),
        href: ROUTES.sports,
        media: {
          label: L("Sports betting category", "體育投注分類"),
          tone: "neutral",
        },
      },
      {
        title: L("Fishing Games", "捕魚遊戲"),
        body: L(
          "Arcade-style fishing titles with readable controls tuned for mobile play.",
          "街機風格捕魚，操作清楚，適合手機遊玩。",
        ),
        href: ROUTES.fishing,
        media: {
          label: L("Fishing games category", "捕魚遊戲分類"),
          tone: "accent",
        },
      },
      {
        title: L("Lottery", "彩票"),
        body: L(
          "Draw-style games for players who prefer simple outcome formats and quick rounds.",
          "開獎型玩法，適合偏好簡單結果與快速局數的玩家。",
        ),
        href: ROUTES.lottery,
        media: { label: L("Lottery category", "彩票分類"), tone: "brand" },
      },
    ],
  },
  featuredPromotions: {
    id: "featured-promotions",
    eyebrow: L("GGLBET Promotions", "GGLBET 優惠"),
    heading: L(
      "GGLBET promotions and bonus pathways to review first",
      "先檢視的 GGLBET 優惠與獎金路徑",
    ),
    subheading: L(
      "Read GGLBET offer terms before you opt in",
      "加入前先閱讀 GGLBET 活動條款",
    ),
    body: L(
      "GGLBET promotions highlight welcome journeys, reloads, and live-casino spotlights. Always open the GGLBET campaign page for full terms — homepage summaries are guidance, not a substitute for official rules.",
      "GGLBET 優惠聚焦迎新、回饋與真人娛樂焦點活動。請務必開啟 GGLBET 活動頁閱讀完整條款——首頁摘要僅供導讀，不能取代正式規則。",
    ),
    media: {
      label: L("GGLBET promotions visual", "GGLBET 優惠視覺"),
      tone: "accent",
    },
    ctas: [
      {
        label: L("Browse GGLBET promotions", "瀏覽 GGLBET 優惠"),
        href: ROUTES.promotions,
        variant: "primary",
      },
    ],
    items: [],
  },
  trendingGames: {
    id: "trending-games",
    eyebrow: L("Trending Games", "熱門遊戲"),
    heading: L(
      "Trending GGLBET games players are opening now",
      "玩家正在開啟的 GGLBET 熱門遊戲",
    ),
    subheading: L(
      "Popular titles across slots and live casino",
      "橫跨老虎機與真人娛樂的熱門標題",
    ),
    body: L(
      "Trending selections rotate as engagement shifts. Each card includes category context so you can jump into GGLBET slot games or live casino with clearer expectations.",
      "熱門清單會隨參與度輪替。每張卡片附分類脈絡，讓你進入 GGLBET 老虎機或真人娛樂時更有預期。",
    ),
    media: {
      label: L("Trending games visual", "熱門遊戲視覺"),
      tone: "brand",
    },
    ctas: [
      {
        label: L("Browse GGLBET games", "瀏覽 GGLBET 遊戲"),
        href: ROUTES.games,
        variant: "outline",
      },
    ],
    items: [],
  },
  newGames: {
    id: "new-games",
    eyebrow: L("New Games", "最新遊戲"),
    heading: L(
      "New games added to the GGLBET catalog",
      "GGLBET 館藏最新上架遊戲",
    ),
    subheading: L(
      "Fresh releases with studio attribution",
      "附遊戲商資訊的新作上架",
    ),
    body: L(
      "New games help returning Malaysia players discover fresh slot titles, live tables, and instant formats without digging through the full GGLBET library.",
      "最新遊戲幫助回流的馬來西亞玩家發現新老虎機、真人桌與即時玩法，不必翻遍整個 GGLBET 館藏。",
    ),
    media: {
      label: L("New games visual", "最新遊戲視覺"),
      tone: "secondary",
    },
    ctas: [
      {
        label: L("See new releases", "查看新作"),
        href: `${ROUTES.games}?filter=new`,
        variant: "soft",
      },
    ],
    items: [],
  },
  popularProviders: {
    id: "popular-providers",
    eyebrow: L("Popular Providers", "熱門遊戲商"),
    heading: L(
      "Popular providers powering the GGLBET catalog",
      "支撐 GGLBET 館藏的熱門遊戲商",
    ),
    subheading: L(
      "Trusted game studios with clear portfolio context",
      "可信遊戲工作室，作品脈絡清楚",
    ),
    body: L(
      "Provider pages explain studio strengths so Malaysia players can judge fair-play expectations and catalog depth before choosing a GGLBET title.",
      "遊戲商頁說明工作室強項，讓馬來西亞玩家在選擇 GGLBET 遊戲前，能先判斷公平性預期與館藏深度。",
    ),
    media: {
      label: L("Popular providers visual", "熱門遊戲商視覺"),
      tone: "neutral",
    },
    ctas: [
      {
        label: L("GGLBET Provider Directory", "GGLBET 遊戲商目錄"),
        href: ROUTES.providers,
        variant: "outline",
      },
    ],
    items: [],
  },
  howToRegister: {
    id: "how-to-register",
    eyebrow: L("How to Register", "如何註冊"),
    heading: L(
      "How to register a GGLBET account",
      "如何註冊 GGLBET 帳號",
    ),
    subheading: L(
      "A clear path from signup to first exploration",
      "從註冊到首次探索的清楚路徑",
    ),
    body: L(
      "GGLBET register flows stay straightforward: create your profile, confirm required details, then explore games and promotions with responsible-play reminders visible from the start.",
      "GGLBET 註冊流程保持直觀：建立資料、確認必要欄位，接著探索遊戲與優惠，並從一開始就看到負責任博彩提醒。",
    ),
    media: {
      label: L("How to register visual", "如何註冊視覺"),
      tone: "brand",
    },
    ctas: [
      {
        label: L("Register on GGLBET", "在 GGLBET 註冊"),
        href: ROUTES.register,
        variant: "primary",
      },
    ],
    steps: [
      {
        title: L("Open the GGLBET register page", "開啟 GGLBET 註冊頁"),
        body: L(
          "Use the Register CTA in the header or homepage to start a new GGLBET account on the official site.",
          "透過頁首或首頁的註冊按鈕，在官方網站建立新的 GGLBET 帳號。",
        ),
      },
      {
        title: L("Complete required profile fields", "填寫必要資料"),
        body: L(
          "Enter accurate details so verification and withdrawals stay smoother when you later request a payout.",
          "請填寫正確資料，之後驗證與取款會更順暢。",
        ),
      },
      {
        title: L("Confirm security checks", "完成安全驗證"),
        body: L(
          "Follow on-screen verification prompts before accessing full account tools and cashier features.",
          "依畫面提示完成驗證後，再使用完整帳號工具與出入款功能。",
        ),
      },
      {
        title: L("Open GGLBET categories and safer-play settings", "開啟 GGLBET 分類與防護設定"),
        body: L(
          "Browse GGLBET slots, live casino, and support pages, then review responsible gaming options before your first long session.",
          "瀏覽 GGLBET 老虎機、真人娛樂與支援頁，並在首次長局前檢視負責任博彩選項。",
        ),
      },
    ],
  },
  howToLogin: {
    id: "how-to-login",
    eyebrow: L("How to Login", "如何登入"),
    heading: L(
      "How to complete a GGLBET login securely",
      "如何安全完成 GGLBET 登入",
    ),
    subheading: L(
      "Return to your account without unnecessary friction",
      "快速回到帳號，少走冤枉路",
    ),
    body: L(
      "GGLBET login is intentionally simple: open the official login page, enter your credentials, and complete any security checks. If you need recovery help, contact support rather than repeating unsafe password habits.",
      "GGLBET 登入刻意保持簡單：開啟官方登入頁、輸入憑證、完成安全檢查。若需帳號復原，請聯絡客服，勿重複不安全的密碼習慣。",
    ),
    media: {
      label: L("How to login visual", "如何登入視覺"),
      tone: "neutral",
    },
    ctas: [
      {
        label: L("Go to GGLBET login", "前往 GGLBET 登入"),
        href: ROUTES.login,
        variant: "outline",
      },
    ],
    steps: [
      {
        title: L("Visit the official GGLBET login page", "造訪官方 GGLBET 登入頁"),
        body: L(
          "Use in-site navigation or a trusted bookmark to avoid phishing lookalikes of the GGLBET login screen.",
          "使用站內導覽或可信書籤，避開仿冒 GGLBET 登入頁的釣魚網站。",
        ),
      },
      {
        title: L("Enter your account credentials", "輸入帳號憑證"),
        body: L(
          "Submit your username or email and password carefully on a private connection.",
          "在私密連線下仔細輸入使用者名稱或電子郵件與密碼。",
        ),
      },
      {
        title: L("Complete additional verification if prompted", "依提示完成額外驗證"),
        body: L(
          "Follow security checks designed to protect account access after unusual devices or locations.",
          "若出現異常裝置或地點提示，請依安全檢查完成驗證以保護帳號。",
        ),
      },
      {
        title: L("Continue to games or payments", "繼續前往遊戲或支付"),
        body: L(
          "After login, jump into categories, promotions, deposit tools, or customer support as needed.",
          "登入後可依需求進入分類、優惠、存款工具或客服。",
        ),
      },
    ],
  },
  howToDownload: {
    id: "how-to-download",
    eyebrow: L("How to Download", "如何下載"),
    heading: L(
      "How to download GGLBET for Android and iOS",
      "如何下載 GGLBET（Android 與 iOS）",
    ),
    subheading: L(
      "APK guidance and mobile install pathways explained",
      "說明 APK 指引與手機安裝路徑",
    ),
    body: L(
      "Looking for GGLBET download options? The download page covers Android APK guidance and iOS access notes so Malaysia players can choose a secure install path without guesswork.",
      "在找 GGLBET 下載方式？下載頁涵蓋 Android APK 指引與 iOS 存取說明，讓馬來西亞玩家能選擇安全安裝路徑，不必猜測。",
    ),
    media: {
      label: L("How to download app visual", "如何下載 App 視覺"),
      tone: "secondary",
    },
    ctas: [
      {
        label: L("Download GGLBET", "下載 GGLBET"),
        href: ROUTES.download,
        variant: "primary",
      },
    ],
    steps: [
      {
        title: L("Open the official download page", "開啟官方下載頁"),
        body: L(
          "Always start from GGLBET download links on this website — not unverified third-party mirrors.",
          "請一律從此網站的 GGLBET 下載連結開始，勿使用未經驗證的第三方鏡像。",
        ),
      },
      {
        title: L("Choose Android or iOS instructions", "選擇 Android 或 iOS 說明"),
        body: L(
          "Follow device-specific steps for APK installation on Android or iOS access guidance.",
          "依裝置遵循 Android APK 安裝步驟或 iOS 存取指引。",
        ),
      },
      {
        title: L("Allow only required permissions", "只允許必要權限"),
        body: L(
          "Grant only what your device needs, then verify the install source before opening the app.",
          "只授予裝置所需權限，開啟 App 前再確認安裝來源。",
        ),
      },
      {
        title: L("Log in and sync your account", "登入並同步帳號"),
        body: L(
          "Use your GGLBET login details to access games, promotions, and support on mobile.",
          "使用 GGLBET 登入資料，在手機上存取遊戲、優惠與客服。",
        ),
      },
    ],
  },
  howToDeposit: {
    id: "how-to-deposit",
    eyebrow: L("GGLBET Deposit", "GGLBET 存款"),
    heading: L(
      "How to deposit on GGLBET with confidence",
      "如何在 GGLBET 安心完成存款",
    ),
    subheading: L(
      "GGLBET deposit pathways with clear payment guidance",
      "GGLBET 存款路徑，支付方式說明清楚",
    ),
    body: L(
      "GGLBET deposits should feel predictable. Review supported GGLBET payment methods, confirm account details, and choose an option that matches your Malaysia bank or e-wallet habits before funding play.",
      "GGLBET 存款應可預期。先查看支援的 GGLBET 支付方式、確認帳號資料，再選符合你馬來西亞銀行或電子錢包習慣的選項後才注資遊玩。",
    ),
    media: {
      label: L("GGLBET deposit visual", "GGLBET 存款視覺"),
      tone: "brand",
    },
    ctas: [
      {
        label: L("GGLBET Payment methods", "GGLBET 支付方式"),
        href: ROUTES.payment,
        variant: "soft",
      },
    ],
    steps: [
      {
        title: L("Log in to your verified account", "登入已驗證帳號"),
        body: L(
          "Complete GGLBET login before opening cashier or wallet tools.",
          "開啟出納或錢包工具前，先完成 GGLBET 登入。",
        ),
      },
      {
        title: L("Open deposit options", "開啟存款選項"),
        body: L(
          "Compare available methods and any on-screen processing notes for your region.",
          "比較可用方式與畫面上針對你所在地區的處理說明。",
        ),
      },
      {
        title: L("Enter the amount and confirm details", "輸入金額並確認細節"),
        body: L(
          "Double-check destination details to avoid failed transfers and delayed credits.",
          "再次確認收款細節，避免轉帳失敗或入帳延遲。",
        ),
      },
      {
        title: L("Keep your receipt for support", "保留收據以便客服協助"),
        body: L(
          "If a deposit is delayed, support can help faster with accurate references.",
          "若存款延遲，提供正確參考編號可讓客服更快協助。",
        ),
      },
    ],
  },
  howToWithdraw: {
    id: "how-to-withdraw",
    eyebrow: L("GGLBET Withdraw", "GGLBET 取款"),
    heading: L(
      "How to withdraw from GGLBET smoothly",
      "如何在 GGLBET 順暢完成取款",
    ),
    subheading: L(
      "GGLBET withdrawal expectations and verification basics",
      "GGLBET 取款預期與驗證基本功",
    ),
    body: L(
      "GGLBET withdrawals depend on accurate profile data and method compatibility. Review GGLBET requirements first, then submit a request and track status through your account tools or GGLBET support.",
      "GGLBET 取款取決於資料正確性與支付方式相容性。先檢視 GGLBET 要求，再提交申請，並透過帳號工具或 GGLBET 客服追蹤狀態。",
    ),
    media: {
      label: L("GGLBET withdraw visual", "GGLBET 取款視覺"),
      tone: "secondary",
    },
    ctas: [
      {
        label: L("Read GGLBET payment guidance", "閱讀 GGLBET 支付指引"),
        href: ROUTES.payment,
        variant: "outline",
      },
    ],
    steps: [
      {
        title: L("Confirm your profile is complete", "確認個人資料完整"),
        body: L(
          "Accurate details reduce verification delays during withdrawal reviews.",
          "資料正確可減少取款審核時的驗證延遲。",
        ),
      },
      {
        title: L("Choose a compatible payout method", "選擇相容的出款方式"),
        body: L(
          "Match the method to how you deposited when required by policy.",
          "若政策要求，請選擇與存款方式相符的出款管道。",
        ),
      },
      {
        title: L("Submit the withdrawal request", "提交取款申請"),
        body: L(
          "Enter the amount carefully and confirm before sending the request.",
          "仔細輸入金額，確認後再送出申請。",
        ),
      },
      {
        title: L("Monitor status and contact support if needed", "追蹤狀態，必要時聯絡客服"),
        body: L(
          "Use 24/7 customer support channels when a request needs follow-up.",
          "若申請需要後續處理，可使用全天候客服管道。",
        ),
      },
    ],
  },
  referralProgram: {
    id: "referral-program",
    eyebrow: L("Referral Program", "推薦計畫"),
    heading: L(
      "Invite friends with the GGLBET referral program",
      "透過 GGLBET 推薦計畫邀請好友",
    ),
    subheading: L(
      "Share the platform and track rewards transparently",
      "分享平台，透明追蹤獎勵",
    ),
    body: L(
      "The referral program helps members invite people who may value the same catalog and support standards. Rewards stay tied to published rules so expectations remain clear for Malaysia players.",
      "推薦計畫協助會員邀請同樣重視館藏與服務標準的朋友。獎勵依公開規則計算，讓馬來西亞玩家的預期保持清楚。",
    ),
    media: {
      label: L("Referral program visual", "推薦計畫視覺"),
      tone: "accent",
    },
    ctas: [
      {
        label: L("Open referral details", "查看推薦詳情"),
        href: ROUTES.referral,
        variant: "primary",
      },
    ],
    points: [
      {
        title: L("Share your invite link", "分享邀請連結"),
        body: L(
          "Generate a referral pathway from your account tools after GGLBET login.",
          "GGLBET 登入後，從帳號工具產生推薦連結。",
        ),
      },
      {
        title: L("Friends register with clear guidance", "好友依清楚指引註冊"),
        body: L(
          "New players still complete standard GGLBET register and verification steps.",
          "新玩家仍須完成標準 GGLBET 註冊與驗證步驟。",
        ),
      },
      {
        title: L("Track progress in your account", "在帳號內追蹤進度"),
        body: L(
          "Reward status should remain visible so you understand qualification criteria.",
          "獎勵狀態應保持可見，讓你理解達標條件。",
        ),
      },
    ],
  },
  vipProgram: {
    id: "vip-program",
    eyebrow: L("VIP Program", "VIP 計畫"),
    heading: L(
      "GGLBET VIP program benefits",
      "GGLBET VIP 計畫權益",
    ),
    subheading: L(
      "Priority support, tailored offers, and clearer reward tracking",
      "優先客服、量身優惠與更清楚的獎勵追蹤",
    ),
    body: L(
      "VIP is framed as a service relationship. Members gain faster support pathways, personalized campaign communication, and elevated recognition — always with eligibility criteria published on the VIP page.",
      "VIP 定位為服務關係。會員獲得更快客服路徑、個人化活動溝通與更高識別——資格條件一律公開於 VIP 頁面。",
    ),
    media: {
      label: L("VIP program visual", "VIP 計畫視覺"),
      tone: "brand",
    },
    ctas: [
      {
        label: L("GGLBET VIP", "GGLBET VIP"),
        href: ROUTES.vip,
        variant: "primary",
      },
      {
        label: L("Register to begin", "註冊開始"),
        href: ROUTES.register,
        variant: "outline",
      },
    ],
    benefits: [
      {
        title: L("Priority support desk", "優先客服專線"),
        body: L(
          "Faster routing for account, payment, and product questions when you need a human answer.",
          "帳號、支付與產品問題需要真人協助時，路由更快。",
        ),
      },
      {
        title: L("Personalized offers", "個人化優惠"),
        body: L(
          "Campaigns matched to play style with readable opt-in details and contribution notes.",
          "依遊玩風格匹配活動，加入細節與流水說明可讀。",
        ),
      },
      {
        title: L("Elevated rewards tracking", "進階獎勵追蹤"),
        body: L(
          "Progress visibility so members understand tier movement without guessing.",
          "進度可見，會員不必猜測即可理解等級變化。",
        ),
      },
      {
        title: L("Exclusive event access", "專屬活動入場"),
        body: L(
          "Invites to spotlight tournaments and seasonal campaigns for qualifying VIP tiers.",
          "符合資格的 VIP 等級可獲焦點賽事與季節活動邀請。",
        ),
      },
    ],
  },
  trustSecurity: {
    id: "trust-security",
    eyebrow: L("GGLBET Trust & Security", "GGLBET 信任與安全"),
    heading: L(
      "GGLBET trust and security signals that matter",
      "真正重要的 GGLBET 信任與安全訊號",
    ),
    subheading: L(
      "Practical GGLBET protections around accounts, payments, and fair play",
      "圍繞 GGLBET 帳號、支付與公平遊玩的實用防護",
    ),
    body: L(
      "Players evaluating a GGLBET online casino look for more than visuals. GGLBET highlights secure platform practices, encrypted connection expectations, payment reliability, trusted game providers, and responsible gaming resources.",
      "評估 GGLBET 線上娛樂城的玩家需要的不只是視覺。GGLBET 強調安全平台做法、加密連線預期、支付可靠度、可信遊戲商與負責任博彩資源。",
    ),
    media: {
      label: L("GGLBET trust and security visual", "GGLBET 信任與安全視覺"),
      tone: "neutral",
    },
    ctas: [
      {
        label: L("Contact GGLBET support", "聯絡 GGLBET 客服"),
        href: ROUTES.contact,
        variant: "soft",
      },
    ],
    items: [
      {
        id: "secure-platform",
        title: L("Secure Platform", "安全平台"),
        body: L(
          "Account tools and product surfaces are designed with safer defaults and clear session guidance.",
          "帳號工具與產品介面採較安全預設，並提供清楚的工作階段指引。",
        ),
        icon: "shield",
      },
      {
        id: "encrypted-connection",
        title: L("Encrypted Connection", "加密連線"),
        body: L(
          "Use HTTPS connections when registering, logging in, depositing, or withdrawing on GGLBET.",
          "在 GGLBET 註冊、登入、存款或取款時，請使用 HTTPS 連線。",
        ),
        icon: "lock",
      },
      {
        id: "fast-deposit",
        title: L("Fast Deposit", "快速存款"),
        body: L(
          "Deposit journeys emphasize method clarity so funding can complete with fewer surprises.",
          "存款流程強調方式清楚，讓注資完成時少意外。",
        ),
        icon: "deposit",
      },
      {
        id: "fast-withdrawal",
        title: L("Fast Withdrawal", "快速取款"),
        body: L(
          "Withdrawal guidance explains verification basics that often determine payout speed.",
          "取款指引說明常影響出款速度的驗證基本功。",
        ),
        icon: "withdraw",
      },
      {
        id: "multiple-payments",
        title: L("Multiple Payment Methods", "多元支付方式"),
        body: L(
          "Banks, e-wallets, cards, and local Malaysia-friendly options are documented on the payments page.",
          "銀行、電子錢包、卡片與馬來西亞友善的在地選項，皆說明於支付頁。",
        ),
        icon: "payments",
      },
      {
        id: "support-24-7",
        title: L("24/7 Customer Support", "全天候客服"),
        body: L(
          "Help channels are positioned for account, payment, and product questions around the clock.",
          "協助管道全天候支援帳號、支付與產品問題。",
        ),
        icon: "support",
      },
      {
        id: "responsible-gaming",
        title: L("Responsible Gaming", "負責任博彩"),
        body: L(
          "Adults-only messaging and safer-play education remain part of the core GGLBET experience.",
          "僅限成年人與較安全遊玩教育，仍是 GGLBET 核心體驗的一部分。",
        ),
        icon: "responsible",
      },
      {
        id: "fair-play",
        title: L("Fair Play", "公平遊玩"),
        body: L(
          "Catalog organization and provider context help players evaluate game integrity signals.",
          "館藏組織與遊戲商脈絡，協助玩家評估遊戲公正訊號。",
        ),
        icon: "fair",
      },
      {
        id: "trusted-providers",
        title: L("Trusted Game Providers", "可信遊戲商"),
        body: L(
          "Popular studios are presented with portfolio context rather than anonymous thumbnails.",
          "熱門工作室以作品脈絡呈現，而非無名縮圖。",
        ),
        icon: "providers",
      },
    ],
  },
  customerSupport: {
    id: "customer-support",
    eyebrow: L("Customer Support", "客戶支援"),
    heading: L(
      "Customer support when you need a human answer",
      "需要真人解答時的客戶支援",
    ),
    subheading: L(
      "24/7 help for login, payments, and product questions",
      "登入、支付與產品問題全天候協助",
    ),
    body: L(
      "Support exists to unblock real tasks: GGLBET login issues, deposit confirmation, withdrawal status, promotion eligibility questions, and download troubleshooting for Android or iOS.",
      "客服用來排除真實阻礙：GGLBET 登入問題、存款確認、取款狀態、優惠資格疑問，以及 Android 或 iOS 下載疑難排解。",
    ),
    media: {
      label: L("Customer support visual", "客戶支援視覺"),
      tone: "secondary",
    },
    ctas: [
      {
        label: L("Contact GGLBET support", "聯絡 GGLBET 客服"),
        href: ROUTES.contact,
        variant: "primary",
      },
      {
        label: L("Open GGLBET FAQ", "開啟 GGLBET 常見問題"),
        href: ROUTES.faq,
        variant: "ghost",
      },
    ],
    points: [
      {
        title: L("Account and login help", "帳號與登入協助"),
        body: L(
          "Get guidance when access, verification, or password recovery needs attention.",
          "當存取、驗證或密碼復原需要協助時，可獲得指引。",
        ),
      },
      {
        title: L("Payments assistance", "支付協助"),
        body: L(
          "Ask about deposit and withdrawal statuses with clear reference details ready.",
          "詢問存款與取款狀態時，請準備清楚的參考編號。",
        ),
      },
      {
        title: L("Product education", "產品教育"),
        body: L(
          "Learn where to find promotions, VIP details, guides, and responsible gaming tools.",
          "了解優惠、VIP、攻略與負責任博彩工具的位置。",
        ),
      },
    ],
  },
  casinoGuides: {
    id: "casino-guides",
    eyebrow: L("GGLBET Guides", "GGLBET 攻略"),
    heading: L(
      "GGLBET guides for smarter play decisions",
      "協助做出更聰明決策的 GGLBET 攻略",
    ),
    subheading: L(
      "GGLBET educational resources beyond promotional banners",
      "超越促銷橫幅的 GGLBET 教育資源",
    ),
    body: L(
      "GGLBET guides help Malaysia players understand game types, payment habits, and safer play. They support EEAT by pairing practical experience with clear explanations before you register or deposit on GGLBET.",
      "GGLBET 攻略幫助馬來西亞玩家理解遊戲類型、支付習慣與較安全遊玩，並以實務經驗搭配清楚說明，在 GGLBET 註冊或存款前支持 EEAT。",
    ),
    media: {
      label: L("GGLBET guides visual", "GGLBET 攻略視覺"),
      tone: "brand",
    },
    ctas: [
      {
        label: L("Browse GGLBET guides", "瀏覽 GGLBET 攻略"),
        href: ROUTES.guides,
        variant: "outline",
      },
      {
        label: L("GGLBET beginner guides", "GGLBET 新手攻略"),
        href: getGuideCategoryHref("beginner"),
        variant: "ghost",
      },
    ],
    items: [],
  },
  platformFeatures: {
    id: "platform-features",
    eyebrow: L("GGLBET Platform Features", "GGLBET 平台功能"),
    heading: L(
      "GGLBET platform features that keep browsing useful",
      "讓瀏覽真正有用的 GGLBET 平台功能",
    ),
    subheading: L(
      "GGLBET discovery, account tools, and mobile access working together",
      "GGLBET 探索、帳號工具與手機存取協同運作",
    ),
    body: L(
      "GGLBET platform features focus on speed and comprehension: structured categories, promotion clarity, payment documentation, VIP pathways, and download options for Android and iOS users in Malaysia.",
      "GGLBET 平台功能聚焦速度與理解：結構化分類、清楚優惠、支付文件、VIP 路徑，以及馬來西亞 Android 與 iOS 用戶的下載選項。",
    ),
    media: {
      label: L("Platform features visual", "平台功能視覺"),
      tone: "accent",
    },
    ctas: [
      {
        label: L("Register on GGLBET", "在 GGLBET 註冊"),
        href: ROUTES.register,
        variant: "primary",
      },
    ],
    points: [
      {
        title: L("Unified GGLBET game catalog", "統一的 GGLBET 遊戲館藏"),
        body: L(
          "On GGLBET, slots, live casino, sports betting, fishing, and lottery share consistent navigation patterns.",
          "在 GGLBET，老虎機、真人娛樂、體育投注、捕魚與彩票共用一致的導覽模式。",
        ),
      },
      {
        title: L("GGLBET promotion clarity", "GGLBET 優惠情報"),
        body: L(
          "GGLBET campaign pages prioritize terms pathways and responsible reminders over vague bonus claims.",
          "GGLBET 活動頁優先呈現條款路徑與負責任提醒，而非含糊獎金主張。",
        ),
      },
      {
        title: L("Mobile-ready GGLBET journeys", "行動裝置就緒的 GGLBET 流程"),
        body: L(
          "Web and download experiences aim for parity on smaller screens for GGLBET login and play.",
          "網站與下載體驗力求在較小螢幕上對等支援 GGLBET 登入與遊玩。",
        ),
      },
      {
        title: L("Support-first on GGLBET", "GGLBET 支援優先"),
        body: L(
          "GGLBET FAQ, contact, and guides remain easy to reach from primary templates.",
          "GGLBET 的 FAQ、聯絡與攻略在主要模板中保持易達。",
        ),
      },
    ],
  },
  latestWinners: {
    id: "latest-winners",
    eyebrow: L("Latest Winners", "最新得獎"),
    heading: L(
      "Latest GGLBET winners highlights",
      "GGLBET 最新得獎亮點",
    ),
    subheading: L(
      "Anonymized outcomes with GGLBET category context",
      "匿名結果，附 GGLBET 分類脈絡",
    ),
    body: L(
      "GGLBET winner highlights use privacy-first identifiers. Amounts and categories illustrate activity without exposing personal photos or full names. Game titles are refreshed from the live GGLBET catalog at runtime.",
      "GGLBET 得獎亮點採用隱私優先識別。金額與分類用於呈現活躍度，不曝光個人照片或全名。遊戲名稱會在執行時由即時 GGLBET 館藏更新。",
    ),
    media: {
      label: L("Latest winners visual", "最新得獎視覺"),
      tone: "brand",
    },
    ctas: [
      {
        label: L("Play on GGLBET", "在 GGLBET 遊玩"),
        href: ROUTES.games,
        variant: "soft",
      },
    ],
    items: [
      {
        player: L("Player****12", "Player****12"),
        game: L("Catalog highlight", "精選館藏"),
        amount: L("MYR 12,480", "MYR 12,480"),
        category: L("Slots", "老虎機"),
      },
      {
        player: L("Player****47", "Player****47"),
        game: L("Catalog highlight", "精選館藏"),
        amount: L("MYR 8,950", "MYR 8,950"),
        category: L("Live Casino", "真人娛樂"),
      },
      {
        player: L("Player****03", "Player****03"),
        game: L("Catalog highlight", "精選館藏"),
        amount: L("MYR 4,320", "MYR 4,320"),
        category: L("Fishing", "捕魚"),
      },
      {
        player: L("Player****88", "Player****88"),
        game: L("Catalog highlight", "精選館藏"),
        amount: L("MYR 6,110", "MYR 6,110"),
        category: L("Slots", "老虎機"),
      },
    ],
  },
  latestStatistics: {
    id: "latest-statistics",
    eyebrow: L("Latest Statistics", "最新數據"),
    heading: L(
      "Latest GGLBET platform statistics",
      "GGLBET 最新平台數據",
    ),
    subheading: L(
      "Scale signals for the GGLBET catalog and service coverage",
      "反映 GGLBET 館藏與服務覆蓋的規模訊號",
    ),
    body: L(
      "These GGLBET statistics are editorial metrics intended to reflect catalog breadth and support coverage. They should stay aligned with the live GGLBET product.",
      "這些 GGLBET 數據為編輯指標，用以反映館藏廣度與服務覆蓋，並應與即時 GGLBET 產品保持一致。",
    ),
    media: {
      label: L("Latest statistics visual", "最新數據視覺"),
      tone: "secondary",
    },
    ctas: [
      {
        label: L("Talk to GGLBET support", "聯絡 GGLBET 客服"),
        href: ROUTES.contact,
        variant: "outline",
      },
    ],
    items: [
      {
        value: L("10,000+", "10,000+"),
        label: L(
          "GGLBET game entries across categories",
          "GGLBET 跨分類遊戲條目",
        ),
      },
      {
        value: L("80+", "80+"),
        label: L(
          "GGLBET provider relationships in discovery",
          "GGLBET 探索中的遊戲商合作",
        ),
      },
      {
        value: L("20+", "20+"),
        label: L(
          "Payment pathways documented",
          "已說明的支付路徑",
        ),
      },
      {
        value: L("24/7", "24/7"),
        label: L(
          "Customer support availability target",
          "客服可用時段目標",
        ),
      },
    ],
  },
  paymentMethods: {
    id: "payment-methods",
    eyebrow: L("Payment Methods", "支付方式"),
    heading: L(
      "Payment methods for deposits and withdrawals",
      "存款與取款支付方式",
    ),
    subheading: L(
      "Multiple options with plain-language expectations for Malaysia players",
      "多元選項，以白話說明馬來西亞玩家可預期的流程",
    ),
    body: L(
      "Payment method pages explain banks, e-wallets, cards, and local rails used by Malaysia players. Clear documentation supports faster deposits and more predictable withdrawals on GGLBET.",
      "支付方式頁說明馬來西亞玩家常用的銀行、電子錢包、卡片與在地管道。清楚文件有助 GGLBET 更快存款與更可預期的取款。",
    ),
    media: {
      label: L("Payment methods visual", "支付方式視覺"),
      tone: "neutral",
    },
    ctas: [
      {
        label: L("Review payments", "查看支付說明"),
        href: ROUTES.payment,
        variant: "outline",
      },
    ],
    methods: [
      {
        title: L("FPX / Instant bank transfer", "FPX／即時銀行轉帳"),
        body: L(
          "Bank-linked deposits popular with Malaysia players, with verification guidance for smoother withdrawals.",
          "馬來西亞玩家常用的銀行連結存款，並附驗證指引以利更順暢取款。",
        ),
        media: {
          label: L("FPX payment", "FPX 支付"),
          tone: "brand",
          src: "/home/payments/fpx.svg",
          alt: L("FPX logo", "FPX 標誌"),
        },
      },
      {
        title: L("Touch 'n Go eWallet", "Touch 'n Go 電子錢包"),
        body: L(
          "Separated wallet balances for players who prefer e-wallet funding and faster mobile confirmation.",
          "偏好電子錢包注資與較快手機確認的玩家，可使用獨立錢包餘額。",
        ),
        media: {
          label: L("Touch 'n Go payment", "Touch 'n Go 支付"),
          tone: "secondary",
          src: "/home/payments/tng.svg",
          alt: L("Touch 'n Go eWallet logo", "Touch 'n Go 電子錢包標誌"),
        },
      },
      {
        title: L("DuitNow", "DuitNow"),
        body: L(
          "Local transfer rails with clear on-screen references so support can resolve delays faster.",
          "在地轉帳管道，畫面上參考編號清楚，客服可更快處理延遲。",
        ),
        media: {
          label: L("DuitNow payment", "DuitNow 支付"),
          tone: "accent",
          src: "/home/payments/duitnow.svg",
          alt: L("DuitNow logo", "DuitNow 標誌"),
        },
      },
      {
        title: L("Card payments", "卡片支付"),
        body: L(
          "Card flows with issuer messaging and security checkpoints before funds credit to your GGLBET balance.",
          "卡片流程含發卡行訊息與安全檢查點，資金入帳至 GGLBET 餘額前先完成確認。",
        ),
        media: {
          label: L("Card payment", "卡片支付"),
          tone: "neutral",
          src: "/home/payments/card.svg",
          alt: L("Card payments logo", "卡片支付標誌"),
        },
      },
    ],
  },
  responsibleGaming: {
    id: "responsible-gaming",
    eyebrow: L("Responsible Gaming", "負責任博彩"),
    heading: L(
      "Responsible gaming comes first",
      "負責任博彩優先",
    ),
    subheading: L(
      "Adults only (18+) with practical safer-play guidance",
      "僅限 18 歲以上，提供實用的較安全遊玩指引",
    ),
    body: L(
      "Entertainment should stay entertainment. GGLBET publishes responsible gaming resources covering age restrictions, healthier habits, and help pathways when play stops feeling fun.",
      "娛樂應保持為娛樂。GGLBET 公布負責任博彩資源，涵蓋年齡限制、較健康習慣，以及遊玩不再好玩時的求助路徑。",
    ),
    media: {
      label: L("Responsible gaming visual", "負責任博彩視覺"),
      tone: "neutral",
    },
    ctas: [
      {
        label: L("Read responsible gaming", "閱讀負責任博彩"),
        href: ROUTES.responsibleGaming,
        variant: "outline",
      },
    ],
    points: [
      {
        title: L("Age-gated access", "年齡門檻"),
        body: L(
          "Registration reinforces adult-only participation from the first GGLBET register step.",
          "從 GGLBET 註冊第一步起即強調僅限成年人參與。",
        ),
      },
      {
        title: L("Control-minded reminders", "控管提醒"),
        body: L(
          "Product surfaces encourage limits and breaks during longer sessions.",
          "產品介面鼓勵在較長場次中設定上限與休息。",
        ),
      },
      {
        title: L("Help resources", "求助資源"),
        body: L(
          "Dedicated pages explain tools and where to seek external assistance if needed.",
          "專頁說明可用工具，以及必要時如何尋求外部協助。",
        ),
      },
    ],
  },
  latestNews: {
    id: "latest-news",
    eyebrow: L("GGLBET News", "GGLBET 新聞"),
    heading: L(
      "GGLBET news and updates from the editorial desk",
      "來自編輯台的 GGLBET 新聞與更新",
    ),
    subheading: L(
      "GGLBET product updates with author attribution",
      "附作者署名的 GGLBET 產品更新",
    ),
    body: L(
      "GGLBET news articles explain catalog updates, promotion literacy, and payment confidence. Author fields support EEAT when CMS authorship is connected.",
      "GGLBET 新聞文章說明館藏更新、優惠識讀與支付信心。當 CMS 連接作者時，署名欄位支持 EEAT。",
    ),
    media: {
      label: L("GGLBET news visual", "GGLBET 新聞視覺"),
      tone: "secondary",
    },
    ctas: [
      {
        label: L("Browse GGLBET news", "瀏覽 GGLBET 新聞"),
        href: ROUTES.news,
        variant: "soft",
      },
    ],
    items: [],
  },
  faq: {
    id: "faq",
    eyebrow: L("GGLBET FAQ", "GGLBET 常見問題"),
    heading: L(
      "GGLBET FAQ for register, login, and play",
      "GGLBET 常見問題：註冊、登入與遊玩",
    ),
    subheading: L(
      "Straight GGLBET answers for register, login, download, and play",
      "GGLBET 註冊、登入、下載與遊玩的直接解答",
    ),
    body: L(
      "These GGLBET FAQs address high-intent questions around GGLBET Malaysia access, login, registration, downloads, slots, live casino, payments, VIP, and responsible gaming. Deeper answers live in the GGLBET FAQ hub and GGLBET guides.",
      "這些 GGLBET FAQ 回應高意圖問題：GGLBET 馬來西亞存取、登入、註冊、下載、老虎機、真人娛樂、支付、VIP 與負責任博彩。更深入解答見 GGLBET FAQ 中心與 GGLBET 攻略。",
    ),
    media: {
      label: L("GGLBET FAQ visual", "GGLBET 常見問題視覺"),
      tone: "neutral",
    },
    ctas: [
      {
        label: L("Open GGLBET FAQ hub", "開啟 GGLBET 常見問題中心"),
        href: ROUTES.faq,
        variant: "outline",
      },
    ],
    items: homeFaqItems,
  },
  internalLinks: {
    id: "explore-gglbet",
    eyebrow: L("GGLBET destinations", "GGLBET 目的地"),
    heading: L(
      "GGLBET internal links for every major destination",
      "各大目的地的 GGLBET 內連樞紐",
    ),
    subheading: L(
      "Jump directly into the GGLBET page that matches your intent",
      "直接跳到符合你意圖的 GGLBET 頁面",
    ),
    body: L(
      "Use this GGLBET hub when you already know what you need — games, providers, promotions, account tasks, or trust resources. Short descriptions keep choices readable for users and search systems alike.",
      "當你已清楚需求時使用此 GGLBET 樞紐——遊戲、遊戲商、優惠、帳號任務或信任資源。短描述讓使用者與搜尋系統都容易閱讀。",
    ),
    media: {
      label: L("GGLBET internal links hub visual", "GGLBET 內連樞紐視覺"),
      tone: "secondary",
    },
    ctas: [
      {
        label: L("Browse GGLBET games", "瀏覽 GGLBET 遊戲"),
        href: ROUTES.games,
        variant: "primary",
      },
    ],
    items: [
      {
        title: L("GGLBET Games", "GGLBET 遊戲"),
        body: L(
          "Open the full GGLBET catalog spanning multiple categories.",
          "開啟涵蓋多分類的完整 GGLBET 館藏。",
        ),
        href: ROUTES.games,
      },
      {
        title: L("GGLBET Providers", "GGLBET 遊戲商"),
        body: L(
          "Review studios behind popular GGLBET titles.",
          "查看熱門 GGLBET 標題背後的工作室。",
        ),
        href: ROUTES.providers,
      },
      {
        title: L("GGLBET Slots", "GGLBET 老虎機"),
        body: L(
          "Jump into GGLBET slot games for mobile and desktop.",
          "進入適合手機與桌機的 GGLBET 老虎機。",
        ),
        href: ROUTES.slots,
      },
      {
        title: L("GGLBET Live Casino", "GGLBET 真人娛樂"),
        body: L(
          "Enter GGLBET live dealer tables and studio experiences.",
          "進入 GGLBET 真人荷官桌與工作室體驗。",
        ),
        href: ROUTES.liveCasino,
      },
      {
        title: L("GGLBET Sports", "GGLBET 體育"),
        body: L(
          "Open GGLBET sports betting markets and event navigation.",
          "開啟 GGLBET 體育投注盤口與賽事導覽。",
        ),
        href: ROUTES.sports,
      },
      {
        title: L("GGLBET Lottery", "GGLBET 彩票"),
        body: L(
          "Browse GGLBET draw-style games with simple outcomes.",
          "瀏覽結果簡單的 GGLBET 開獎型遊戲。",
        ),
        href: ROUTES.lottery,
      },
      {
        title: L("GGLBET Fishing", "GGLBET 捕魚"),
        body: L(
          "Play GGLBET arcade-style fishing games with clear controls.",
          "遊玩操作清楚的 GGLBET 街機風格捕魚。",
        ),
        href: ROUTES.fishing,
      },
      {
        title: L("GGLBET Promotions", "GGLBET 優惠"),
        body: L(
          "Compare GGLBET promotions and bonus pathways.",
          "比較 GGLBET 優惠與獎金路徑。",
        ),
        href: ROUTES.promotions,
      },
      {
        title: L("GGLBET VIP", "GGLBET VIP"),
        body: L(
          "Learn GGLBET VIP benefits and eligibility expectations.",
          "了解 GGLBET VIP 權益與資格預期。",
        ),
        href: ROUTES.vip,
      },
      {
        title: L("GGLBET Download", "GGLBET 下載"),
        body: L(
          "Get GGLBET Android APK and iOS download guidance.",
          "取得 GGLBET Android APK 與 iOS 下載指引。",
        ),
        href: ROUTES.download,
      },
      {
        title: L("Register on GGLBET", "在 GGLBET 註冊"),
        body: L(
          "Create a new GGLBET account step by step.",
          "逐步建立新的 GGLBET 帳號。",
        ),
        href: ROUTES.register,
      },
      {
        title: L("GGLBET Login", "GGLBET 登入"),
        body: L(
          "Return to your account through the official GGLBET login page.",
          "透過官方 GGLBET 登入頁返回帳號。",
        ),
        href: ROUTES.login,
      },
      {
        title: L("GGLBET FAQ", "GGLBET 常見問題"),
        body: L(
          "Find concise answers to common GGLBET player questions.",
          "找到常見 GGLBET 玩家問題的精簡解答。",
        ),
        href: ROUTES.faq,
      },
      {
        title: L("GGLBET News", "GGLBET 新聞"),
        body: L(
          "Read GGLBET updates and product insights.",
          "閱讀 GGLBET 更新與產品洞察。",
        ),
        href: ROUTES.news,
      },
      {
        title: L("About GGLBET", "關於 GGLBET"),
        body: L(
          "Learn what GGLBET stands for as a brand.",
          "了解 GGLBET 品牌代表什麼。",
        ),
        href: ROUTES.about,
      },
      {
        title: L("GGLBET Responsible Gaming", "GGLBET 負責任博彩"),
        body: L(
          "Access GGLBET safer-play guidance and help resources.",
          "取得 GGLBET 較安全遊玩指引與求助資源。",
        ),
        href: ROUTES.responsibleGaming,
      },
      {
        title: L("GGLBET Payment", "GGLBET 支付"),
        body: L(
          "Review GGLBET deposit and withdrawal methods.",
          "查看 GGLBET 存款與取款方式。",
        ),
        href: ROUTES.payment,
      },
      {
        title: L("GGLBET Guides", "GGLBET 攻略"),
        body: L(
          "Study GGLBET guides before you play.",
          "遊玩前研讀 GGLBET 攻略。",
        ),
        href: ROUTES.guides,
      },
      {
        title: L("Contact GGLBET", "聯絡 GGLBET"),
        body: L(
          "Reach GGLBET 24/7 customer support channels.",
          "連繫 GGLBET 全天候客服管道。",
        ),
        href: ROUTES.contact,
      },
      {
        title: L("GGLBET Referral", "GGLBET 推薦"),
        body: L(
          "See how the GGLBET referral program works.",
          "了解 GGLBET 推薦計畫如何運作。",
        ),
        href: ROUTES.referral,
      },
    ],
  },
  finalCta: {
    id: "get-started",
    eyebrow: L("Get Started on GGLBET", "立即開始使用 GGLBET"),
    heading: L(
      "Ready for GGLBET login, register, or download?",
      "準備好 GGLBET 登入、註冊或下載了嗎？",
    ),
    subheading: L(
      "Choose the next step that matches your intent",
      "選擇符合你意圖的下一步",
    ),
    body: L(
      "Whether you need to create an account, return to an existing profile, install the mobile experience, or review promotions, each pathway keeps responsible-play messaging visible for Malaysia players.",
      "無論你要建立帳號、返回既有資料、安裝手機體驗或查看優惠，每條路徑都為馬來西亞玩家保留可見的負責任博彩訊息。",
    ),
    media: {
      label: L("Final CTA visual", "最終行動呼籲視覺"),
      tone: "accent",
    },
    ctas: [
      {
        label: L("Register", "註冊"),
        href: ROUTES.register,
        variant: "primary",
      },
      {
        label: L("Log in", "登入"),
        href: ROUTES.login,
        variant: "outline",
      },
      {
        label: L("Download", "下載"),
        href: ROUTES.download,
        variant: "secondary",
      },
      {
        label: L("Promotions", "優惠"),
        href: ROUTES.promotions,
        variant: "soft",
      },
    ],
  },
} as unknown as HomePageContent;
