<template>
	<nav>
		<router-link to="/"><logo :white="logoWhite" :full-white="logoFullWhite" /></router-link>

		<div>
			<router-link to="/how-to" class="link">How To</router-link>
			<router-link to="/dashboard" class="link">Dashboard</router-link>
			<router-link to="/about" class="link">About</router-link>
			<router-link to="/login" class="button" v-if="user === undefined || user === null">Login</router-link>
			<router-link to="/profile" class="button" v-else>Profile</router-link>
		</div>
	</nav>
</template>

<script>
const Logo = window.httpVueLoader("/components/Logo.vue")

module.exports = {
	props: [
		"logo-white",
		"logo-full-white",
		"user"
	],
	components: {
		Logo
	}
}
</script>

<style scoped>
nav {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 20px 50px;
	height: 60px;

	z-index: 1000;
}

a {
	position: relative;
	display: inline-block;
	color: #707070;
	font-size: 18px;
	text-decoration: none;

	margin-left: 20px;
}

.link::first-letter {
	color: #c33e3d;
}

.link::after {
	content: "";

	display: inline-block;
	position: absolute;

	bottom: 2px;
	left: 0;
	width: 0;
	height: 1px;

	background-color: #707070;

	transition: width .2s ease-in-out;
}

.link.router-link-active::after, .link:hover::after {
	width: 100%;
}

.button {
	padding: 3px 15px;
	border-radius: 1000px;

	background-color: #c33e3d;
	color: white;

	transition: background-color .2s ease-in-out;
}

.button:hover {
	background-color: #b23737;
}
</style>
