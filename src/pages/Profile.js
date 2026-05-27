import { useAppContext } from "../App";
import { Button } from "primereact/button";
import Header from "../components/Header";
import "../assets/Profile.scss"
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import axios from "axios";

const Profile = ()=>{
const {globalData} = useAppContext();
const[userData, setUserData] = useState()


    useEffect(()=>{
        axios.get(`https://dummyjson.com/users/${globalData.id}`)
        .then((res)=>{
            setUserData(res.data)
            console.log(res.data)
        })
    },[])

return(
    <>
    <Header />
    <div className="ProfileContainer" >
        <div className="ProfilArea">
            <div className="PP">
                <img  src={globalData.image} />
                <span>{globalData.firstName} {globalData.lastName} </span>
            </div>
        <Button label="Update"/>
        </div>
        <div className="UserInfo">
            <div className="infomasi">
                <span>User Information</span>
            </div>
            <div className="inputan1">
             <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                </span>
                <InputText placeholder={globalData.firstName} />
            </div>
             <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-at"></i>
                </span>
                <InputText placeholder={globalData.email} />
            </div>
            </div>
            <div className="inputan2">
                <span style={{color:"grey", marginBottom:".5rem"}}>Addrees</span>
                <InputText style={{width:"100%"}}placeholder={userData?.address.address} />
            </div>
            <div className="inputan3">
                <div className="city">
                    <span style={{color:"grey" ,marginBottom:".5rem"}}>City</span>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                        <i className="pi pi-home"></i>
                        </span>
                        <InputText placeholder={userData?.address.city} />
                    </div>
                </div>
                <div className="provinci">
                    <span style={{color:"grey" , marginBottom:".5rem"}}>State/Province</span>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                        <i className="pi pi-map-marker"></i>
                        </span>
                        <InputText placeholder={userData?.address.state} />
                    </div>
                </div>
            </div>
            <div className="inputan3">
                <div className="city">
                    <span style={{color:"grey" ,marginBottom:".5rem"}}>Zip Code</span>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                        <i className="pi pi-envelope"></i>
                        </span>
                        <InputText placeholder={userData?.address.postalCode} />
                    </div>
                </div>
                <div className="provinci">
                    <span style={{color:"grey" , marginBottom:".5rem"}}>Country</span>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                        <i className="pi pi-flag"></i>
                        </span>
                        <InputText placeholder={userData?.address.country} />
                    </div>
                </div>
            </div>
            <div style={{display:"flex", justifyContent:"flex-end", marginRight:"1rem",
                paddingBottom:"1rem"
            }}>
            <Button label="Update Information"/>
            </div>
        </div>


    </div>
    </>
)

}




export default Profile