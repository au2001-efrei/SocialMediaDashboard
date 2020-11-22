<template>
	<div v-if="user !== undefined && user !== null">
		<nav-bar :user="user"></nav-bar>

		<div class="accounts" v-if="Object.keys(stats).length !== 0">
			<div v-for="account in accounts" v-if="account.id in stats" :class="['account', account.type]">
				<div class="info">
					<img :src="`/assets/${account.type}-white.png`" />
					<span>{{ stats[account.id].username || account.profile_id }}</span>
				</div>

				<div class="stats">
					<div class="stat" v-if="account.type === 'youtube'">
						<h4>Total views</h4>
						<span>{{ stats[account.id].views }}</span>
					</div>
					<div class="stat" v-if="account.type === 'youtube'">
						<h4>Subscribers</h4>
						<span>{{ stats[account.id].subscribers }}</span>
					</div>
					<div class="stat" v-if="account.type === 'youtube'">
						<h4>Videos</h4>
						<span>{{ stats[account.id].videos }}</span>
					</div>

					<div class="stat" v-if="account.type === 'twitter'">
						<h4>Followers</h4>
						<span>{{ stats[account.id].followers }}</span>
					</div>
					<div class="stat" v-if="account.type === 'twitter'">
						<h4>Following</h4>
						<span>{{ stats[account.id].friends }}</span>
					</div>
					<div class="stat" v-if="account.type === 'twitter'">
						<h4>Posts</h4>
						<span>{{ stats[account.id].posts }}</span>
					</div>
					<div class="stat" v-if="account.type === 'twitter'">
						<h4>Liked posts</h4>
						<span>{{ stats[account.id].liked }}</span>
					</div>

					<div class="stat" v-if="account.type === 'instagram'">
						<h4>Posts</h4>
						<span>{{ stats[account.id].posts }}</span>
					</div>

					<div class="stat" v-if="account.type === 'reddit'">
						<h4>Coins</h4>
						<span>{{ stats[account.id].coins }}</span>
					</div>
					<div class="stat" v-if="account.type === 'reddit'">
						<h4>Gold creddits</h4>
						<span>{{ stats[account.id].gold_creddits }}</span>
					</div>
					<div class="stat" v-if="account.type === 'reddit'">
						<h4>Total Karma</h4>
						<span>{{ stats[account.id].karma }}</span>
					</div>
					<div class="stat" v-if="account.type === 'reddit'">
						<h4>Awarder Karma</h4>
						<span>{{ stats[account.id].awarder_karma }}</span>
					</div>
					<div class="stat" v-if="account.type === 'reddit'">
						<h4>Awardee Karma</h4>
						<span>{{ stats[account.id].awardee_karma }}</span>
					</div>
					<div class="stat" v-if="account.type === 'reddit'">
						<h4>Link Karma</h4>
						<span>{{ stats[account.id].link_karma }}</span>
					</div>
					<div class="stat" v-if="account.type === 'reddit'">
						<h4>Comment Karma</h4>
						<span>{{ stats[account.id].comment_karma }}</span>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<p class="warning">No account linked. Start by adding some in your <router-link to="/profile">profile</router-link>.</p>
		</div>

		<custom-footer></custom-footer>
	</div>
	<div v-else></div>
</template>

<script>
const NavBar = window.httpVueLoader("/components/NavBar.vue")
const CustomFooter = window.httpVueLoader("/components/Footer.vue")

module.exports = {
	props: [
		"user",
		"accounts"
	],

	components: {
		NavBar,
		CustomFooter
	},

	data: () => ({
		stats: {}
	}),

	mounted() {
		if (this.user === null)
			return this.$router.push("/login")

		this.fetchStats()
	},

	watch: {
		user() {
			if (this.user === null)
				return this.$router.push("/login")
		},
		accounts() {
			this.fetchStats()
		}
	},

	methods: {
		fetchStats() {
			const stats = {}
			this.stats = stats
			this.accounts.forEach(account => {
				API.getAccount(account.id).then(stat => {
					this.$set(stats, account.id, stat)
				})
			})
		}
	}
}
</script>

<style scoped>
.accounts {
	text-align: center;
	margin-bottom: 50px;
}

.account {
	display: inline-block;

	width: 90%;
	max-width: 400px;
	box-sizing: border-box;
	margin: 50px;

	vertical-align: middle;

	padding: 30px;
	border-radius: 30px;

	font-size: 18px;
	color: white;
}

.account.youtube {
	background-color: red;
	box-shadow: 0 0 20px #ff0000a0;
}

.account.twitter {
	background-color: #1da1f2;
	box-shadow: 0 0 20px #1da1f2a0;
}

.account.instagram {
	background-color: #833ab4;
	box-shadow: 0 0 20px #833ab4a0;
}

.account.reddit {
	background-color: #ff4500;
	box-shadow: 0 0 20px #ff4500a0;
}

.account .info {
	display: flex;
	justify-content: space-between;
	align-items: center;

	margin-bottom: 20px;
}

.account .info img {
	height: 40px;
}

.account .stat {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.account .stat h4 {
	margin: 10px 0 0 0;
}

.warning {
	text-align: center;
	margin: 100px 0;

	font-size: 24px;
}

.warning a {
	color: inherit;
}
</style>
