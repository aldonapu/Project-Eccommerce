import logo from './logo.svg';
import './App.scss';
import Cards from './components/card';
import "primereact/resources/themes/lara-light-blue/theme.css"
import './pages/LandingPage'
import LandingPage from './pages/LandingPage';
import HomeWebsite from './pages/HomeWebsite';
import Todolist from './pages/TodoList';
import Coba from './pages/coba'
import TabelProduk from './pages/TabelProduk';
import HalamanUtama from './pages/HalamanUtama';
import DetailProduct from './pages/DetailProduct';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { createContext, useState, useContext } from "react";
import UserProfile from './pages/UserProfile'

export const AppContext = createContext(); 
export const useAppContext = () => useContext(AppContext);

function App() {
  const [globalData, setGlobalData] = useState();
  const [cart, setCart] = useState([]);

  return(
    <AppContext.Provider value={{globalData, setGlobalData, cart, setCart}}>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/Dashboard' element={<HalamanUtama />} />
        <Route path='/Detail' element={<DetailProduct />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/User' element={<UserProfile />} />

      </Route>
    </Routes>
    </AppContext.Provider>
  )
}

export default App;
