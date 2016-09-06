import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './modules/App'

import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

import DashboardRoutes from './modules/Dashboard/router/routes'
import UsersRoutes from './modules/Users/router/routes'

Vue.use(VueRouter)

const router = new VueRouter()

const routes = Object.assign(DashboardRoutes, UsersRoutes)

router.map(routes)

router.start(App, '#app')
