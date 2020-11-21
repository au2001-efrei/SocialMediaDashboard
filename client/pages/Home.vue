<template>
	<div>
		<nav-bar></nav-bar>

		<div class="first-info">
			<img src="/assets/home-instagram-likes.jpg" />

			<div class="overlay">
				<h4>Lorem Ipsum</h4>

				<div class="bottom">
					<h1>Lorem Ipsum</h1>

					<router-link to="/dashboard" class="button">View dashboard</router-link>
				</div>
			</div>

			<div class="scroll-indicator">
				<div></div>
				<span>scroll</span>
			</div>
		</div>

		<div class="history">
			<div>
				<h1>History</h1>
			</div>

			<div class="card card-a">
				<img src="/assets/post-dog.jpg" />

				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat.<br/>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat.
				</p>
			</div>

			<div class="card card-b">
				<img src="/assets/post-nature.jpg" />

				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat.
				</p>
			</div>

			<div class="card card-c">
				<img src="/assets/post-bike.jpg" />

				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat.
				</p>
			</div>

			<div class="legend">
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			</div>
		</div>

		<div class="spacer"></div>

		<div class="explanation">
			<img src="/assets/rocks-background.jpg" />

			<div class="overlay">
				<h1><span>Social Media</span></h1>

				<img src="/assets/social-illustration.jpg" />

				<h2><span>About social media</span></h2>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>

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

		<custom-footer class="footer"></custom-footer>
	</div>
</template>

<script>
const NavBar = window.httpVueLoader('/components/NavBar.vue')
const CustomFooter = window.httpVueLoader('/components/Footer.vue')

module.exports = {
	components: {
		NavBar,
		CustomFooter
	}
}
</script>

<style scoped>
.first-info {
	position: relative;

	width: 90%;
	margin: 0 0 50px auto;
}

.first-info img {
	width: 100%;
	border-radius: 30px 0 0 30px;

	vertical-align: middle;
}

.first-info .overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	box-sizing: border-box;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	padding: 5%;
}

.first-info .overlay h4 {
	margin: 0;
	color: #707070;
	font-weight: 500;
}

.first-info .overlay h1 {
	margin: 0 0 20px 0;
	color: white;
	font-weight: 500;
}

.first-info .overlay .button {
	padding: 5px 15px;
	border-radius: 1000px;

	background-color: #c33e3d;
	color: white;
	text-decoration: none;

	transition: background-color .2s ease-in-out;
}

.first-info .overlay .button:hover {
	background-color: #b23737;
}

.first-info .scroll-indicator {
	position: absolute;
	bottom: -30px;
	right: 20%;
	color: white;

	transform: rotate(-90deg) translateX(100%);
	transform-origin: 100% 100%;
}

.first-info .scroll-indicator div {
	position: relative;
	display: inline-block;
	margin-right: 5px;

	width: 60px;
	height: 30px;
	vertical-align: middle;
	border-radius: 5px;

	background-color: #c33e3d;
	text-decoration: none;
}

.first-info .scroll-indicator div::before {
	content: "";

	position: absolute;
	top: 11px;
	left: 10px;

	display: inline-block;
	border: 4px solid transparent;
	border-right: 5px solid white;
	border-left: none;
}

.first-info .scroll-indicator div::after {
	content: "";

	position: absolute;
	top: 14px;
	left: 15px;

	display: inline-block;
	width: 35px;
	height: 2px;
	background-color: white;
}

.first-info .scroll-indicator span {
	font-size: 12px;
}

.history {
	display: grid;
	width: 80%;
	margin: 100px auto 0 auto;

	grid-template-columns: 1fr 10% 1fr 10% 1fr;
	grid-template-rows: 80px 1fr 120px 80px;
	grid-template-areas: "title x b y c" "a x b y c" "a x legend legend legend" "a z z z z";
}

.history h1 {
	grid-area: title;
	height: auto;

	margin: 0;

	border-left: 3px solid #c33e3d;
	padding-left: 10px;
	font-size: 24px;
	font-weight: 500;
}

.history .card {
	width: 100%;
	padding: 30px;
	margin-top: 10px;
	box-sizing: border-box;

	background-color: white;
	box-shadow: 5px 5px 50px #00000030;
	border-radius: 20px;
}

.history .card img {
	display: block;
	width: 100%;

	box-shadow: 2px 2px 20px #00000030;
	border-radius: 15px;
}

.history .card p {
	margin: 30px 0 0 0;
}

.history .card-a {
	grid-area: a;
}

.history .card-b {
	grid-area: b;
}

.history .card-c {
	grid-area: c;
}

.history .legend {
	grid-area: legend;

	margin: 30px 0;

	display: flex;
	align-items: center;
}

.spacer {
	background-color: #171717;
	height: 300px;
	margin-top: -80px;
}

.explanation {
	position: relative;

	width: 80%;
	box-sizing: border-box;
	padding: 60px 0 60px 60px;

	margin: -140px 0 0 auto;
}

.explanation > img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;

	border-radius: 50px 0 0 50px;
}

.explanation .overlay {
	position: relative;
	background-color: white;

	overflow: auto;

	color: #171717;
	border-radius: 20px 0 0 20px;
}

.explanation .overlay h1 {
	display: flex;
	margin: 0;
	height: 80px;

	padding-right: 10%;

	justify-content: flex-end;
	align-items: center;

	font-size: 24px;
	font-weight: 500;
	color: white;
	background-color: #171717;
}

.explanation .overlay h1 span {
	display: inline-block;
	padding-right: 10px;
	border-right: 3px solid #c33e3d;
}

.explanation .overlay img {
	float: left;
	width: 30%;
	margin: 30px;

	box-shadow: 5px 5px 50px #00000030;
	border-radius: 20px;
}

.explanation .overlay p {
	margin: 30px;
}

.explanation .overlay h2 {
	font-size: 24px;
	font-weight: 500;
	margin: 30px;
}

.explanation .overlay h2 span {
	padding-left: 10px;
	border-left: 3px solid #c33e3d;
}

.footer {
	margin-top: 100px;
}
</style>
