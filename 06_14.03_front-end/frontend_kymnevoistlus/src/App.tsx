import './App.css'

import {  Route, Routes } from 'react-router-dom'

import Menu from './components/Menu'
import Athletes from './pages/Athletes'
import Resutls from './pages/Results'
import MainPage from './pages/MainPage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ManageAthletes from './pages/ManageAthletes'
import ManageResults from './pages/ManageResults'
import Test from './pages/test'


function App() {

  return (  
    <>
    
      <Menu />
      
      <Routes>
        <Route path="/" element={ <MainPage />}   />
        <Route path="/admin/athletes" element={ <ManageAthletes />}   />
        <Route path="/admin/results" element={ <ManageResults />}   />

        <Route path="/athletes" element={ <Athletes />}   />
        <Route path="/results" element={ <Resutls />}   />
        <Route path="/login" element={ <Login />}   />
        <Route path="/signup" element={ <SignUp />}   />
        <Route path="/test" element={ <Test />}   />

        <Route path="/*" element={ <div>Page not found</div> }   />
      </Routes>

    </>
  )
}

export default App
