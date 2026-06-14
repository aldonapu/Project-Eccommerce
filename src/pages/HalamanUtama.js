import 'primeicons/primeicons.css';
import "../assets/HalamanUtama.scss"      
import { Button } from "primereact/button";
import axios from "axios";
import { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import cover from '../assets/cover.jpg'
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { useAppContext } from "../App";
import { Toast } from "primereact/toast";


const HalamanUtama =() =>{

    const navigate = useNavigate();
    const { setCart, globalData, like, setLike} = useAppContext();
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

const handleLike = (product) => {
    const exist = like.some((item) => item.id === product.id);

    setLike((prev) => {
        if (exist) {
            return prev.filter((item) => item.id !== product.id);
        }

        return [...prev, product];
    });

    toast.current.show({
        severity: exist ? "warn" : "success",
        summary: exist
            ? `${product.title} Removed from Favorites`
            : `${product.title} Added to Favorites`,
        life: 1000,
    });
};

const isLiked = (id) =>{
    return like.some((item)=> item.id === id);
}

useEffect (()=>{
    localStorage.setItem("likes", JSON.stringify(like))
},[like])

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
                    <img src={cover} alt='cover'/>
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
                filterProducts.map((product, i) =>{
                    return(
                        <div key={`card-${i}`} className="CardProdut">
                            <div style={{backgroundColor:"whitesmoke", justifyContent:"center", alignItems:"center", display:"flex"}}>
                            <img alt="Card" src={product.thumbnail} style={{width:"100px"}} onClick={() => navigate('/detail',{state:product})}/>
                            </div>
                            <div className='textarea'>
                                
                                <span style={{fontSize:".8rem"}}>{product.title}</span>
                                <div style={{display: 'flex', alignItems:"center", justifyContent:"space-between"}}>    
                                <span style={{fontSize:"1rem"}}>${product.price}</span>
                                <Button icon={isLiked(product.id) ? "pi pi-heart-fill" : "pi pi-heart"} onClick={()=> !globalData ? navigate('/Login') : handleLike(product)} rounded text severity="warning" aria-label="Favorite" />
                                </div>
                                
                            </div>
                            <div style={{display:"flex" , alignItems:"center", justifyContent:"center", backgroundColor:"orange", height:"100%", padding:"1rem" }} onClick={()=>!globalData ? navigate('/Login') : addToCart(product)}> 
                                <span style={{color:"white", fontWeight:"bold", cursor:"pointer"}}>ADD TO CART</span>  
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