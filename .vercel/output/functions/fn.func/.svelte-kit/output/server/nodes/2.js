

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.BKYndAwe.js","_app/immutable/chunks/scheduler.Bvt34yaZ.js","_app/immutable/chunks/index.Cg4YRz29.js","_app/immutable/chunks/index.DVmeCGwC.js"];
export const stylesheets = [];
export const fonts = [];
