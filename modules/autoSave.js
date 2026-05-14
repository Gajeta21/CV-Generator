(function() {
    const KEY = 'cvGeneratorData';
    let timer = null;
    let getter = null;
    let lastSaved = null;

    function save(data) {
        if (!data) return;
        try {
            const clone = JSON.parse(JSON.stringify(data));
            localStorage.setItem(KEY, JSON.stringify(clone));
            lastSaved = clone;
            showIndicator();
        } catch(e) { console.warn(e); }
    }

    function load() {
        const raw = localStorage.getItem(KEY);
        if (!raw) return null;
        try { return JSON.parse(raw); } catch(e) { return null; }
    }

    function showIndicator() {
        let el = document.getElementById('autoSaveIndicator');
        if (!el) {
            el = document.createElement('div');
            el.id = 'autoSaveIndicator';
            el.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#10b981;color:white;padding:8px 16px;border-radius:40px;font-size:0.8rem;opacity:0;transition:opacity 0.3s;pointer-events:none;z-index:1000;';
            el.textContent = '💾 Datos guardados automáticamente';
            document.body.appendChild(el);
        }
        el.style.opacity = '1';
        setTimeout(() => { if (el) el.style.opacity = '0'; }, 1500);
    }

    function start(getterFn) {
        getter = getterFn;
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
            if (!getter) return;
            const current = getter();
            if (!current) return;
            if (JSON.stringify(current) !== JSON.stringify(lastSaved)) {
                save(current);
            }
        }, 3000);
    }

    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    window.addEventListener('beforeunload', () => {
        if (getter) { const data = getter(); if (data) save(data); }
    });

    window.AutoSave = { save, load, start, stop, forceSave: save };
})();