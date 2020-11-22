const Home = window.httpVueLoader("/pages/Home.vue")
const HowTo = window.httpVueLoader("/pages/HowTo.vue")
const Dashboard = window.httpVueLoader("/pages/Dashboard.vue")
const About = window.httpVueLoader("/pages/About.vue")
const Login = window.httpVueLoader("/pages/Login.vue")
const Profile = window.httpVueLoader("/pages/Profile.vue")
const NotFound = window.httpVueLoader("/pages/NotFound.vue")

Vue.config.productionTip = false

const routes = [
	{ path: "/", 			component: Home			},
	{ path: "/how-to", 		component: HowTo		},
	{ path: "/dashboard", 	component: Dashboard	},
	{ path: "/about", 		component: About		},
	{ path: "/login", 		component: Login		},
	{ path: "/profile", 	component: Profile		},
	{ path: "/*", 			component: NotFound		}
]

const router = new VueRouter({
	mode: "history",
	routes
})

var app = new Vue({
	router,
	el: "#app",

	components: {
		app: Home
	},

	data: () => ({
		user: undefined,
		accounts: []
	}),

	mounted() {
		this.$on("login", user => {
			this.user = user
		})

		this.$on("unlink", id => {
			this.accounts = this.accounts.filter(account => account.id !== id)
		})

		API.getUser().then(user => this.$emit("login", user))
		this.fetchAccounts()
	},

	watch: {
		user() {
			this.fetchAccounts()
		}
	},

	methods: {
		fetchAccounts() {
			const accounts = []
			this.accounts = accounts
			API.listAccounts().then(newAccounts => {
				accounts.splice(0, this.accounts.length, ...newAccounts)
			})
		}
	}
})
