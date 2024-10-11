// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react'
import { getToken, setToken } from '../utils/auth'
import { checkNetworkStatus, open, onmessage, receiver } from '../utils/WebSocket'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(() => getToken() !== '')
	const login = () => setIsAuthenticated(true)
	const logout = () => setIsAuthenticated(false)

	// 监听网络状态变化
	window.addEventListener('online', () => {
		console.log('网络恢复连接')
		open()
		onmessage()
		// 这里可以添加恢复连接后的逻辑
	})
	console.log('网络状态变化监听已开启', receiver)

	window.addEventListener('offline', () => {
		console.log('网络断开连接')
		// 这里可以添加断开连接后的逻辑
	})

	// 初始状态检查
	checkNetworkStatus()

	return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
