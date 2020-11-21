<template>
	<div>
		<nav-bar :user="user"></nav-bar>

		<h1>Login</h1>

		<form action="" method="POST" @submit.prevent="submitLogin">
			<input type="email" v-model="login.email" placeholder="E-mail address" />
			<input type="password" v-model="login.password" placeholder="Password" />
			<input type="submit" value="Login" />
		</form>

		<h1>Register</h1>

		<form action="" method="POST" @submit.prevent="submitRegister">
			<input type="email" v-model="register.email" placeholder="E-mail address" />
			<input type="password" v-model="register.password" placeholder="Password" />
			<input type="password" v-model="register.passwordConfirm" placeholder="Password confirmation" />
			<input type="submit" value="Register" />
		</form>
	</div>
</template>

<script>
const NavBar = window.httpVueLoader("/components/NavBar.vue")

module.exports = {
	props: [
		"user"
	],

	components: {
		NavBar
	},

	data: () => ({
		login: {
			email: "",
			password: ""
		},
		register: {
			email: "",
			password: "",
			passwordConfirm: ""
		}
	}),

	mounted() {
		if (this.user !== undefined && this.user !== null)
			this.$router.push("/profile")
	},

	methods: {
		submitLogin(event) {
			API.login(this.login.email, this.login.password)
				.then(user => {
					this.$parent.$emit("login", user)
					this.$router.push("/dashboard")
				})
				.catch(error => alert(error.message))

		},
		submitRegister(event) {
			if (this.register.password === this.register.passwordConfirm) {
				API.register(this.register.email, this.register.password)
					.then(user => {
						this.$parent.$emit("login", user)
						this.$router.push("/profile")
					})
					.catch(error => alert(error.message))
			} else alert("Passwords must match.")
		}
	}
}
</script>

<style scoped>
</style>
