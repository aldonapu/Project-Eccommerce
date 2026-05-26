import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import "../assets/LandingPage.scss";
import Cards from "../components/card";
import gambar1 from "../assets/gambar1.avif"
import gambar2 from "../assets/gambar2.avif"
import gambar3 from "../assets/gambar3.avif"
import rumah1 from "../assets/rumah1.webp"
import rumah2 from "../assets/rumah2.webp"
import { useState } from "react";

const LandingPage = () => {
  const [teks, setTeks] = useState('')
  const [kata, setKata] = useState('')
  const handleClick = () => {};

  const header = <div className="Header">
          <span className="MenuHeader">Logo</span>
          <div className="SubMenu">
            <span className="MenuHeader" onClick={handleClick}>
              Home
            </span>
            <span className="MenuHeader" onClick={handleClick}>
              Features
            </span>
            <span className="MenuHeader" onClick={handleClick}>
              Hotel
            </span>
            <span className="MenuHeader" onClick={handleClick}>
              Contact
            </span>
            <span className="MenuHeader" onClick={handleClick}>
              Login
            </span>
          </div>
          <Button label="Explore" />
        </div>

  const slogan =<div className="Slogan">
          <span className="kataslogan">Lets Find A Home <p>{kata}</p></span>
          <span style={{color : "white" , fontSize :".8rem" , width :"70%"  , textAlign: "center" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</span>
          <div className="searchbar" style={{width : "50%"}}>
          <InputText value={teks} onChange={(e) => setTeks(e.target.value)} style={{width :"50%"}} type="text" placeholder="Search Estate" />
          <InputText value={kata}  onChange={(e) => setKata(e.target.value)} style={{width :"50%"}} type="text" placeholder="Hasil" />
           <Button label="Search" className="search-btn"/>
          </div>
        </div>
        
  return (
    <div className="ContainerUtama">
      <div className="ImgContainer">
        {header}
        {slogan}

      </div>
      <div style={{justifyContent:"space-between", display:"flex", padding:"2rem", alignItems:"end", height:"30vh" }} className="Features">
        <div style={{flexDirection : "column", display : "flex"}}>
        <span style={{color : "#7ab1f7" }}>Features</span>
        <span style={{fontSize :"2rem", fontWeight :"bold"}}>What We Do</span>
        <span style={{fontSize :".7rem"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</span>
        </div>
        <Button style={{width :"8rem", height :"2.5rem"}} label="See All" />
      </div>
      <div style ={{display : "flex", justifyContent : "space-around", height : "70vh"}}>
        <Cards  
          className="card1" 
          title="What is Lorem Ipsum?"
          desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
          img={gambar1}
        />
        <Cards 
          className="card2"
          title ="Why do we use it?" 
          desc="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English" 
          img={gambar2}
        />
        <Cards 
          className="card3" 
          title ="Where does it come from?" 
          desc="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur" 
          img={gambar3}
        />
      </div>
      
    <div className="Daftar">
      <span style={{color : "#7ab1f7"}}>Best Choice</span>
      <span style={{fontSize : "2rem" , fontWeight : "bold"}}>The Best Choice <span  className="Gradient">Minimalis</span> Homes</span>
    </div>
      <div style ={{display : "flex", justifyContent : "space-around", height : "70vh", backgroundColor : "#053327", padding : "2rem"}}className="Cards">
        <Cards title ="What is Lorem Ipsum?" desc = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" img={rumah1}/>
        <Cards title ="Why do we use it?" desc = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English" img={rumah2}/>
       
      </div>
    </div>
  );
};
export default LandingPage;
