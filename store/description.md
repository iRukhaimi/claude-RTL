# وصف المتجر (عربي)

## العنوان القصير (Short title, ≤45 حرف)
Claude RTL — دعم العربية على Claude

## الملخص القصير (Summary, ≤132 حرف — يظهر في نتائج البحث)
إضافة خفيفة تجعل نصوص Claude تقرأ من اليمين إلى اليسار لكل فقرة حسب لغتها، مع إبقاء الكود LTR دائماً.

## الوصف الطويل (Long description)

**Claude RTL** هي إضافة بسيطة جداً وخفيفة جداً تجعل تجربة استخدام claude.ai طبيعية لمن يقرأ ويكتب بالعربية. تكتشف الإضافة لغة كل فقرة على حدة وتحدد اتجاهها تلقائياً:

- الفقرات **العربية** تُحاذى من اليمين لليسار (RTL)
- الفقرات **الإنجليزية** تُحاذى من اليسار لليمين (LTR)
- الفقرات **المختلطة** (مثل: «JavaScript هي لغة برمجة شائعة») تُحاذى حسب **أغلبية الحروف** — عكس معظم الإضافات المشابهة اللي تعتمد فقط على أول حرف قوي
- كتل **الكود** تبقى LTR دائماً، وبشكل معزول (isolate) عن النص المحيط

## ليش هذه الإضافة؟

معظم الإضافات المتاحة لـ Claude RTL تحمّل مئات الأسطر من JavaScript وتطلب صلاحيات واسعة. **Claude RTL** مختلفة:

- **~50 سطر جافاسكربت فقط** (يمكن قراءة الكود كاملاً في دقيقة)
- **صلاحية `storage` فقط** — لا قراءة تصفح، لا تعديل شبكة
- **بدون background script** ولا تتبّع ولا analytics
- **تعمل أثناء الـ streaming** بسلاسة عبر `requestAnimationFrame` (بدون تعليق الصفحة)
- **مفتوحة المصدر** بالكامل بترخيص MIT: github.com/irukhaimi/claude-RTL

## المميزات

✓ كشف لغة تلقائي لكل فقرة (يعتمد على أغلبية الحروف، ليس أول حرف فقط)
✓ الكود يظل LTR معزول حتى داخل فقرة عربية
✓ زر تشغيل/إيقاف سريع من أيقونة الإضافة
✓ يشتغل على claude.ai و claude.ai/code
✓ أداء عالٍ — لا تعليق ولا تأخير أثناء streaming الردود
✓ لا يجمع أي بيانات — كل شي يشتغل محلياً في متصفحك

## النطاقات

تعمل فقط على `claude.ai` و فروعه.

## الأذونات المطلوبة

- `storage`: لحفظ حالة التشغيل/الإيقاف فقط (قيمة boolean واحدة محلياً).

## الخصوصية

لا تقوم الإضافة بجمع أو إرسال أو تخزين أي بيانات شخصية. كل العمليات محلية بالكامل داخل متصفحك.

---

## Short title (English)
Claude RTL — Arabic/Hebrew RTL for Claude

## Summary (English)
Per-paragraph RTL/LTR auto-direction for claude.ai. Lightweight (~50 lines JS), no tracking, open source.

## Long description (English)

**Claude RTL** is a tiny, lightweight browser extension that makes claude.ai read naturally in Arabic and other right-to-left scripts. It auto-detects each paragraph's language and aligns it individually:

- **Arabic** paragraphs → RTL
- **English** paragraphs → LTR
- **Mixed** paragraphs (e.g. "JavaScript هي لغة برمجة") → aligned by **majority of characters**, unlike most extensions that use only the first strong character
- **Code blocks** stay LTR and bidi-isolated from surrounding text

## Why this extension?

Most Claude RTL extensions ship hundreds of lines of JS and request broad permissions. Claude RTL is different:

- **~50 lines of JavaScript** — auditable in under a minute
- **`storage` permission only** — no browsing data, no network access
- **No background script**, no tracking, no analytics
- **Smooth during streaming** via `requestAnimationFrame` batching
- **Fully open source** under MIT: github.com/irukhaimi/claude-RTL

## Features

✓ Per-paragraph auto-detection (by character count, not just first strong char)
✓ Code blocks stay LTR even inside Arabic paragraphs
✓ Quick toggle from the extension icon
✓ Works on `claude.ai` and `claude.ai/code`
✓ High performance — zero lag during response streaming
✓ Zero data collection — everything runs locally

## Permissions

- `storage`: for persisting the on/off toggle state (single boolean).

## Privacy

Claude RTL does not collect, transmit, or store any personal data. All processing happens locally in your browser.
