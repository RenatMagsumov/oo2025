
import './App.css'

import {  Route, Routes } from 'react-router-dom'
import ManageProducts from './pages/ManageProducts'
import MainPage from './pages/MainPage'
import Arrayd from './pages/Arrayd'
import Menu from './components/Menu'
import ManageCategories from './pages/ManageCategories'
import Login from './pages/Login'
import Cart from './pages/Cart'
import SignUp from './pages/SignUp'
import Orders from './pages/Orders'
import SingleProduct from './pages/SingleProduct'
import EditProduct from './pages/EditProduct'

function App() {

  return (
    <>
    
      <Menu />
      
      <Routes>
        <Route path="/" element={ <MainPage />}   />
        <Route path="/admin/products" element={ <ManageProducts />}   />
        <Route path="/admin/categories" element={ <ManageCategories />}   />
        <Route path="/admin/edit-product/:productId" element={ <EditProduct />}   />
        
        <Route path="/arrays" element={ <Arrayd />}   />
        <Route path="/cart" element={ <Cart />}   />
        <Route path="/login" element={ <Login />}   />
        <Route path="/signup" element={ <SignUp />}   />
        <Route path="/orders" element={ <Orders />}   />
        <Route path="/product/:productId" element={ <SingleProduct />}   />
 

        <Route path="/*" element={ <div>Page not found</div> }   />
      </Routes>

    </>
  )
}

export default App
