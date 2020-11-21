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
		user: undefined
	}),
	async mounted() {
		this.$on("login", user => {
			this.user = user
		})

		this.$on("login-google", user => {
			this.user.youtube = user !== undefined && user !== null
		})

		this.$on("login-twitter", user => {
			this.user.twitter = user !== undefined && user !== null
		})

		this.$on("login-instagram", user => {
			this.user.instagram = user !== undefined && user !== null
		})

		this.$on("login-reddit", user => {
			this.user.reddit = user !== undefined && user !== null
		})

		API.getUser().then(user => this.$emit("login", user))
	}
})
