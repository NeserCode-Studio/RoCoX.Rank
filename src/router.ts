import { createRouter, createWebHashHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		meta: {},
		component: () => import("./views/Home.vue"),
	},
	{
		path: "/about",
		name: "About",
		meta: {},
		component: () => import("./views/About.vue"),
	},
	{
		path: "/sign",
		name: "Sign",
		meta: {},
		component: () => import("./views/Sign.vue"),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
