import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {
   BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';


import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';

import Dashboard from './pages/Dashboard';


function App() {
  

  return (

    <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />

          
          <Route
            path="/dashboard"
            element={
              <Dashboard />
            }
          />

        </Routes>
         </Router>
   
  )
}

export default App
