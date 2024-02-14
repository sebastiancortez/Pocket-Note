export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.B-62mL5d.js","app":"_app/immutable/entry/app.CZ6UE-kj.js","imports":["_app/immutable/entry/start.B-62mL5d.js","_app/immutable/chunks/entry.DTu5vdxt.js","_app/immutable/chunks/scheduler.Bvt34yaZ.js","_app/immutable/chunks/index.DVmeCGwC.js","_app/immutable/entry/app.CZ6UE-kj.js","_app/immutable/chunks/index.Cib19C00.js","_app/immutable/chunks/scheduler.Bvt34yaZ.js","_app/immutable/chunks/stores.6WMLlilU.js","_app/immutable/chunks/entry.DTu5vdxt.js","_app/immutable/chunks/index.DVmeCGwC.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
