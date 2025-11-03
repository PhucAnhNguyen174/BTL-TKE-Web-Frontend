// ===================================
// Local Storage Helpers (JSON safe wrappers)
// ===================================

(function(global) {
    const LuxAuto = global.LuxAuto = global.LuxAuto || {};

    const parse = value => {
        try {
            return JSON.parse(value);
        } catch (error) {
            return undefined;
        }
    };

    LuxAuto.storage = {
        get(key, fallback = null) {
            const raw = global.localStorage.getItem(key);
            if (raw === null) {
                return fallback;
            }
            const parsed = parse(raw);
            return parsed === undefined ? fallback : parsed;
        },
        set(key, value) {
            try {
                global.localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.warn('LuxAuto storage.set failed', error);
            }
        },
        remove(key) {
            global.localStorage.removeItem(key);
        }
    };
})(window);
