// Chủ: Nam. Đọc tin mới trên trang chat → ghép theo định dạng hợp đồng → nhờ service worker gọi /analyze → hiện overlay.
// Bản đầu chạy trên public/fake-zalo.html (DOM do mình kiểm soát). Muốn chạy trên Zalo Web thật:
// thêm một mục vào SITES với selector thật, và thêm domain vào "matches" của manifest.json.
(() => {
  const CFG = self.LLC_CONFIG;

  // Mỗi trang chat khai báo cách đọc tin. Hợp đồng định dạng: docs/QUY_UOC_CHUNG.md mục 1.2
  const SITES = [
    {
      match: () => location.pathname.endsWith("/fake-zalo.html"),
      container: "#chat",
      message: ".msg",
      isOutgoing: (el) => el.dataset.direction === "out",
      sender: (el) => el.dataset.sender || "Người lạ",
      text: (el) => el.querySelector(".msg-text")?.textContent ?? "",
    },
  ];

  const site = SITES.find((s) => s.match());
  if (!site) return;

  /** Mỗi tin một dòng "<Tên>: <nội dung>", tin mình gửi ghi "Tôi:", tối đa MAX_MESSAGES tin, cắt từ phía tin cũ cho vừa MAX_CHARS. */
  function buildConversation() {
    const lines = [...document.querySelectorAll(`${site.container} ${site.message}`)]
      .slice(-CFG.MAX_MESSAGES)
      .map((el) => {
        const who = site.isOutgoing(el) ? "Tôi" : site.sender(el).trim();
        const text = site.text(el).replace(/\s*\n\s*/g, " ").trim();
        return text ? `${who}: ${text}` : null;
      })
      .filter(Boolean);
    while (lines.length > 1 && lines.join("\n").length > CFG.MAX_CHARS) lines.shift();
    return lines.join("\n").normalize("NFC").slice(-CFG.MAX_CHARS);
  }

  function removeOverlay() {
    document.getElementById("llc-overlay")?.remove();
  }

  function showOverlay(result) {
    removeOverlay();
    const box = document.createElement("div");
    box.id = "llc-overlay";
    box.setAttribute("role", "alert");
    const level =
      result.risk_score >= CFG.RISK_M3 ? "llc-critical" : result.risk_score >= CFG.RISK_BRAKE ? "llc-danger" : "llc-warn";
    box.className = level;

    const head = document.createElement("div");
    head.className = "llc-head";
    head.textContent = `⚠ Cảnh báo thao túng · rủi ro ${result.risk_score}/100`;
    const close = document.createElement("button");
    close.className = "llc-close";
    close.textContent = "×";
    close.setAttribute("aria-label", "Đóng cảnh báo");
    close.addEventListener("click", removeOverlay);
    head.appendChild(close);

    const translation = document.createElement("p");
    translation.className = "llc-translation";
    translation.textContent = `Câu này nghĩa là: ${result.translation}`;

    const list = document.createElement("ul");
    list.className = "llc-tactics";
    for (const t of result.tactics) {
      const li = document.createElement("li");
      li.textContent = `${t.name}: "${t.evidence}"`;
      list.appendChild(li);
    }

    box.append(head, translation, list);
    document.body.appendChild(box);
  }

  let timer = null;
  let lastSent = "";
  let lastAt = 0;

  function schedule() {
    clearTimeout(timer);
    const wait = Math.max(500, CFG.MIN_INTERVAL_MS - (Date.now() - lastAt));
    timer = setTimeout(run, wait);
  }

  async function run() {
    const conversation = buildConversation();
    if (!conversation || conversation === lastSent) return;
    lastSent = conversation;
    lastAt = Date.now();
    const reply = await chrome.runtime.sendMessage({ type: "ANALYZE_REQUEST", conversation });
    const response = reply?.response;
    if (response?.ok && response.result.risk_score >= CFG.RISK_ALERT) showOverlay(response.result);
    else if (response && !response.ok) console.warn("[3 Lớp Lá Chắn]", response.error.code, response.error.message);
  }

  const container = document.querySelector(site.container);
  if (!container) return;
  new MutationObserver((mutations) => {
    // Chỉ gọi khi có tin NHẬN mới
    const incoming = mutations.some((m) =>
      [...m.addedNodes].some((n) => n.nodeType === 1 && n.matches?.(site.message) && !site.isOutgoing(n)),
    );
    if (incoming) schedule();
  }).observe(container, { childList: true, subtree: true });
})();
