import 'primeicons/primeicons.css';
import "../assets/HalamanUtama.scss"      
import { Button } from "primereact/button";
import Cards from "../components/card";
import { Card } from 'primereact/card';
import axios, { Axios } from "axios";
import { useEffect, useState, useRef } from 'react';
import { Rating } from 'primereact/rating';
import Header from '../components/Header';
import cover from '../assets/cover.jpg'
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useAppContext } from "../App";
import { Toast } from "primereact/toast";
import { Skeleton } from 'primereact/skeleton';

const HalamanUtama =() =>{

    const navigate = useNavigate();
    const {cart, setCart} = useAppContext();
    const toast = useRef(null);
    const[products, setProducts] = useState([])
    const[search, setSearch] =useState("");
    
    const addToCart = (product) => {
        setCart((prev) => {
            const exist = prev.find((item) => item.id === product.id);

            if (exist) {
                return prev.map((item) =>
                item.id === product.id
                    ? { ...item, qty: item.qty + 1 }
                    : item
                );
            } else {
                return [...prev, { ...product, qty: 1 }];
            }
        });
        toast.current.show({
            severity: "success",
            summary: `${product.title} Added`,
            life: 500,
        });
    };


    const filterProducts = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))

    useEffect(()=>{
        axios.get('https://dummyjson.com/products')
        .then((res)=>{
            setProducts(res.data.products)
        })
    },[])
  



    return(
        <div className="containerutama">
            <Toast ref={toast} />
        <Header />
            <div className="Banner">
                <div className="gmbr">
                    <img src={cover}/>
                </div>
                <div className="Slogan">
                    <span style={{fontWeight:"bold"}}>New Arrival</span>
                    <span style={{fontSize:"3rem",  fontWeight:"bold", color:"#b88d2f"}}>Discover Our New Colcetion</span>
                    <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry</span> 
                </div>
            </div>
            <div className="menu">  
                <span style={{fontSize:"1.5rem", fontWeight:"bold"}}>Browse The Range</span>
                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry</span>
            </div>
            <div className="category">
               <div  className='fitur'>
                    <span className="pi pi-truck" style={{fontSize:"2rem", fontWeight:"bold"}}></span>
                    <span style={{fontSize:"1rem", marginTop:"1rem"}}>Free Shiping</span>
               </div>
               <div className='fitur'>
                    <span className="pi pi-calendar" style={{fontSize:"2rem", fontWeight:"bold"}}></span>
                    <span style={{fontSize:"1rem", marginTop:"1rem"}}>14-Day Returns</span>
               </div>
                <div className='fitur'>
                    <span className="pi pi-shield" style={{fontSize:"2rem", fontWeight:"bold"}}></span>
                    <span style={{fontSize:"1rem", marginTop:"1rem"}}>Security Payments</span>
               </div>
               
            </div>
            <div style={{display: "flex", justifyContent:"center", alignItems:"center", margin:"2rem"}}>
                <span style={{fontSize:"2rem", fontWeight:"bold"}}>Our Products</span>
                
            </div>
            <div style={{marginLeft:"2rem", display:"flex", justifyContent:"center"}}>
                <InputText style={{marginTop:"2rem", width:"50rem"}} value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search'/>
            </div>
            
            <div className="Products">
            {
                filterProducts.map(product =>{
                    return(
                        <div className="CardProdut">
                            <div style={{backgroundColor:"whitesmoke", justifyContent:"center", alignItems:"center", display:"flex"}}>
                            <img alt="Card" src={product.thumbnail} style={{width:"100px"}} onClick={() => navigate('/detail',{state:product})}/>
                            </div>
                            <div className='textarea'>
                                <span>{product.title}</span>
                                <Rating value={product.rating} readOnly cancel={false} />
                                
                            </div>
                            <div style={{display:"flex" , alignItems:"center", justifyContent:"space-between", margin:".5rem" }}> 
                                <span>${product.price}</span>
                                <Button onClick={()=>addToCart(product)} type="button" icon="pi pi-shopping-cart" severity="secondary" rounded/>
                            </div>
                        </div>
                    )
                })
            }
            </div>

            <div className='footer'>
                <span>© 2026 . All Rights Reserved .</span>
            </div>
        
        </div>
    )
}



export default HalamanUtama