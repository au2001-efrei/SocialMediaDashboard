<template>
	<div>
		<nav-bar :logo-white="true"></nav-bar>

		<div class="hard-or-simple">
			<div class="hard">
				<h1>
					It’s <span>not</span><br/>
					HARD.
				</h1>
			</div>
			<div class="simple">
				<h1>
					It’s<br/>
					<span>SIMPLE</span>.
				</h1>
			</div>
			<div class="action">
				<h2>
					See for<br/>
					YOURSELF.
				</h2>

				<div class="scroll-indicator">
					<div></div>
					<span>scroll</span>
				</div>
			</div>
		</div>

		<div class="how-to">
			<div class="step">
				<img src="/assets/how-to-register.jpg" />
				<div>
					<h3><span>1&nbsp;</span> Create an account</h3>
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

			<div class="arrow spacer"></div>

			<div class="step">
				<img src="/assets/how-to-link-social.jpg" />
				<div>
					<h3><span>2&nbsp;</span> Link your social networks</h3>
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

			<div class="arrow spacer"></div>

			<div class="step">
				<img src="/assets/how-to-dashboard.jpg" />
				<div>
					<h3><span>3&nbsp;</span> Your dashboard is ready!</h3>
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

			<div class="spacer"></div>
		</div>

		<custom-footer></custom-footer>
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
.hard-or-simple {
	position: relative;
	display: flex;
	z-index: -1;
}

.hard-or-simple .hard, .hard-or-simple .simple {
	margin-top: -100px;

	display: flex;
	flex-direction: column;
	justify-content: center;

	flex: 1;
	height: 800px;
	max-height: 80vh;
}

.hard-or-simple h1 {
	margin: 0;
	font-size: 64px;
	text-align: center;
}

.hard-or-simple h1 span {
	position: relative;
}

.hard-or-simple h1 span::after {
	content: "";

	display: inline-block;
	position: absolute;

	bottom: 5px;
	left: 0;
	width: 100%;
	height: 3px;

	background-color: #c33e3d;
}

.hard-or-simple .hard {
	background-color: #171717;
	color: white;

	border-bottom-right-radius: 100px;
}

.hard-or-simple .action {
	position: absolute;
	bottom: 30px;
	right: 30px;
}

.hard-or-simple .action h2 {
	margin: 0 100px 0 0;
	text-align: right;
	font-size: 42px;
}

.hard-or-simple .action .scroll-indicator {
	position: absolute;
	bottom: 0;
	right: 0;

	transform: rotate(-90deg) translateX(100%);
	transform-origin: 100% 100%;
}

.hard-or-simple .action .scroll-indicator div {
	position: relative;
	display: inline-block;
	margin-right: 10px;

	width: 120px;
	height: 60px;
	vertical-align: middle;
	border-radius: 10px;

	background-color: #c33e3d;
	text-decoration: none;
}

.hard-or-simple .action .scroll-indicator div::before {
	content: "";

	position: absolute;
	top: 22px;
	left: 20px;

	display: inline-block;
	border: 8px solid transparent;
	border-right: 10px solid white;
	border-left: none;
}

.hard-or-simple .action .scroll-indicator div::after {
	content: "";

	position: absolute;
	top: 28px;
	left: 30px;

	display: inline-block;
	width: 70px;
	height: 4px;
	background-color: white;
}

.hard-or-simple .action .scroll-indicator span {
	font-size: 24px;
}

.how-to {
	margin: 200px 0;
}

.how-to .step {
	width: 80%;
	height: 400px;
	margin: 0 auto;

	border-radius: 30px;
	overflow: hidden;

	box-shadow: 5px 5px 50px #00000030;
}

.how-to .step img {
	width: 50%;
	height: 100%;
	object-fit: cover;
}

.how-to .step div {
	display: flex;
	height: 100%;
	margin: 0 50px;

	flex-direction: column;
	justify-content: center;
}

.how-to .step:nth-child(4n+1) img {
	float: right;
	border-radius: 30px 0 0 30px;
	margin-left: 50px;
}

.how-to .step:nth-child(4n+3) img {
	float: left;
	border-radius: 0 30px 30px 0;
	margin-right: 50px;
}

.how-to .step h3 {
	margin: 0 0 30px 0;
	font-size: 32px;
}

.how-to .step h3 span {
	border-right: 3px solid #c33e3d;
}

.how-to .step p {
	margin: 0;
	font-size: 18px;
}

.how-to .arrow {
	position: relative;
	display: block;
	width: 20px;
	height: 300px;
	margin: 0 auto;
}

.how-to .arrow::before {
	content: "";

	position: absolute;
	top: 100px;
	left: 50%;
	margin-left: -6px;

	display: inline-block;
	width: 12px;
	height: 80px;
	background-color: #c33e3d;

	border-radius: 3px 3px 0 0;
}

.how-to .arrow::after {
	content: "";

	position: absolute;
	top: 180px;
	left: 50%;
	margin-left: -15px;

	display: inline-block;
	border: 15px solid transparent;
	border-top: 20px solid #c33e3d;
	border-bottom: none;
}

.how-to .spacer {
	clear: both;
}
</style>
