import React from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import './style.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { Navigate } from "react-router-dom";
import { ChatContext } from './context/ChatContext'

const App = () => {
  const { data, dispatch } = React.useContext(ChatContext)
  console.log(data)
  const { currentUser } = React.useContext(AuthContext)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App