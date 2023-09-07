import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import AdminLoginPage from './pages/AdminLoginPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import CreateProductPage from './pages/CreateProductPage'

import ProtectedRoute from './ProtectedRoute'
import Navbar from './components/Navbar'
import ShoppinCartPage from './pages/ShoppinCartPage'
import EditProductPage from './pages/EditProductPage'
import CreateCategoryPage from './pages/CreateCategoryPage'


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/loginadmin' element={<AdminLoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          <Route element={<ProtectedRoute/>}>
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/shoppingcart' element={<ShoppinCartPage />} />
            <Route path='/createproduct' element={<CreateProductPage />} />
            <Route path='/createcategory' element={<CreateCategoryPage />} />
            <Route path='/editproduct' element={<EditProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
