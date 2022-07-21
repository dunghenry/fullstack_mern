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
import ProductDetail from "./pages/product/ProductDetail";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PrivateRoute>< Home /></PrivateRoute>} />
        <Route path="/register" element={< Register />} />
        <Route path="/login" element={< Login />} />
        <Route path="/product/:id" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App