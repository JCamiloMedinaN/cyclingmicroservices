import { createContext, useState, useContext, useEffect } from 'react'
import { registerRequest, loginRequest, loginAdminRequest, verifyTokenRequest } from '../api/auth.js'
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
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
            console.log(res.data)
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
            console.log(res)
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

    //---------------------------------------------
    const signinadmin = async (user) => {
        try {
            const res = await loginAdminRequest(user)
            console.log(res)
    
            if (res.data.is_admin) {
                setIsAuthenticated(true)
                setUser(res.data)
                setIsAdmin(true)
            } else {
                setIsAuthenticated(false)
                setErrors(["Solo los administradores pueden iniciar sesión"])
            }
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }
    //---------------------------------------------

    const logout = () => {
        Cookies.remove("token")
        setIsAuthenticated(false)
        setUser(null)
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false)
                return setUser(null)
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
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
                console.log(error)
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false);
            }
        }
        checkLogin()
    }, [])

    return <AuthContext.Provider value={{
        signup,
        signin,
        signinadmin,
        logout,
        loading,
        user,
        isAuthenticated,
        errors,
        isAdmin
    }}>
        {children}
    </AuthContext.Provider>
}