import { createContext, useState, useContext, useEffect } from 'react'
import { registerRequest, loginRequest, loginAdminRequest, verifyTokenRequest, logout } from '../api/auth.js'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'

export const AuthContext = createContext()

export const useAuth = () => {
	const context = useContext(AuthContext)
	// if (!context) throw new Error('useAuth must be used within a AuthProvider')
	return context
}

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [errors, setErrors] = useState([])
	const [loading, setLoading] = useState(true)
	const [isAdmin, setIsAdmin] = useState(false)

	const signup = async (user) => {
		try {
			const res = await registerRequest(user)
			setUser(res.data)
			setIsAuthenticated(true)
			setIsAdmin(res.data.is_admin)
		} catch (error) {
			setErrors(error.response.data)
		}
	}

	const signin = async (user) => {
		try {
			const res = await loginRequest(user)
			setIsAuthenticated(true)
			setUser(res.data)
			setIsAdmin(res.data.is_admin)
		} catch (error) {
			if (Array.isArray(error.response.data)) {
				return setErrors(error.response.data)
			}
			setErrors([error.response.data.message])
		}
	}

	const signinadmin = async (user) => {
		try {
			const res = await loginAdminRequest(user)
				setIsAuthenticated(true)
				setUser(res.data)
				setIsAdmin(res.data.is_admin)
		} catch (error) {
			if (Array.isArray(error.response.data)) {
				return setErrors(error.response.data)
			}
			setErrors([error.response.data.message])
		}
	}

  const handleLogout = async () => {
    try {
      await logout()
      setIsAuthenticated(false)
      setUser(null)
			window.location.href = '/login'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

	useEffect(() => {
		if (errors.length > 0) {
			const timer = setTimeout(() => {
				setErrors([])
			}, 5000)
			return () => clearTimeout(timer)
		}
	}, [errors])

  const checkLogin = async () => {
    const cookies = Cookies.get()
			try {
				const res = await verifyTokenRequest(cookies.token)
				if (!res.data) {
					setIsAuthenticated(false)
					setLoading(false)
					return
				}
				setIsAuthenticated(true)
				setUser(res.data)
				setIsAdmin(res.data.is_admin)
				setLoading(false)
			} catch (error) {
				setIsAuthenticated(false)
				setUser(null)
				setLoading(false)
			}
	}

  useEffect(() => {
			checkLogin()
			const interval = setInterval(() => {
				checkLogin()
			}, 10000000)
			return () => clearInterval(interval)
  }, [])

	return <AuthContext.Provider value={{
		signup,
		signin,
		signinadmin,
		logout: handleLogout,
		loading,
		user,
		isAuthenticated,
		errors,
		isAdmin
	}}>
		{children}
	</AuthContext.Provider>
}

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
}