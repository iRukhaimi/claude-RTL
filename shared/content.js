(() => {
  const ARABIC = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g;
  const LATIN = /[A-Za-z]/g;
  const SEL = "p,li,h1,h2,h3,h4,h5,h6,blockquote,td,th,dd,dt,figcaption";
  const KEY = "crtl_enabled";
  const MAX_SAMPLE = 4000;

  const dirty = new Set();
  let scheduled = false;

  function setDir(el) {
    if (!el.isConnected) return;
    if (el.closest("pre, code")) return;
    const t = (el.textContent || "").slice(0, MAX_SAMPLE);
    const ar = (t.match(ARABIC) || []).length;
    const la = (t.match(LATIN) || []).length;
    if (ar + la < 2) return;
    const dir = ar >= la ? "rtl" : "ltr";
    if (el.getAttribute("dir") === dir) return;
    el.setAttribute("dir", dir);
    el.setAttribute("data-crtl", "1");
  }

  function flush() {
    scheduled = false;
    for (const el of dirty) setDir(el);
    dirty.clear();
  }

  function queue(el) {
    if (!el) return;
    dirty.add(el);
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(flush);
    }
  }

  function queueScan(root) {
    if (!root || root.nodeType !== 1) return;
    if (root.matches && root.matches(SEL)) queue(root);
    if (root.querySelectorAll) root.querySelectorAll(SEL).forEach(queue);
  }

  const obs = new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === "childList") {
        m.addedNodes.forEach(queueScan);
      } else if (m.type === "characterData") {
        const el = m.target.parentElement && m.target.parentElement.closest(SEL);
        if (el) queue(el);
      }
    }
  });

  let active = false;

  function enable() {
    if (active) return;
    active = true;
    document.documentElement.classList.add("crtl-on");
    if (document.body) {
      queueScan(document.body);
      obs.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }
  }

  function disable() {
    if (!active) return;
    active = false;
    obs.disconnect();
    dirty.clear();
    document.documentElement.classList.remove("crtl-on");
    document.querySelectorAll("[data-crtl]").forEach((el) => {
      el.removeAttribute("dir");
      el.removeAttribute("data-crtl");
    });
  }

  chrome.storage.local.get([KEY], (r) => {
    if ((r && r[KEY] !== undefined ? r[KEY] : true)) enable();
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local" || !changes[KEY]) return;
    changes[KEY].newValue ? enable() : disable();
  });
})();
