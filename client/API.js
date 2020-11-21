API = window.API || {}

API.SOCIAL_TYPES = ["youtube", "twitter", "instagram", "reddit"]

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

API.getSocialStats = async (type) => {
	if (!API.SOCIAL_TYPES.includes(type))
		throw new Error(`Invalid social type "${type}"`)

	try {
		const res = await axios.get(`/api/${type}`)
		return res.data
	} catch (e) {
		return null
	}
}

API.connectSocial = (type) => {
	if (!API.SOCIAL_TYPES.includes(type))
		throw new Error(`Invalid social type "${type}"`)

	window.location = `/auth/social/${type}`
}

API.disconnectSocial = async (type) => {
	if (!API.SOCIAL_TYPES.includes(type))
		throw new Error(`Invalid social type "${type}"`)

	await axios.delete(`/auth/social/${type}`)
}
