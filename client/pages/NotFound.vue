<template>
	<div>
		<nav-bar :user="user"></nav-bar>

		<h1>404</h1>

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
	}
}
</script>

<style scoped>
</style>
