<template>
	<nav>
		<router-link to='/' class="logo"><logo /></router-link>

		<div>
			<router-link to='/how-to' class="link">How To</router-link>
			<router-link to='/dashboard' class="link">Dashboard</router-link>
			<router-link to='/about' class="link">About</router-link>
			<router-link to='/login' class="button">Login</router-link>
		</div>
	</nav>
</template>

<script>
const Logo = window.httpVueLoader('/components/Logo.vue')

module.exports = {
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
}

a {
	position: relative;
	display: inline-block;
	color: #707070;
	text-decoration: none;

	margin-left: 20px;
}

.link::first-letter {
	color: #C33E3D;
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

a.button {
	padding: 3px 15px;
	border-radius: 1000px;

	background-color: #C33E3D;
	color: white;

	transition: background-color .2s ease-in-out;
}

a.button:hover {
	background-color: #b23737;
}
</style>
