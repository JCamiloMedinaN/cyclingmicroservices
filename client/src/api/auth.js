import axios from './axios'

export const registerRequest = (user) => axios.post('/register', user)
export const loginRequest = (user) => axios.post('/login', user)
export const loginAdminRequest = (user) => axios.post('/loginadmin', user)
export const verifyTokenRequest = () => axios.get('/verify')
export const logout = () => axios.post('/logout')


