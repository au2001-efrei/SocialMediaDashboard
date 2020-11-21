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
				alert(err)
			}
		},

		async submitRegister(event) {
			if (this.register.password === this.register.passwordConfirm) {
				try {
					const user = await API.register(this.register.email, this.register.password)
					this.$parent.$emit("login", user)
					this.$router.push("/profile")
				} catch (err) {
					alert(err)
				}
			} else alert("Passwords must match.")
		}
	}
}
</script>

<style scoped>
</style>
