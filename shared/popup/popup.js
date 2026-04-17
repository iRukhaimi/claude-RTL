const KEY = "crtl_enabled";
const cb = document.getElementById("toggle");

chrome.storage.local.get([KEY], (r) => {
  cb.checked = r && r[KEY] !== undefined ? r[KEY] : true;
});

cb.addEventListener("change", () => {
  chrome.storage.local.set({ [KEY]: cb.checked });
});
