import { L } from "@/lib/i18n";
import type { TrustPageBlock } from "@/types/eeat";
import { HUB_MEDIA, ROUTES, createTrustPage } from "./factory";

export const responsibleGamingTrustPage = createTrustPage({
  slug: "responsible-gaming",
  title: L("Responsible Gaming at GGLBET", "GGLBET 負責任博彩"),
  metaTitle: L(
    "GGLBET Responsible Gaming | Deposit Limits, Time Limits & Help",
    "GGLBET 負責任博彩｜存款上限、時間上限與協助",
  ),
  metaDescription: L(
    "Learn how GGLBET responsible gaming tools work for Malaysia players: deposit limits, time limits, self-exclusion, privacy-minded controls, warning signs, and where to find help. Confirm live tool labels inside your signed-in GGLBET session.",
    "了解馬來西亞玩家如何使用 GGLBET 負責任博彩工具：存款上限、時間上限、自我排除、兼顧隱私的控制、警訊，以及何處尋求協助。請在已登入的 GGLBET 工作階段確認即時工具名稱。",
  ),
  heroEyebrow: L("GGLBET Support · Responsible gaming", "GGLBET 支援 · 負責任博彩"),
  heroTitle: L(
    "GGLBET responsible gaming tools that put you in control",
    "讓你掌握主動的 GGLBET 負責任博彩工具",
  ),
  heroDescription: L(
    "Set deposit and time limits before you play, recognise warning signs early, use cool-off or self-exclusion when you need distance, and keep player safety choices private inside your GGLBET account.",
    "在遊玩前設定存款與時間上限、及早辨識警訊、需要距離時使用冷靜期或自我排除，並在 GGLBET 帳號內保有隱私的玩家安全選擇。",
  ),
  heroImageSrc: HUB_MEDIA.responsible,
  lastUpdated: "2026-08-08",
  authorSlug: "gglbet-editorial",
  reviewerSlug: "gglbet-trust-desk",
  schemaType: "WebPage",
  summaryCards: [
    {
      title: L("Deposit limit", "存款上限"),
      description: L(
        "Cap how much you can fund over a day, week, or month. Tightening a GGLBET deposit limit applies immediately.",
        "限制每日、每週或每月可入金金額。調降 GGLBET 存款上限會立即生效。",
      ),
    },
    {
      title: L("Time limit", "時間上限"),
      description: L(
        "Use session reminders or time caps so GGLBET play stays inside a window you chose while clear-headed.",
        "使用工作階段提醒或時間上限，讓 GGLBET 遊玩留在你清醒時選擇的時段內。",
      ),
    },
    {
      title: L("Self-exclusion", "自我排除"),
      description: L(
        "When you need a longer hard stop, self-exclusion closes access for a fixed period and should be treated as a serious commitment.",
        "當你需要更長的硬性停止時，自我排除會在固定期間關閉存取，應視為認真承諾。",
      ),
    },
    {
      title: L("Help pathways", "協助路徑"),
      description: L(
        "Combine GGLBET account tools with independent support if gambling stops feeling optional or entertainment-like.",
        "若博彩不再像可選擇的娛樂，請把 GGLBET 帳號工具與獨立協助結合。",
      ),
    },
    {
      title: L("Privacy-minded controls", "兼顧隱私的控制"),
      description: L(
        "Safer-play settings live in your account. You should not need to explain yourself to other players to use them.",
        "較安全遊玩設定存在於你的帳號。使用時不需要向其他玩家解釋。",
      ),
    },
    {
      title: L("Player safety first", "玩家安全優先"),
      description: L(
        "Limits, cool-off, and exclusion exist so entertainment spending stays intentional—especially around deposit and login moments.",
        "上限、冷靜期與排除的存在，是為了讓娛樂花費保持有意識——尤其在存款與登入時刻。",
      ),
    },
  ],
  blocks: [
    {
      type: "tldr",
      id: "tldr",
      text: L(
        "Set a GGLBET deposit limit before your first deposit, add a time or session reminder so play does not silently expand, and use cool-off or self-exclusion the moment gambling stops feeling optional. Tightened limits apply immediately. Confirm live tool names and options inside your signed-in account rather than treating this page as a frozen product screenshot.",
        "在首次存款前設定 GGLBET 存款上限，加上時間或工作階段提醒，避免遊玩無聲擴張；一旦博彩不再像可選擇，就使用冷靜期或自我排除。調降上限會立即生效。請在已登入帳號確認即時工具名稱與選項，勿把本頁當成凍結的產品截圖。",
      ),
    },
    {
      type: "definition",
      id: "definition",
      term: L("Responsible gaming at GGLBET", "GGLBET 的負責任博彩"),
      text: L(
        "Responsible gaming means playing with money and time you have consciously decided to spend, using pre-set GGLBET limits, and stopping when those limits are reached—regardless of whether you are ahead or behind. It is a practical account habit, not a slogan.",
        "負責任博彩代表只用你有意識決定要花的金錢與時間遊玩，使用預先設定的 GGLBET 上限，並在達到上限時停止——無論當時領先或落後。這是務實的帳號習慣，不是口號。",
      ),
    },
    {
      type: "heading",
      id: "how-it-works",
      text: L("How GGLBET safer-play tools work", "GGLBET 較安全遊玩工具如何運作"),
      anchor: "how-it-works",
    },
    {
      type: "paragraph",
      id: "how-1",
      text: L(
        "Malaysia players often meet GGLBET through login, register, deposit, or download intent, and responsible gaming should sit beside those moments—not after a painful session. Account tools let you decide ceilings while you are calm, then enforce them when urgency rises. A deposit limit caps funding. A time or session control watches the clock. Cool-off creates short distance. Self-exclusion creates a longer hard stop. None of these tools require you to announce your choice to other players; they are account-level controls you configure after signing in.",
        "馬來西亞玩家常因登入、註冊、存款或下載意圖接觸 GGLBET，而負責任博彩應與這些時刻並存——而非痛苦場次之後。帳號工具讓你在平靜時決定上限，並在急迫感上升時執行。存款上限限制入金。時間或工作階段控制看著時鐘。冷靜期創造短暫距離。自我排除創造更長的硬性停止。這些工具都不需要你向其他玩家宣布選擇；它們是登入後設定的帳號層控制。",
      ),
    },
    {
      type: "paragraph",
      id: "how-2",
      text: L(
        "Product labels and available periods can vary as GGLBET improves the signed-in experience. This support page explains the ideas and habits; the account responsible-gaming section shows what is actually offered to you today. When you need the official product source for a live detail, confirm inside your session or on gglbet5.com. Do not invent expectations about licenses or payout percentages from marketing language—safer play is about your limits and behaviour, not RTP claims.",
        "隨著 GGLBET 改善已登入體驗，產品名稱與可用期間可能變化。本支援頁解釋概念與習慣；帳號負責任博彩區顯示你今天實際可用的項目。需要即時細節的官方產品來源時，請在工作階段或 gglbet5.com 確認。勿從行銷用語發明執照或派彩百分比預期——較安全遊玩關乎你的上限與行為，而非 RTP 主張。",
      ),
    },
    {
      type: "heading",
      id: "tools",
      text: L("Tools available on a GGLBET account", "GGLBET 帳號可用工具"),
      anchor: "tools",
    },
    {
      type: "comparison",
      id: "tools-table",
      caption: L(
        "What each GGLBET tool is for",
        "各 GGLBET 工具用途",
      ),
      headers: [
        L("Tool", "工具"),
        L("What it constrains", "限制什麼"),
        L("When tightening applies", "調降何時生效"),
      ],
      rows: [
        [
          L("Deposit limit", "存款上限"),
          L("Funding over a chosen period", "選定期間的入金"),
          L("Immediately", "立即"),
        ],
        [
          L("Time / session control", "時間／工作階段控制"),
          L("How long you stay in play", "你停留遊玩多久"),
          L("Next session or as configured", "依設定於下一場或即時"),
        ],
        [
          L("Cool-off", "冷靜期"),
          L("Short break from play or funding", "短暫停止遊玩或入金"),
          L("Immediately", "立即"),
        ],
        [
          L("Self-exclusion", "自我排除"),
          L("Longer fixed closure of access", "較長固定期間關閉存取"),
          L("Immediately; treat as lasting", "立即；視為持續有效"),
        ],
      ],
    },
    {
      type: "paragraph",
      id: "tools-detail",
      text: L(
        "A deposit limit is usually the clearest starting point because it maps to an entertainment budget you can write down offline. Choose a ceiling you can afford to lose entirely without touching rent, bills, or savings, then set the GGLBET limit at or slightly below that number. Raising a limit later often includes a delay by design so a frustrated moment cannot instantly undo a careful one. Lowering a limit should not wait—reductions are the tool you use when warning signs appear.",
        "存款上限通常是最清楚的起點，因為它對應你可離線寫下的娛樂預算。選擇一筆你即使完全失去也不會動到房租、帳單或儲蓄的上限，然後把 GGLBET 限額設在該數字或略低。之後提高上限通常故意包含等待期，避免挫折時刻瞬間推翻謹慎決定。調降上限不應等待——當警訊出現時，調降就是你該用的工具。",
      ),
    },
    {
      type: "heading",
      id: "time-limits",
      text: L("Time limits and session awareness", "時間上限與工作階段覺察"),
      anchor: "time-limits",
    },
    {
      type: "paragraph",
      id: "time-1",
      text: L(
        "Fast game rounds and live tables can compress your sense of time. A GGLBET time limit or session reminder exists so the clock remains visible even when the session feels absorbing. Pick a duration that matches how long you can still make deliberate decisions—often forty-five to ninety minutes for many players—and treat the reminder as a hard checkpoint rather than a suggestion to dismiss without reading. Pair time controls with deposit limits; money caps alone do not fix sessions that quietly consume an evening.",
        "快速局數與真人桌可能壓縮時間感。GGLBET 時間上限或工作階段提醒的存在，是為了即使場次很投入，時鐘仍保持可見。選擇一段你仍能做有意識決定的時長——對許多玩家常是四十五到九十分鐘——並把提醒當成硬性檢查點，而非不讀就關掉的建議。請把時間控制與存款上限搭配；只有金錢上限無法修正悄悄佔用整晚的場次。",
      ),
    },
    {
      type: "heading",
      id: "self-exclusion",
      text: L("Cool-off and self-exclusion", "冷靜期與自我排除"),
      anchor: "self-exclusion",
    },
    {
      type: "paragraph",
      id: "exclusion-1",
      text: L(
        "Cool-off is for short distance: a day to a few weeks where you step away without making a long-term commitment yet. Self-exclusion is for when you need a longer, harder stop and should assume you will not reverse it early. Both are player-safety tools, not punishments. If you are unsure which fits, start by lowering deposit and time limits immediately, then read the live cool-off and exclusion options in your signed-in GGLBET settings before you choose. Independent help is appropriate whenever gambling stops feeling optional.",
        "冷靜期用於短暫距離：一天到數週先離開，尚未做長期承諾。自我排除用於你需要更長、更硬的停止，並應假設不能提早撤回。兩者都是玩家安全工具，不是處罰。若不確定哪個適合，請先立即調降存款與時間上限，再於已登入的 GGLBET 設定閱讀即時冷靜期與排除選項後決定。只要博彩不再像可選擇，就適合尋求獨立協助。",
      ),
    },
    {
      type: "steps",
      id: "action-steps",
      title: L("Four steps you can take right now", "你現在就能採取的四步驟"),
      steps: [
        {
          title: L("Open responsible-gaming settings", "開啟負責任博彩設定"),
          text: L(
            "Sign in to GGLBET and locate the player-protection or responsible-gaming section in account settings.",
            "登入 GGLBET，在帳號設定找到玩家保護或負責任博彩區。",
          ),
        },
        {
          title: L("Set or lower a deposit limit", "設定或調降存款上限"),
          text: L(
            "Choose a ceiling based on money already budgeted for entertainment. Reductions apply immediately.",
            "依已編入娛樂預算的金錢選擇上限。調降會立即生效。",
          ),
        },
        {
          title: L("Add a time or session control", "加入時間或工作階段控制"),
          text: L(
            "Pick a duration you can keep while still making deliberate choices, then honour the reminder.",
            "選擇你仍能做有意識決定的時長，並遵守提醒。",
          ),
        },
        {
          title: L("Use cool-off or get help if needed", "需要時使用冷靜期或求助"),
          text: L(
            "If play no longer feels optional, take a cool-off or self-exclusion and contact independent support.",
            "若遊玩不再像可選擇，請採取冷靜期或自我排除，並聯絡獨立協助。",
          ),
        },
      ],
    },
    {
      type: "heading",
      id: "warning-signs",
      text: L("Warning signs to take seriously", "需認真看待的警訊"),
      anchor: "warning-signs",
    },
    {
      type: "checklist",
      id: "signs",
      title: L("Pause GGLBET play if any of these are true", "若有以下情況請暫停 GGLBET 遊玩"),
      items: [
        L(
          "You are betting mainly to win back money already lost.",
          "你主要是為了贏回已失去的錢而下注。",
        ),
        L(
          "You are funding play with money meant for bills, rent, or food.",
          "你用本應用於帳單、房租或食物的錢資助遊玩。",
        ),
        L(
          "You hide time or spend from people close to you.",
          "你對親近的人隱瞞時間或花費。",
        ),
        L(
          "You feel anxious or irritable when you cannot log in or deposit.",
          "無法登入或存款時感到焦慮或易怒。",
        ),
        L(
          "Sessions regularly run longer than you intended.",
          "場次經常比你預期的更長。",
        ),
        L(
          "You have borrowed money to continue playing.",
          "你曾借錢以繼續遊玩。",
        ),
      ],
    },
    {
      type: "callout",
      id: "help-callout",
      variant: "info",
      title: L("Help is part of player safety", "協助是玩家安全的一部分"),
      body: L(
        "GGLBET account tools can reduce harm quickly, but they are not a substitute for professional or community support when gambling is affecting health, relationships, or finances. Reach outward early.",
        "GGLBET 帳號工具能快速降低傷害，但當博彩影響健康、關係或財務時，它們不能取代專業或社群協助。請及早向外求助。",
      ),
    },
    {
      type: "heading",
      id: "privacy",
      text: L("Privacy and dignity while using controls", "使用控制時的隱私與尊嚴"),
      anchor: "privacy",
    },
    {
      type: "paragraph",
      id: "privacy-1",
      text: L(
        "Safer-play choices belong in your GGLBET account settings. You should not need to justify a deposit limit in a public chat, and no one legitimate will ask you to share screenshots of your limits to “prove” something in a messaging app. Be careful with anyone who frames responsible gaming as weakness or who pressures you to raise limits during a losing streak. Player safety includes protecting your privacy while you use the tools designed to keep entertainment intentional.",
        "較安全遊玩選擇屬於你的 GGLBET 帳號設定。你不需要在公開聊天為存款上限辯護，也沒有合法人士會要求你在通訊軟體分享上限截圖來「證明」什麼。對把負責任博彩說成軟弱，或在連輸時施壓你提高上限的人保持謹慎。玩家安全也包括在使用這些讓娛樂保持有意識的工具時保護隱私。",
      ),
    },
    {
      type: "paragraph",
      id: "privacy-2",
      text: L(
        "If social pressure shows up around GGLBET login or deposit moments—friends urging “one more top-up,” group chats sharing unofficial payment agents, or strangers offering to “manage limits for you”—pause. Your ceilings are yours. Returning to this responsible-gaming hub, the payment page, and official support keeps the conversation on tools you control rather than shortcuts that create new risk.",
        "若社群壓力出現在 GGLBET 登入或存款時刻——朋友催促「再儲一次」、群組分享非官方支付代理，或陌生人提出「代管上限」——請暫停。上限是你的。回到本負責任博彩中心、支付頁與官方客服，能讓對話留在你能控制的工具，而非製造新風險的捷徑。",
      ),
    },
    {
      type: "callout",
      id: "deposit-link",
      variant: "tip",
      title: L("Connect limits to GGLBET deposits", "把上限連結到 GGLBET 存款"),
      body: L(
        "The best time to configure a deposit limit is before you open the cashier—not after a large transfer already cleared. Pair this page with the GGLBET payment hub so funding and safer play stay in the same mental checklist.",
        "設定存款上限的最佳時機是開啟出納之前——而非大額轉帳已入帳之後。請把本頁與 GGLBET 支付中心搭配，讓入金與較安全遊玩留在同一心智檢查清單。",
      ),
    },
    {
      type: "heading",
      id: "review-habit",
      text: L(
        "A simple monthly review habit for GGLBET players",
        "給 GGLBET 玩家的簡單每月複核習慣",
      ),
      anchor: "review-habit",
    },
    {
      type: "paragraph",
      id: "review-1",
      text: L(
        "Limits drift when life changes. Income shifts, stress rises, or a promotion calendar tempts larger deposits than your original entertainment budget allowed. Once a month—ideally on a calm weekday—open your GGLBET responsible-gaming settings, screenshot the active ceilings, and ask whether those numbers still match money you can afford to lose entirely. If the answer is no, lower them immediately. If you have been dismissing every session reminder, shorten the time window. A short review prevents the common pattern where yesterday’s careful limit becomes today’s ignored default.",
        "生活改變時上限會漂移。收入變動、壓力上升，或優惠行事曆誘使比原本娛樂預算更大的存款。每月一次——最好在平靜平日——開啟 GGLBET 負責任博彩設定，截圖現行上限，並自問這些數字是否仍符合你能完全承受失去的金錢。若答案是否，請立即調降。若你一直關掉每次工作階段提醒，請縮短時間視窗。短暫複核可避免昨天謹慎的上限，變成今天被忽略的預設。",
      ),
    },
    {
      type: "paragraph",
      id: "review-2",
      text: L(
        "Malaysia players who juggle GGLBET login across phone and browser should confirm the same ceilings appear after download installs. Account-level tools travel with credentials, but first-launch checks catch surprises early. When you help a friend or family member, sit beside them while they click—never take their password “to set it up faster.” Product questions go to official GGLBET support; wellbeing questions go to independent help. Keeping those lanes separate protects both privacy and clarity.",
        "在手機與瀏覽器之間切換 GGLBET 登入的馬來西亞玩家，應在下載安裝後確認相同上限出現。帳號層工具跟隨憑證，但首次啟動檢查能及早發現意外。協助朋友或家人時，請陪在旁邊讓他們自行點選——絕不要為了「更快設好」拿走他們的密碼。產品問題交給官方 GGLBET 客服；身心問題交給獨立協助。分開這些管道可同時保護隱私與清晰度。",
      ),
    },
    {
      type: "paragraph",
      id: "review-3",
      text: L(
        "Finally, remember what this page does not claim. GGLBET support content explains safer-play habits and where to find tools; it does not invent licenses, RTP figures, or guarantees that entertainment outcomes will feel fair every session. Confirm live tool labels inside your signed-in session or on gglbet5.com when you need the official product source. The useful outcome is practical: deposit and time ceilings set before urgency, cool-off or self-exclusion available when you need distance, and a clear path to help when play stops feeling optional.",
        "最後請記住本頁不主張什麼。GGLBET 支援內容解釋較安全遊玩習慣與何處找到工具；它不發明執照、RTP 數字，或保證每場娛樂結果都感覺公平。需要官方產品來源時，請在已登入工作階段或 gglbet5.com 確認即時工具名稱。有用的結果很務實：在急迫前設好存款與時間上限、需要距離時可用冷靜期或自我排除，以及當遊玩不再像可選擇時有清楚的求助路徑。",
      ),
    },
    {
      type: "paragraph",
      id: "closing",
      text: L(
        "Use this GGLBET responsible-gaming hub to choose tools on purpose, then confirm the live controls after login. If you are helping someone else, encourage them to set limits themselves inside their own account rather than sharing passwords. When entertainment stops feeling optional, lower limits immediately, consider cool-off or self-exclusion, and seek independent help without waiting for a perfect plan.",
        "用此 GGLBET 負責任博彩中心有意識地選擇工具，接著在登入後確認即時控制。若你在協助他人，請鼓勵他們在自己帳號內自行設定上限，而非分享密碼。當娛樂不再像可選擇，請立即調降上限、考慮冷靜期或自我排除，並尋求獨立協助，無需等待完美計畫。",
      ),
    },
  ] as unknown as TrustPageBlock[],
  visualSections: [
    {
      id: "visual-responsible",
      eyebrow: L("How it works", "如何運作"),
      heading: L(
        "GGLBET limits you set before the session starts",
        "在場次開始前設定的 GGLBET 上限",
      ),
      subheading: L(
        "Calm decisions beat in-session urgency",
        "平靜決定勝過場次中的急迫",
      ),
      body: L(
        "Open responsible-gaming settings while you are clear-headed, choose deposit and time ceilings you can keep, and let GGLBET enforce them when a session becomes absorbing. Confirm live labels inside your signed-in account.",
        "在頭腦清楚時開啟負責任博彩設定，選擇你能守住的存款與時間上限，並在場次變得投入時讓 GGLBET 執行。請在已登入帳號確認即時名稱。",
      ),
      mediaSrc: HUB_MEDIA.rgTools,
      mediaAlt: L(
        "GGLBET responsible gaming visual",
        "GGLBET 負責任博彩視覺",
      ),
      points: [
        {
          title: L("Lower immediately", "立即調降"),
          body: L(
            "Tightening a limit should not wait for “later.”",
            "調降上限不應等到「之後」。",
          ),
        },
        {
          title: L("Raise carefully", "謹慎調升"),
          body: L(
            "Increases often include a deliberate delay.",
            "調升通常包含刻意等待期。",
          ),
        },
      ],
      ctas: [
        { label: L("Log in to GGLBET", "登入 GGLBET") as unknown as string, href: ROUTES.login, variant: "primary" },
        { label: L("Register on GGLBET", "註冊 GGLBET") as unknown as string, href: ROUTES.register, variant: "outline" },
      ],
    },
    {
      id: "visual-tools-security",
      eyebrow: L("Tools", "工具"),
      heading: L(
        "Deposit, time, cool-off, and exclusion tools",
        "存款、時間、冷靜期與排除工具",
      ),
      subheading: L(
        "Pick the control that matches the risk you see",
        "選擇符合你所見風險的控制",
      ),
      body: L(
        "Use deposit limits for funding ceilings, time controls for session length, cool-off for short distance, and self-exclusion for a longer hard stop. These GGLBET tools support player safety without public explanation.",
        "用存款上限限制入金、用時間控制限制場次長度、用冷靜期取得短暫距離、用自我排除做更長硬性停止。這些 GGLBET 工具支援玩家安全，無需公開解釋。",
      ),
      mediaSrc: HUB_MEDIA.rgWarning,
      mediaAlt: L("GGLBET player safety tools visual", "GGLBET 玩家安全工具視覺"),
      flip: true,
      points: [
        {
          title: L("Budget offline first", "先離線編預算"),
          body: L(
            "Write the entertainment ceiling before you type it in.",
            "輸入前先寫下娛樂上限。",
          ),
        },
        {
          title: L("Honour reminders", "遵守提醒"),
          body: L(
            "Dismissing every session alert defeats the tool.",
            "每次都關掉提醒等於讓工具失效。",
          ),
        },
      ],
    },
    {
      id: "visual-warning",
      eyebrow: L("Warning signs", "警訊"),
      heading: L(
        "Notice chase behaviour early on GGLBET",
        "及早留意 GGLBET 上的追損行為",
      ),
      subheading: L(
        "Hiding spend, borrowed money, and login anxiety",
        "隱瞞花費、借錢與登入焦慮",
      ),
      body: L(
        "If you are chasing losses, funding play from essentials, or feeling irritable when you cannot deposit, pause. Lower limits immediately, consider cool-off, and treat independent help as a strength—not a last resort after everything collapses.",
        "若你在追損、用生活必需金資助遊玩，或無法存款時易怒，請暫停。立即調降上限、考慮冷靜期，並把獨立協助當成力量——而非一切崩壞後的最後手段。",
      ),
      mediaSrc: HUB_MEDIA.rgHelp,
      mediaAlt: L("GGLBET warning signs visual", "GGLBET 警訊視覺"),
      points: [
        {
          title: L("One signal is enough", "一個訊號就夠"),
          body: L(
            "You do not need every warning sign to act.",
            "不必等齊所有警訊才行動。",
          ),
        },
        {
          title: L("Act in the account", "在帳號內行動"),
          body: L(
            "Change settings yourself—never share your password.",
            "自行更改設定——絕不分享密碼。",
          ),
        },
      ],
    },
    {
      id: "visual-help",
      eyebrow: L("Help", "協助"),
      heading: L(
        "Combine GGLBET tools with real-world support",
        "把 GGLBET 工具與現實協助結合",
      ),
      subheading: L(
        "Account controls plus people who can help",
        "帳號控制加上能幫忙的人",
      ),
      body: L(
        "When gambling affects health, relationships, or finances, use GGLBET cool-off or self-exclusion and also seek independent support. Contact official GGLBET support for product questions; use external help for wellbeing. Confirm live exclusion options after login.",
        "當博彩影響健康、關係或財務時，請使用 GGLBET 冷靜期或自我排除，並同時尋求獨立協助。產品問題聯絡官方 GGLBET 客服；身心狀況使用外部協助。登入後確認即時排除選項。",
      ),
      mediaSrc: HUB_MEDIA.rgExternalHelp,
      mediaAlt: L("GGLBET help and support visual", "GGLBET 協助與支援視覺"),
      flip: true,
      ctas: [
        { label: L("Contact GGLBET", "聯絡 GGLBET") as unknown as string, href: ROUTES.contact, variant: "secondary" },
        { label: L("GGLBET Payment methods", "GGLBET 支付方式") as unknown as string, href: ROUTES.payment, variant: "outline" },
      ],
    },
  ],
  faqHeading: L(
    "GGLBET responsible gaming FAQ",
    "GGLBET 負責任博彩常見問題",
  ),
  faqSubheading: L(
    "Limits, exclusion, privacy, and help for Malaysia players",
    "給馬來西亞玩家的上限、排除、隱私與協助",
  ),
  faqBody: L(
    "These answers explain safer-play habits on GGLBET. Confirm live tool labels and periods inside your signed-in account.",
    "這些回答說明 GGLBET 上的較安全遊玩習慣。請在已登入帳號確認即時工具名稱與期間。",
  ),
  faq: [
    {
      question: L(
        "What is responsible gaming on GGLBET?",
        "GGLBET 上的負責任博彩是什麼？",
      ),
      answer: L(
        "Responsible gaming on GGLBET means deciding money and time ceilings while you are calm, configuring those ceilings in account tools, and stopping when they are reached—win or lose. It sits beside login, register, deposit, and download moments for Malaysia players who want entertainment to stay intentional. Confirm live controls after you sign in rather than relying only on documentation.",
        "GGLBET 上的負責任博彩代表在平靜時決定金錢與時間上限、在帳號工具設定它們，並在達到時停止——無論輸贏。對希望娛樂保持有意識的馬來西亞玩家而言，它與登入、註冊、存款與下載時刻並存。請在登入後確認即時控制，而非只依賴文件。",
      ),
    },
    {
      question: L(
        "How do I set a GGLBET deposit limit?",
        "如何設定 GGLBET 存款上限？",
      ),
      answer: L(
        "Sign in, open account responsible-gaming or player-protection settings, and choose a daily, weekly, or monthly deposit ceiling based on entertainment money you can afford to lose. Set it before you open the cashier. Tightening applies immediately. Confirm the exact labels and periods shown in your live session; documentation explains the habit, while the account shows today’s options.",
        "登入後開啟帳號負責任博彩或玩家保護設定，並依你能承受失去的娛樂金選擇每日、每週或每月存款上限。請在開啟出納前設定。調降會立即生效。請確認即時工作階段顯示的確切名稱與期間；文件解釋習慣，帳號則顯示今天的選項。",
      ),
    },
    {
      question: L(
        "How do GGLBET time limits or session reminders help?",
        "GGLBET 時間上限或工作階段提醒有何幫助？",
      ),
      answer: L(
        "Time controls keep the clock visible when fast rounds compress your sense of duration. Choose a window that still allows deliberate decisions, then treat reminders as checkpoints. Pair them with deposit limits so both money and time stay intentional. If your live account offers slightly different naming, use the option that caps or reminds session length.",
        "時間控制在快速局數壓縮時長感時，讓時鐘保持可見。選擇仍能做有意識決定的時段，並把提醒當成檢查點。請與存款上限搭配，讓金錢與時間都保持有意識。若即時帳號名稱略有不同，請使用能限制或提醒場次長度的選項。",
      ),
    },
    {
      question: L(
        "What is self-exclusion on GGLBET?",
        "GGLBET 上的自我排除是什麼？",
      ),
      answer: L(
        "Self-exclusion is a longer, harder stop that closes access for a fixed period when you need more than a short cool-off. Treat it as a serious commitment and assume early reversal is not available. Read the live periods and consequences in your signed-in settings before you confirm. If gambling already feels compulsory, combine exclusion with independent help.",
        "自我排除是比短暫冷靜期更長、更硬的停止，會在固定期間關閉存取。請視為認真承諾，並假設不能提早撤回。確認前請閱讀已登入設定中的即時期間與後果。若博彩已感覺無法選擇，請把排除與獨立協助結合。",
      ),
    },
    {
      question: L(
        "What is cool-off compared with self-exclusion?",
        "冷靜期與自我排除有何不同？",
      ),
      answer: L(
        "Cool-off is a shorter break that creates distance without the same long commitment as self-exclusion. Use cool-off when you need space after a difficult session but are not ready for a long closure. Use self-exclusion when you need a firmer, longer stop. Lower deposit and time limits immediately in either case while you decide.",
        "冷靜期是較短的休息，創造距離但沒有自我排除那麼長的承諾。當困難場次後需要空間、但尚未準備長期關閉時，使用冷靜期。當你需要更堅定、更長的停止時，使用自我排除。無論哪種，決定期間請立即調降存款與時間上限。",
      ),
    },
    {
      question: L(
        "Do GGLBET responsible-gaming limits apply on the app and web?",
        "GGLBET 負責任博彩上限在應用與網頁都適用嗎？",
      ),
      answer: L(
        "Yes. Limits belong to your GGLBET account. After you log in on mobile web or an official app path, the same safer-play settings should apply. Confirm values on first launch after download. If numbers differ from what you set earlier, adjust them in account settings and contact support with your registered email if they still look wrong.",
        "適用。上限屬於你的 GGLBET 帳號。在行動網頁或官方應用路徑登入後，相同的較安全遊玩設定應一併適用。下載後首次啟動時請確認數值。若與先前設定不同，請在帳號設定調整；若仍不對，請用註冊電郵聯絡客服。",
      ),
    },
    {
      question: L(
        "What warning signs mean I should pause GGLBET play?",
        "哪些警訊代表我應暫停 GGLBET 遊玩？",
      ),
      answer: L(
        "Pause if you chase losses, fund play from essentials, hide spend, feel irritable when you cannot log in or deposit, run past intended session length, or borrow money to continue. One signal is enough to lower limits immediately. Consider cool-off and independent help if optional entertainment no longer describes how play feels.",
        "若你追損、用生活必需金資助遊玩、隱瞞花費、無法登入或存款時易怒、超過預定場次長度，或借錢繼續，請暫停。一個訊號就足以立即調降上限。若可選擇的娛樂已不再形容遊玩感受，請考慮冷靜期與獨立協助。",
      ),
    },
    {
      question: L(
        "Are my GGLBET safer-play settings private?",
        "我的 GGLBET 較安全遊玩設定是私人的嗎？",
      ),
      answer: L(
        "Safer-play controls live in your account settings and are not something other players need to see. Do not share passwords or limit screenshots in chats. No legitimate person needs you to “prove” a deposit limit via messaging apps. Privacy is part of player safety while you use GGLBET tools.",
        "較安全遊玩控制存在於你的帳號設定，其他玩家不需要看見。勿在聊天中分享密碼或上限截圖。沒有合法人士需要你透過通訊軟體「證明」存款上限。使用 GGLBET 工具時，隱私是玩家安全的一部分。",
      ),
    },
    {
      question: L(
        "Should I set limits before my first GGLBET deposit?",
        "首次 GGLBET 存款前就該設定上限嗎？",
      ),
      answer: L(
        "Yes. The best moment is before the cashier, while you are still deciding with a clear budget. Setting limits after a large deposit already cleared is harder emotionally even when the tools still work. Pair this responsible-gaming page with the GGLBET payment hub so funding and safer play stay on the same checklist for Malaysia players.",
        "應該。最佳時機是出納之前，你仍用清楚預算做決定時。即使工具仍可用，大額存款已入帳後再設上限在情緒上也更難。請把本負責任博彩頁與 GGLBET 支付中心搭配，讓馬來西亞玩家的入金與較安全遊玩留在同一檢查清單。",
      ),
    },
    {
      question: L(
        "Can someone else set GGLBET limits for me?",
        "別人可以幫我設定 GGLBET 上限嗎？",
      ),
      answer: L(
        "You should configure limits yourself inside your own signed-in account. Do not share login credentials so a friend or family member can “help.” They can sit with you while you click, but the password stays yours. If you need product guidance, contact official GGLBET support; if you need wellbeing support, use independent help channels.",
        "你應在自己已登入的帳號內自行設定上限。勿分享登入憑證讓朋友或家人「代勞」。他們可以陪你點選，但密碼仍是你的。若需產品指引，請聯絡官方 GGLBET 客服；若需身心協助，請使用獨立協助管道。",
      ),
    },
    {
      question: L(
        "What if I want to raise a GGLBET limit during a losing session?",
        "連輸場次中想提高 GGLBET 上限怎麼辦？",
      ),
      answer: L(
        "Treat the urge to raise limits mid-loss as a warning sign. Many safer-play designs delay increases so a frustrated moment cannot instantly undo a careful ceiling. Step away, honour any waiting period, and consider lowering the limit instead. If you cannot tolerate the wait, take a cool-off and seek help rather than searching for workarounds.",
        "把連輸中想提高上限的衝動當成警訊。許多較安全遊玩設計會延遲調升，避免挫折時刻瞬間推翻謹慎上限。請先離開、遵守任何等待期，並考慮改為調降。若無法忍受等待，請採取冷靜期並求助，而非尋找變通。",
      ),
    },
    {
      question: L(
        "Where do I confirm live GGLBET responsible-gaming options?",
        "在哪裡確認即時 GGLBET 負責任博彩選項？",
      ),
      answer: L(
        "Confirm inside your signed-in GGLBET account settings after login. This support page explains concepts and habits; the product shows the controls available to you today. When you need the official product source for a live detail, use your session or gglbet5.com. Documentation cannot freeze every label forever as the experience improves.",
        "登入後於已登入的 GGLBET 帳號設定確認。本支援頁解釋概念與習慣；產品顯示你今天可用的控制。需要即時細節的官方產品來源時，請使用工作階段或 gglbet5.com。隨著體驗改善，文件無法永遠凍結每個名稱。",
      ),
    },
    {
      question: L(
        "How do GGLBET responsible-gaming tools relate to payments?",
        "GGLBET 負責任博彩工具與支付有何關係？",
      ),
      answer: L(
        "Deposit limits directly shape what you can fund through the GGLBET cashier. Set the limit first, then deposit. Withdrawal reviews and payment security are separate topics covered on the payment hub, but chasing losses often shows up as repeated deposits—exactly what a well-set ceiling is meant to interrupt. Keep both hubs in your support rotation.",
        "存款上限直接影響你能透過 GGLBET 出納入金多少。請先設上限再存款。出款審核與支付安全是支付中心涵蓋的不同主題，但追損常表現為反覆存款——正是設好的上限要打斷的行為。請把兩個中心都留在支援輪替中。",
      ),
    },
  ],
  finalCta: {
    eyebrow: L("Stay in control", "保持掌控"),
    heading: L(
      "Set GGLBET limits before your next session",
      "在下一場之前設定 GGLBET 上限",
    ),
    subheading: L(
      "Log in, review tools, or ask for product help",
      "登入、檢視工具，或詢問產品協助",
    ),
    body: L(
      "Open your signed-in GGLBET account to configure deposit and time limits, consider cool-off if you need distance, and keep payment funding aligned with safer-play choices.",
      "開啟已登入的 GGLBET 帳號設定存款與時間上限，需要距離時考慮冷靜期，並讓支付入金與較安全遊玩選擇一致。",
    ),
    mediaSrc: HUB_MEDIA.rgCta,
    mediaAlt: L("GGLBET responsible gaming next steps", "GGLBET 負責任博彩下一步"),
    ctas: [
      { label: L("Log in to GGLBET", "登入 GGLBET") as unknown as string, href: ROUTES.login, variant: "primary" },
      { label: L("Register on GGLBET", "註冊 GGLBET") as unknown as string, href: ROUTES.register, variant: "outline" },
      { label: L("GGLBET Payment methods", "GGLBET 支付方式") as unknown as string, href: ROUTES.payment, variant: "secondary" },
      { label: L("Contact GGLBET", "聯絡 GGLBET") as unknown as string, href: ROUTES.contact, variant: "soft" },
    ],
  },
});
