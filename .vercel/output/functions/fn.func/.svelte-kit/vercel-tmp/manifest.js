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
		client: {"start":"_app/immutable/entry/start.DIkHA8Y6.js","app":"_app/immutable/entry/app.B7KCA3xQ.js","imports":["_app/immutable/entry/start.DIkHA8Y6.js","_app/immutable/chunks/entry.BXk49OBT.js","_app/immutable/chunks/scheduler.C4Kg0WO3.js","_app/immutable/chunks/index.CoWUWRcg.js","_app/immutable/entry/app.B7KCA3xQ.js","_app/immutable/chunks/scheduler.C4Kg0WO3.js","_app/immutable/chunks/index.kOuKrzei.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
