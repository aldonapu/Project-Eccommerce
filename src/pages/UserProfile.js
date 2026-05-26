import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from "react";


const UserProfile = () =>{
  const location = useLocation();
  const repiew = location.state;
  const[user, setUser] = useState() 

        useEffect(()=>{
        axios.get(`https://dummyjson.com/users/search?q=${repiew.reviewerName}`)
        .then((res)=>{
            setUser(res.data)
        })
    },[])   

    return(

        <span>{user?.firstName} {user?.lastName}</span>
    )

}


export default UserProfile