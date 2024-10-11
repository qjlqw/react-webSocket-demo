import { configureStore } from '@reduxjs/toolkit'
import baseReduce from './modules/base'
import user from './modules/user'
import messagesReducer from './modules/messages'

const store = configureStore({
	reducer: { baseReduce, user, messagesReducer }
})
export default store
