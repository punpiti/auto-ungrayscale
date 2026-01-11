(() => {
  const STYLE_TAG_ID = "auto-ungrayscale-style";
  const MAX_ENFORCE_MS = 60_000; // เฝ้า 1 นาทีพอ (กัน overhead)
  const startedAt = Date.now();

  function isGrayFilter(filterStr) {
    const s = (filterStr || "").toLowerCase();
    return s.includes("grayscale(") || s.includes("saturate(0") || s.includes("saturate(0%");
  }

  function enforceOn(el) {
    if (!el || !el.style) return;
    // สำคัญ: setProperty(..., 'important') เพื่อชนะ !important ของเว็บ
    el.style.setProperty("filter", "none", "important");
    el.style.setProperty("-webkit-filter", "none", "important");
  }

  function injectCSS() {
    if (document.getElementById(STYLE_TAG_ID)) return;
    const st = document.createElement("style");
    st.id = STYLE_TAG_ID;
    // ใช้ selector แรง ๆ เผื่อเว็บใส่เฉพาะ body
    st.textContent = `
      html, body, body * {
        filter: none !important;
        -webkit-filter: none !important;
      }
      html::before, html::after, body::before, body::after {
        content: none !important;
        filter: none !important;
        -webkit-filter: none !important;
        background: transparent !important;
        opacity: 0 !important;
      }
    `;
    (document.documentElement || document.head).appendChild(st);
  }

  function removeOffendingStyleTags() {
    // เอาเฉพาะ style ที่มี grayscale/saturate(0) จริง ๆ
    const styles = document.querySelectorAll("style");
    for (const s of styles) {
      const txt = s.textContent || "";
      if (txt.includes("grayscale(") || txt.includes("saturate(0")) {
        // ไม่ต้องลบทิ้งทั้งแท็กเสมอไป—แต่กรณี wp-custom-css นี่ชัดเจนมาก
        // ปลอดภัยสุด: ทำให้ว่าง (ลด side-effect จาก CSS อื่นในแท็กเดียว)
        s.textContent = txt.replace(/filter\s*:\s*[^;]*grayscale\([^;]*\)\s*!?important?\s*;?/gi, "")
                           .replace(/-webkit-filter\s*:\s*[^;]*grayscale\([^;]*\)\s*!?important?\s*;?/gi, "")
                           .replace(/filter\s*:\s*[^;]*saturate\(\s*0%?\s*\)[^;]*;?/gi, "")
                           .replace(/-webkit-filter\s*:\s*[^;]*saturate\(\s*0%?\s*\)[^;]*;?/gi, "");
      }
    }
  }

  function run() {
    injectCSS();
    enforceOn(document.documentElement);
    enforceOn(document.body);

    // ถ้าเว็บย้อมเทาแบบ inline หรือ computed ก็ย้ำทับ
    try {
      const htmlF = getComputedStyle(document.documentElement).filter;
      const bodyF = document.body ? getComputedStyle(document.body).filter : "";
      if (isGrayFilter(htmlF) || isGrayFilter(bodyF)) {
        removeOffendingStyleTags();
        enforceOn(document.documentElement);
        enforceOn(document.body);
      }
    } catch {}
  }

  run();

  const obs = new MutationObserver(() => {
    if (Date.now() - startedAt > MAX_ENFORCE_MS) {
      obs.disconnect();
      return;
    }
    run();
  });

  obs.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ["style", "class"]
  });

  window.addEventListener("load", run, { once: true });
})();
