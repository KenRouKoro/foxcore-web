import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import NotFound from "../view/error/NotFound.vue";
import Index from "../view/Index.vue";
import Setting from "../view/Setting.vue";
import ConfigView from "../view/ConfigView.vue";

const routes = [
    {
        path: "/",
        name: "index",
        component: Index
    },
    {
        path: "/setting",
        name: "setting",
        component: Setting
    },
    {
        path: "/config/:id",
        name: "config",
        component: ConfigView
    },
    {
        path: '/:pathMatch(.*)',
        name:'not-found',
        component : NotFound,
        alias:'/404'
    }
]
export const router = createRouter({
    history: createWebHistory(),
    routes: routes
})