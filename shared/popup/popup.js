const KEY = "crtl_enabled";

document.documentElement.lang = chrome.i18n.getUILanguage();
document.documentElement.dir = chrome.i18n.getMessage("@@bidi_dir") || "ltr";

document.querySelectorAll("[data-i18n]").forEach((el) => {
  const msg = chrome.i18n.getMessage(el.dataset.i18n);
  if (msg) el.textContent = msg;
});

const cb = document.getElementById("toggle");

chrome.storage.local.get([KEY], (r) => {
  cb.checked = r && r[KEY] !== undefined ? r[KEY] : true;
});

cb.addEventListener("change", () => {
  chrome.storage.local.set({ [KEY]: cb.checked });
});
