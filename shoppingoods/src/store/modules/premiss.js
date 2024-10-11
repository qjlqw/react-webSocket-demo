import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	token: ''
}

const premissSlice = createSlice({
	name: 'premiss',
	initialState,
	reducers: {
		SET_TOKEN: (state, actions) => {
			state.token = actions.payload
		}
	}
})
