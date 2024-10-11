import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	messages: []
}
const { actions, reducer: messagesReducer } = createSlice({
	name: 'messagesState',
	initialState,
	reducers: {
		addMessage: (state, action) => {
			state.messages.push(action.payload)
		}
	}
})

export const { addMessage } = actions
export default messagesReducer
