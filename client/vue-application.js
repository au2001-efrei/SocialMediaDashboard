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

		this.$on("login-youtube", connected => {
			this.user.youtube = connected
		})

		this.$on("login-twitter", connected => {
			this.user.twitter = connected
		})

		this.$on("login-instagram", connected => {
			this.user.instagram = connected
		})

		this.$on("login-reddit", connected => {
			this.user.reddit = connected
		})

		API.getUser().then(user => this.$emit("login", user))
	}
})
