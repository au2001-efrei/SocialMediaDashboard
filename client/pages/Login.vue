<template>
	<div>
		<nav-bar :user="user" :logo-full-white="true"></nav-bar>

		<div class="container">
			<div class="red">
				<span>Login</span>

				<h1>
					Welcome<br/>
					Back?
				</h1>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat.
				</p>
			</div>

			<div class="forms">
				<div class="overlay">
					<h1>Login</h1>

					<form action="" method="POST" @submit.prevent="submitLogin">
						<label for="login-email">E-mail address</label>
						<input id="login-email" type="email" v-model="login.email" required />

						<label for="login-password">Password</label>
						<input id="login-password" type="password" v-model="login.password" required />

						<input type="submit" value="Login" />
					</form>

					<div class="or">
						<hr/>
						<span>or</span>
						<hr/>
					</div>

					<h1>Register</h1>

					<form action="" method="POST" @submit.prevent="submitRegister">
						<label for="register-email">E-mail address</label>
						<input id="register-email" type="email" v-model="register.email" required />

						<div class="passwords">
							<div>
								<label for="register-password">Password</label>
								<input id="register-password" type="password" v-model="register.password" required />
							</div>

							<div>
								<label for="register-confirmation">Confirmation</label>
								<input id="register-confirmation" type="password" v-model="register.confirmation" required />
							</div>
						</div>

						<input type="submit" value="Register" />
					</form>
				</div>
			</div>
		</div>

		<custom-footer></custom-footer>
	</div>
</template>

<script>
const NavBar = window.httpVueLoader("/components/NavBar.vue")
const CustomFooter = window.httpVueLoader("/components/Footer.vue")

module.exports = {
	props: [
		"user"
	],

	components: {
		NavBar,
		CustomFooter
	},

	data: () => ({
		login: {
			email: "",
			password: ""
		},
		register: {
			email: "",
			password: "",
			confirmation: ""
		}
	}),

	mounted() {
		if (this.user !== null)
			return this.$router.push("/profile")
	},

	updated() {
		if (this.user !== null)
			this.$router.push("/profile")
	},

	methods: {
		async submitLogin(event) {
			try {
				const user = await API.login(this.login.email, this.login.password)
				this.$parent.$emit("login", user)
				this.$router.push("/dashboard")
			} catch (err) {
				alert(err.response.data.message)
			}
		},

		async submitRegister(event) {
			if (this.register.password === this.register.confirmation) {
				try {
					const user = await API.register(this.register.email, this.register.password)
					this.$parent.$emit("login", user)
					this.$router.push("/profile")
				} catch (err) {
					alert(err.response.data.message)
				}
			} else alert("Passwords must match.")
		}
	}
}
</script>

<style scoped>
.container {
	display: flex;
	margin-top: -100px;
}

.forms, .red {
	padding-top: 100px;
	flex: 1;
}

.red {
	position: relative;
	z-index: -1;

	display: flex;
	flex-direction: column;
	justify-content: center;

	background-color: #c33e3d;
	color: white;
}

.red span {
	position: absolute;
	top: 50%;
	left: 10%;

	color: #00000008;
	font-size: 30vh;

	transform: translateX(-50%) rotate(-90deg);
	transform-origin: 50% 0;
}

.red h1 {
	margin: 50px 0;
	padding: 0 200px 0 100px;

	font-size: 48px;
}

.red p {
	margin: 0 0 50px 0;
	padding: 0 200px 0 100px;

	font-size: 24px;
}

.forms {
	display: flex;
	justify-content: center;
	align-items: center;
}

.overlay {
	padding: 50px;
	margin: 50px 0 100px 0;

	box-shadow: 5px 5px 50px #00000030;
	border-radius: 20px;
}

.overlay h1 {
	margin: 0;

	font-weight: 500;
	color: #c33e3d;
}

.overlay form label, .overlay form input {
	display: block;
	width: 100%;
}

.overlay form label {
	font-weight: bold;
	margin: 20px 0 10px 0;

	font-size: 12px;
	color: #707070;
}

.overlay form input {
	border: none;
	outline: none;
	margin: 0;

	height: 40px;
	padding: 0 20px;
	box-sizing: border-box;

	font-size: 18px;
	background-color: #f8f8f8;
	border-radius: 10px;
	box-shadow: 0 0 10px #00000020;
}

.overlay form input[type=submit] {
	background-color: #c33e3d;
	color: white;

	width: auto;
	margin: 20px auto 0 auto;
	padding: 0 50px;

	border-radius: 20px;

	cursor: pointer;
}

.or {
	display: flex;
	align-items: center;
	margin: 30px 0;
}

.or hr {
	flex: 1;
	margin: 0;
	border: none;

	background-color: #d9d9d9;
	height: 1px;
}

.or span {
	margin: 0 10px;
	color: #d9d9d9;
}

.passwords {
	display: flex;
}

.passwords div + div {
	margin-left: 20px;
}
</style>
