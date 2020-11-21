API = window.API || {}

API.getUser = async () => {
	try {
		const res = await axios.get('/auth/me')
		return res.data
	} catch (e) {
		return null
	}
}

API.login = async (email, password) => {
	await axios.post('/auth/login', { email, password })

	return await API.getUser()
}

API.register = async (email, password) => {
	await axios.post('/auth/register', { email, password })

	return await API.login(email, password)
}

API.logout = async () => {
	await axios.post('/auth/logout')
}

API.connectSocial = (type) => {
	window.location = `/auth/social/${type}`
}

API.disconnectSocial = async (type) => {
	await axios.delete(`/auth/social/${type}`)
}
