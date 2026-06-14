
import './App.scss';
import "primereact/resources/themes/lara-light-blue/theme.css"
import './pages/LandingPage'
import HalamanUtama from './pages/HalamanUtama';
import DetailProduct from './pages/DetailProduct';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';

import { createContext, useState, useContext } from "react";
import UserProfile from './pages/UserProfile'

export const AppContext = createContext(); 
export const useAppContext = () => useContext(AppContext);

function App() {
  const [globalData, setGlobalData] = useState();
  const [cart, setCart] = useState([]);
  const [like, setLike] = useState(()=>{
    const saved = localStorage.getItem("likes");
    return saved ? JSON.parse(saved) : [];
  });

  return(
    <AppContext.Provider value={{globalData, setGlobalData, cart, setCart, like, setLike}}>
    <Routes>
      <Route path='/' element={<HalamanUtama />} />
        <Route path='/Dashboard' element={<HalamanUtama />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Detail' element={<DetailProduct />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/User' element={<UserProfile />} />
    </Routes>
    </AppContext.Provider>
  )
}

export default App;
