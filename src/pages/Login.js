import GambarLogin from "../assets/Login.jpg"
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import "../assets/Login.scss"
import { Button } from "primereact/button";
import axios, { Axios } from "axios";
import { useEffect, useState, useRef } from 'react';
import { Toast } from "primereact/toast";
import { data, useNavigate } from 'react-router-dom';
import { useAppContext } from "../App";

const Login = ()=>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const toast = useRef(null);
    const navigate = useNavigate();
    const {setGlobalData} = useAppContext();



   const handleLogin = async () => {
    try {
    if (!username || !password) {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Semua field harus diisi",
        life: 3000,
      });
      return;
    }
      const res = await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username: username,
          password: password,
        }
      );
      setGlobalData(res.data)
      localStorage.setItem("token", res.data.accessToken);
      toast.current.show({
        severity: "success",
        summary: "Updated",
        detail: "Berhasil Login",
        life: 3000,
      });

      setTimeout(() => {
        navigate("/Dashboard");
      }, 1000);

    } catch (error) {
      console.error(error);
       toast.current.show({
            severity:'error', summary: 'Error',
            detail: "Login Gagal",
            life: 3000,
          });
    }
  };

    return(
            <div className="LoginContainer">
              <span>username : emilys password : emilyspass</span>
                 <Toast ref={toast} />
                <div className="kotak">
                <div className="login">
                    <img src={GambarLogin}/>
                </div>
                <div className="inputan">
                    <span className="header">Login</span>
                    <InputText placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)} />
                    <Password placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} toggleMask/>
                    <Button style={{marginTop:"2rem"}} label="Login" onClick={handleLogin}/>
                </div>
                </div>
            </div>
    )
}

export default Login