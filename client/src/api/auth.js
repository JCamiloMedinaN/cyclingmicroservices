import { customer } from './instance'

export const registerRequest = (user) => customer.post('/register', user)
export const loginRequest = (user) => customer.post('/login', user)
export const loginAdminRequest = (user) => customer.post('/loginadmin', user)
export const verifyTokenRequest = () => customer.get('/verify')
export const logout = () => customer.post('/logout')