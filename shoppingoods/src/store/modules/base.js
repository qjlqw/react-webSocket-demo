import { createSlice } from '@reduxjs/toolkit'

const baseState = createSlice({
	name: 'baseState',
	initialState: {
		isLoading: false,
		isError: false,
		errorMessage: '',
		isSuccess: false,
		successMessage: '',
		isLoggedIn: false,
		user: {},
		token: ''
	},
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload
		},
		setError: (state, action) => {
			state.isError = action.payload
		},
		setErrorMessage: (state, action) => {
			state.errorMessage = action.payload
		},
		setSuccess: (state, action) => {
			state.isSuccess = action.payload
		},
		setSuccessMessage: (state, action) => {
			state.successMessage = action.payload
		}
	}
})

export const { setLoading, setError, setErrorMessage, setSuccess, setSuccessMessage } = baseState.actions
const baseReduce = baseState.reducer
export default baseReduce
