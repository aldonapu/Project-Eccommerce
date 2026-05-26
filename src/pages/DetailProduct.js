import "../assets/DetailProduct.scss"
import bedroom from "../assets/bedroom.jpg"
import { Button } from "primereact/button";
import Header from "../components/Header";
import { useLocation } from 'react-router-dom';
import { Rating } from 'primereact/rating';
import { useNavigate } from 'react-router-dom';

const DetaiProduct = () =>{
  const navigate = useNavigate();
  const location = useLocation();
  const produk = location.state;
    return(
        <>
        <Header />
        <div className="ProductContainer">
            <div className="isiproduk">
                   <div className="imageWrapper">
                    <img src={produk.images[0]} />
                    <span className="badgeDiskon">{produk.discountPercentage}%</span>
                </div>
                <div className="deskripsi">
                   <span style={{fontSize:"3rem"}}>{produk.title}</span>
                   <span style={{color:"grey"}}>DESCRIPTION</span>
                   <span>{produk.description}</span>
              
                   <span style={{fontWeight:"bold", fontSize:"1.2rem"}}>{produk.brand}</span>
                   <span style={{color:"grey"}}>PRICE</span>
                   <span style={{fontWeight:"bold", fontSize:"2rem"}}>${produk.price}</span> 
                   <Rating value={produk.rating} readOnly cancel={false} />
                        <div className="tombol">
                            <Button style={{backgroundColor:"red"}} label="Buy Now" />
                        </div>
                </div>

            </div>
             <div className="commentsection">
                <span className="jdl">Product Ratings</span>

                {
                    produk.reviews.map(review=>{
                        return(
                            <div className="isicomment">
                                <span style={{fontWeight: "bold", fontSize:"1rem"}} onClick={() => navigate('/user',{state:review})}>{review.reviewerName}</span>
                                <span style={{color:"grey"}}>{review.reviewerEmail}</span>
                                <Rating style={{marginTop:"1rem"}} value={review.rating} readOnly cancel={false} />
                                <span style={{marginTop:"1rem"}}>{review.comment}</span>
                                <div style={{display:"flex", justifyContent:"end"}}>
                                    <span style={{ color: "grey" }}>
                                        {new Date(review.date).toLocaleString("en-EN", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>
                            </div>
                        )
                    } )
                }
                   
            </div>
        </div> 
        </>   
    
    )


}


export default DetaiProduct;