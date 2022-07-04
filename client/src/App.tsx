import React from 'react'
import { useAppDispatch } from './store/hooks';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home';
import Header from './components/header'
import Register from './pages/register';
import Login from './pages/login';
import PrivateRoute from './components/private'
const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<PrivateRoute>< Home/></PrivateRoute>} />
      <Route path="/register" element={< Register/>} />
      <Route path="/login" element={< Login/>} />
    </Routes>
    </BrowserRouter>
    
  )
}

export default App