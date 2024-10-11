import { useSelector } from 'react-redux'

export function getToken() {
	return sessionStorage.getItem('Admin-token') || ''
}
export function setToken(token) {
	return sessionStorage.setItem('Admin-token', token)
}

export const useIsAuthenticated = () => {
	const isLoggedIn = useSelector((state) => {
		console.log(state)
		return state.user.token
	})
	return isLoggedIn
}
