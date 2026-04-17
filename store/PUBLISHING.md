# دليل نشر Claude RTL على المتاجر

## التحضير (مرة واحدة)

```bash
cd ~/claude-RTL
bash scripts/build.sh          # ينتج dist/chromium و dist/firefox
bash scripts/package.sh        # ينتج dist/claude-rtl-chromium.zip و claude-rtl-firefox.zip
```

عندك بعدها:
- `dist/claude-rtl-chromium.zip` — للرفع على Chrome Web Store
- `dist/claude-rtl-firefox.zip` — للرفع على Firefox AMO

---

## 1) Chrome Web Store

### الحساب
1. روح لـ https://chrome.google.com/webstore/devconsole
2. سجّل دخول بحساب Google تبغى تستخدمه كمطور
3. ادفع **$5 رسوم تسجيل لمرة واحدة** (تخلّيك تنشر حتى 20 إضافة)
4. اتفق على شروط المطور

### الرفع
1. اضغط **New Item**
2. ارفع `dist/claude-rtl-chromium.zip`
3. املأ الحقول:
   - **Product details → Description:** انسخ من `store/description.md` (القسم العربي)
   - **Category:** Productivity
   - **Language:** Arabic
   - **Store listing → Icon:** `shared/icons/icon128.png` (أو نسخة أعلى دقة إذا عندك)
   - **Screenshots:** 1-5 صور بدقة 1280×800 أو 640×400 (PNG/JPEG)
     - اصنعها بفتح claude.ai بعد تثبيت الإضافة وأخذ لقطة لمحادثة عربية
   - **Small promo tile:** 440×280 PNG (اختياري لكن ينصح به)
4. **Privacy practices:**
   - **Single purpose:** "Apply RTL/LTR text direction on claude.ai per paragraph."
   - **Permission justifications:**
     - `storage`: "To persist the on/off toggle state as a single boolean."
     - `host permissions (claude.ai)`: "To inject a content script and CSS that set `dir` attributes on paragraphs for RTL/LTR alignment."
   - **Data usage:** اختر "I do not collect or use user data"
   - **Privacy policy URL:** ارفع `store/PRIVACY.md` على GitHub Pages أو كـ gist، وحط الرابط هنا. مثلاً: `https://github.com/irukhaimi/claude-RTL/blob/main/store/PRIVACY.md`
5. **Distribution:** Public (أو Unlisted إذا تبغى تجربه مع ناس محدودين)
6. اضغط **Submit for review**

### مدة المراجعة
عادة 1-3 أيام. يصلك إيميل بالقبول أو بتعديلات مطلوبة.

---

## 2) Firefox Add-ons (AMO)

### الحساب
1. روح لـ https://addons.mozilla.org/developers/
2. سجّل حساب Firefox (أو استخدم موجود) — **مجاني بالكامل**

### الرفع
1. اضغط **Submit a New Add-on**
2. اختر **"On this site"** (مُدرَج في المتجر)
3. ارفع `dist/claude-rtl-firefox.zip`
4. AMO يطلب أحياناً **source code** — نفس الملف يصلح، أو ارفع `dist/claude-rtl-firefox-source.zip` اذا حاب تفصل
5. اختر الإصدارات المدعومة: **Firefox Desktop** (115+)
6. **Add-on details:**
   - **Name:** Claude RTL
   - **Summary:** انسخ من `store/description.md`
   - **Description:** القسم العربي من description.md
   - **Categories:** Other → Productivity
   - **Support site / email:** رابط GitHub Issues
   - **License:** MIT
7. **Privacy Policy:** انسخ محتوى `store/PRIVACY.md` في الحقل أو حط رابط GitHub
8. اضغط **Submit Version**

### مدة المراجعة
عادة سريعة (ساعات إلى يومين للإضافات البسيطة). أحياناً automated approval فوري.

---

## 3) نصائح عامة

### رقم الإصدار
قبل الرفع، ارفع رقم الإصدار في **كلا** الـ manifests:
```bash
# chromium/manifest.json و firefox/manifest.json
"version": "1.0.0" → "1.0.1"
```
المتاجر ترفض إعادة رفع نفس الإصدار.

### الـ Extension ID لفايرفوكس
ملفنا يستخدم `claude-rtl@example.com` كـ placeholder. قبل النشر الرسمي، غيّرها لشي يملكه شخص موجود، مثلاً:
```json
"id": "claude-rtl@irukhaimi.dev"
```
(ما يلزم يكون بريد فعلي، لكن الدومين يفضل يكون ملكك أو مسجّل باسمك)

### Screenshots المطلوبة
أنصح تصوّر:
1. محادثة عربية كاملة بعد تطبيق RTL (قبل/بعد)
2. فقرة مختلطة (JavaScript + عربي) وكيف تُحاذى صح
3. كتلة كود داخل فقرة عربية — الكود LTR، النص RTL
4. الـ popup مع الـ toggle

### تحديث مستقبلي
بعد كل تعديل:
```bash
# ارفع الإصدار في manifests
bash scripts/build.sh
bash scripts/package.sh
# ارفع zip الجديد في dashboard كل متجر → "Upload new version"
```
