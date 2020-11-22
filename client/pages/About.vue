<template>
	<div class="container">
		<nav-bar :user="user" :logo-white="true"></nav-bar>

		<div class="black"></div>

		<div class="about">
			<h1>About the project</h1>

			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
				consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
				cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
				proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</div>

		<div class="team">
			<div class="title">
				<h1>About the team</h1>

				<div class="bar"></div>
			</div>

			<div class="members">
				<div class="member">
					<div class="info">
						<div><img src="/assets/aurelien.jpg" /></div>
						<h1>Aurélien Garnier</h1>
						<h2>Lead developer</h2>
					</div>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
						proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>

				<div class="member">
					<div class="info">
						<div><img src="/assets/duc-thomas.jpg" /></div>
						<h1>Duc-Thomas Nguyen</h1>
						<h2>Lead designer</h2>
					</div>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
						proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>

				<div class="member">
					<div class="info">
						<div><img src="/assets/yoni.jpg" /></div>
						<h1>Yoni Feldman</h1>
						<h2>Designer &amp; Content manager</h2>
					</div>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
						proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
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
	}
}
</script>

<style scoped>
.container {
	position: relative;
}

.black {
	position: absolute;
	z-index: -1;
	margin-top: -100px;

	display: flex;
	flex-direction: column;
	justify-content: center;

	width: 50%;
	height: 100%;

	background-color: #171717;
}

.about {
	position: relative;
	left: 50px;

	width: 90%;
	max-width: 900px;
	box-sizing: border-box;

	margin: 100px auto;
	padding: 50px;

	background-color: white;
	border-radius: 30px;
	box-shadow: 5px 5px 30px #ffffff90,
				5px 5px 30px #00000030;
}

.about h1 {
	position: absolute;
	top: -10px;
	left: -10px;

	margin: 0;
	padding: 10px 20px;

	font-size: 18px;

	color: white;
	background-color: #c33e3d;
	border-radius: 10px;
}

.about p {
	margin: 0;
}

.team {
	display: flex;

	width: 90%;
	max-width: 1000px;

	margin: 100px auto;
}

.team .title {
	width: 50px;
	white-space: nowrap;

	margin-right: 50px;

	display: flex;
	flex-direction: column;
}

.team .title .bar {
	flex: 1;
	margin-top: 206px; /* estimate of the title's width */

	align-self: center;

	background-color: #c33e3d;
	width: 10px;
	border-radius: 5px;
}

.team .title h1 {
	margin: 0;
	padding: 10px 20px;

	width: intrinsic;
	height: 30px;
	line-height: 30px;
	font-size: 24px;

	color: white;
	background-color: #c33e3d;
	border-radius: 10px;

	box-shadow: -5px 5px 30px #c33e3d90;

	transform: rotate(-90deg) translateX(-100%);
	transform-origin: 0 0;
}

.team .members {
	flex: 1;
}

.team .members .member {
	position: relative;

	margin: 0;
	padding: 50px;

	background-color: white;
	border-radius: 30px;
	box-shadow: 5px 5px 30px #ffffff90,
				5px 5px 30px #00000030;
}

.team .members .member + .member {
	margin-top: 100px;
}

.team .members .member .info {
	display: flex;
	align-items: center;
}

.team .members .member .info h1 {
	flex: 1;
	margin: 0 30px;
}

.team .members .member img {
	width: 80px;
	height: 80px;
	object-fit: cover;
	border-radius: 40px;
}
</style>
