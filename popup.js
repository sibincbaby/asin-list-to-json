const api = globalThis.browser ?? globalThis.chrome;
const box = document.getElementById("enabled");
api.storage.sync.get({ enabled: true }, (r) => (box.checked = r.enabled));
box.onchange = () => api.storage.sync.set({ enabled: box.checked });
