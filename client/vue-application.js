const Home = window.httpVueLoader('/pages/Home.vue')
const HowTo = window.httpVueLoader('/pages/HowTo.vue')
const Dashboard = window.httpVueLoader('/pages/Dashboard.vue')
const About = window.httpVueLoader('/pages/About.vue')
const Login = window.httpVueLoader('/pages/Login.vue')
const NotFound = window.httpVueLoader('/pages/NotFound.vue')

Vue.config.productionTip = false

const routes = [
	{ path: '/', component: Home },
	{ path: '/how-to', component: HowTo },
	{ path: '/dashboard', component: Dashboard },
	{ path: '/about', component: About },
	{ path: '/login', component: Login },
	{ path: '/*', component: NotFound }
]

const router = new VueRouter({
	mode: 'history',
	routes
})

var app = new Vue({
	router,
	el: '#app',
	components: {
		app: Home
	}
})
