import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoute from "./components/ProtectedRoute"

function Logout() {
  // clear refresh and access tokens
  localStorage.clear()
  // it stops rendering the logout component and 
  // moves user to /login
  return <Navigate to='/login' />
}

function RegisterAndLogout() {
  // when we are registering we must clear local storage 
  // to get rid of lingering access tokens so they aren't 
  // incorrrectly marked as authenticated
  localStorage.clear()
  return <Register />
}

function App() {

// returns Home page is user is authenticated
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
