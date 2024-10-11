import { createSlice } from '@reduxjs/toolkit'
import { getToken } from '../../utils/auth'

const initialState = {
	token: getToken(),
	userInfo: {},
	name: '',
	avatar: '',
	roles: []
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserInfo(state, action) {
			state.token = action.payload.token
			state.userInfo = action.payload.userInfo
			state.name = action.payload.name
			state.avatar = action.payload.avatar
			state.roles = action.payload.roles
		}
	}
})

export const { setUserInfo } = userSlice.actions
export default userSlice.reducer
