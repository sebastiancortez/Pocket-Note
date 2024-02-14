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
		client: {"start":"_app/immutable/entry/start.Bt_fLl0d.js","app":"_app/immutable/entry/app.CB7O_4Pl.js","imports":["_app/immutable/entry/start.Bt_fLl0d.js","_app/immutable/chunks/entry.DL2IGOkH.js","_app/immutable/chunks/scheduler.Bvt34yaZ.js","_app/immutable/chunks/index.DVmeCGwC.js","_app/immutable/entry/app.CB7O_4Pl.js","_app/immutable/chunks/index.Cl3zackY.js","_app/immutable/chunks/scheduler.Bvt34yaZ.js","_app/immutable/chunks/stores.CXTyp9U_.js","_app/immutable/chunks/entry.DL2IGOkH.js","_app/immutable/chunks/index.DVmeCGwC.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
