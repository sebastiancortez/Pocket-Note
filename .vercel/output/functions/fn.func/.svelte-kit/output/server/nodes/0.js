

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.mn7R2fsO.js","_app/immutable/chunks/scheduler.Bvt34yaZ.js","_app/immutable/chunks/index.Cib19C00.js"];
export const stylesheets = ["_app/immutable/assets/0.BEDOX7rp.css"];
export const fonts = [];
