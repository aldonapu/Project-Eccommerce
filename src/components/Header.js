import "../assets/Header.scss"
import { useNavigate } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useAppContext } from "../App";
import { OrderList } from 'primereact/orderlist';
import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";
import { Sidebar } from 'primereact/sidebar';
import axios from "axios";
import { Toast } from "primereact/toast";
import { Badge } from 'primereact/badge';

const Header = ()=>{
    const {globalData, cart,setCart} = useAppContext();
    const navigate = useNavigate();
    const op = useRef(null);
    const [visible, setVisible] = useState(false);
    const[orderVisible, setOrderVisible]=useState(false);
    const[userData, setUserData] = useState()
        const toast = useRef(null);
    

        useEffect(()=>{
        axios.get(`https://dummyjson.com/users/${globalData.id}`)
        .then((res)=>{
            setUserData(res.data)
            console.log(res.data)
        })
    },[])


    
    const Logout=()=>{
        localStorage.removeItem("token");
        navigate('/')
    }

    const handlePlaceOrder = ()=>{
        if (cart.length > 0)
            setOrderVisible(true)
    }

    const handleCheckout = ()=>{
        if(cart.length > 0){
        toast.current.show({
            severity: "success",
            summary: "Order Processed",
            life: 3000,
        });
        setCart([])
        setOrderVisible(false)
        setVisible(false)
        }

    }

    const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const increaseQty = (id) => {
        setCart((prev) =>
    prev.map((item) =>
    item.id === id ? { ...item, qty: item.qty + 1 } : item
            )
            );
    };

    const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
        );
    };

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.qty,
        0
    );



    const totalWeight = cart.reduce(
  (total, item) => total + (item.weight * item.qty),
  0
);

const shippingRate = 2;

const shippingCost = totalWeight * shippingRate;

const grandTotal = totalPrice + shippingCost;

const fixedPrice = totalPrice.toFixed(2);

    return(
            <div className="Header">
                <Toast ref={toast} />
                <div className="logo">
                    <span>Furniro</span>
                </div>
                <div className="menuheader">
                    <span onClick={() => navigate('/Dashboard')}>Home</span>
                    <span>Shop</span>
                    <span>About</span>
                    <span>Contact</span>
                </div>
                <div className="user">
                    <span className="pi pi-user" onClick={(e)=>op.current.toggle(e)}></span>
                    <OverlayPanel ref={op}>
                    <div style={{display: "flex", flexDirection: "column", gap:"1rem"}}>
                   <span>Hi, {globalData?.firstName} {globalData?.lastName}</span>
                   <span className="pi pi-user" onClick={()=>navigate('/Profile')}> Profile</span>
                    <span className="pi pi-sign-out" onClick={(e)=>Logout(e)}> Logout</span>
                    </div>
                    </OverlayPanel>
                    <span className="pi pi-search"></span>
                    <span className="pi pi-heart"></span>
                    <span className="pi pi-shopping-cart" onClick={()=>setVisible(true)}>
                        {
                            cart.length >0 && <Badge value={cart.length}></Badge>
                        }
                    </span>

                </div>
                <Sidebar header="Cart" visible={visible} position="right" style={{ width: '27vw' }} onHide={() => setVisible(false)}>
                    { cart?.length > 0 ?
                        cart?.map(item=>{
                            return(
                                   <>
                                <div className="CartContainer">
                                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", backgroundColor:"whitesmoke", marginTop:"1rem", padding:".5rem"}} className="Cart">
                                    <div style={{display:"flex", alignItems:"center", }}>
                                    <img style={{width:"5rem"}} src={item.thumbnail}/>
                                    <span style={{marginLeft:".2rem", width: '10rem'}}>{item.title}</span>
                                    </div>
                                    <div style={{display:"flex", alignItems:"center", gap:".3rem", width:"15rem"}}>
                                        <span style={{width:"5rem"}}>${item.price}</span>
                                        <button style={{backgroundColor:"black", color:"white", width:"2rem", height:"2rem"}} onClick={() => decreaseQty(item.id)}>-</button>
                                        <span style={{width:"2rem", textAlign:"center"}}>{item.qty}</span>
                                        <button style={{backgroundColor:"black", color:"white", width:"2rem", height:"2rem"}} onClick={() => increaseQty(item.id)}>+</button>
                                        <button style={{backgroundColor:"red", border:"none", color:   "white", height :"2rem" }} onClick={() => removeFromCart(item.id)}>Remove</button>
                                    </div>
                               </div> 
                            </div>
                                   </>
                            )
                        })
                        : <span>There's No Items In Cart</span>
                    }
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", margin:"1rem"}}>
                        <span style={{fontWeight:"bold", fontSize:"1.5rem"}}>Total</span>
                        <span style={{fontWeight:"bold", fontSize:"1.5rem"}}>${fixedPrice}</span>
                    </div>
                    <Button style={{width:"100%"}} label="Place Order" onClick={()=>handlePlaceOrder()}/>
                </Sidebar>
                <Dialog header="Checkout" visible={orderVisible} style={{ width: '27vw' }} onHide={() => setOrderVisible(false)}>
                
                    <div className="checkoutcard" style={{display:"flex", flexDirection:"column", padding:"1rem", gap:".5rem"}}>
                        <span style={{fontWeight:"bold", fontSize:"1rem"}}>{globalData.firstName} {globalData.lastName}</span>
                        <span style={{color:"grey"}}>{userData?.phone}</span>
                        <span>{userData?.address.address} {userData?.address.state} {userData?.address.city} {userData?.address.postalCode} </span>
                    </div>
                    
                    <span style={{textAlign:"center", marginTop:".5rem", color:"grey"}} className="pi pi-box"> Product</span>
                   
                    <div className="checkoutcard" style={{display :"flex", marginTop:".5rem", padding:"1rem", flexDirection:"column"}}>
                     {
                        cart.map(item=>{

                            return(
                                <div style={{marginTop:".5rem", backgroundColor:"whitesmoke", padding:".5rem"}}>
                                <span>{item.brand}</span>
                                <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                                    <img style={{width:"5rem"}} src={item.thumbnail} />
                                    <div style={{display:"flex", flexDirection:"column"}}>
                                        <span>{item.title}</span>
                                        <span>{item.price}</span>
                                    </div>
                                    <div style={{display:"flex", flexDirection:"column"}}>
                                        <span>{item.qty}x</span>
                                        <span>{item.weight}Kg</span>
                                    </div>
                                </div>
                                </div>
                            )
                        })
                    }
                    
                    </div>
                    <span style={{textAlign:"center", marginTop:".5rem", color:"grey"}} className="pi pi-box"> Rincian Pembayaran</span>
                    <div className="checkoutcard" style={{display:"flex", justifyContent:"space-between", marginTop:".5rem", padding:"1rem"}}>
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <span>Subtotal Product</span>
                            <span>Sub Total Pengiriman</span>
                        </div>
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <span>$ {fixedPrice}</span>
                            <span>$ {shippingCost}</span>
                        </div>
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"2rem"}}>
                        <span style={{fontWeight:"bold", fontSize:"2rem"}}>${grandTotal.toFixed(2)}</span>
                        <Button onClick={()=>handleCheckout()} label="Buat Pesanan" />
                    </div>


                </Dialog>
            </div>
    )
}

export default Header