import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import AdminLoginPage from './pages/AdminLoginPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import CreateProductPage from './pages/CreateProductPage'

import ProtectedRoute from './ProtectedRoute'
import Navbar from './components/Navbar'
import ShoppingCartPage from './pages/ShoppingCartPage'
import EditProductPage from './pages/EditProductPage'
import CreateCategoryPage from './pages/CreateCategoryPage'

function App() {

  const { isAdmin } = useAuth()

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/loginadmin' element={<AdminLoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<ProfilePage />} />

          <Route path='/shoppingcart' element={<ShoppingCartPage />} />
          <Route path='/createproduct' element={isAdmin ? <CreateProductPage /> : <Navigate to='/' />} />
          <Route path='/createcategory' element={isAdmin ? <CreateCategoryPage /> : <Navigate to='/' />} />
          <Route path='/editproduct' element={isAdmin ? <EditProductPage /> : <Navigate to='/' />} />
        </Route>

        <Route path='*' element={<RedirectToHomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

function RedirectToHomePage() {
  const navigate = useNavigate()
  React.useEffect(() => {
    navigate('/')
  }, [navigate])
  return null
}

export default App