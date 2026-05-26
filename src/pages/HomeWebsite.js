import { Button } from "primereact/button";
import "../assets/HomeWebsite.scss";
import rumah1 from "../assets/gambar1.avif";
import rumah2 from "../assets/gambar2.avif";
import gambar1 from "../assets/rumah1.webp"
import { InputText } from "primereact/inputtext";

const HomeWebsite = () => {
  return (
    <div className="ContainerUtama" style={{width : "100%"}}>
    <div className="Section1">
      <div className="Header">
        <span style={{ color: "white" }}>Logo</span>
        <div className="MenuHeader">
          <span style={{ color: "white" }}>Home</span>
          <span style={{ color: "white" }}>House</span>
          <span style={{ color: "white" }}>Features</span>
          <span style={{ color: "white" }}>Contact</span>
          <span style={{ color: "white" }}>Login</span>
        </div>
        <Button
          style={{ color: "white", backgroundColor: "#023020" }}
          label="Explore"
        />
      </div>
      <div className="Iklan">
        <div className="ModelRumah">
          <div className="rumah1">
            <img style={{ width: "30vw" }} src={rumah1} alt="Gambar saya" />
          </div>
          <div className="rumah2">
            <img style={{ width: "30vw" }} src={rumah2} alt="Gambar rumah" />
          </div>
        </div>
        <div
          className="Slogan"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <span>Easy Way To</span>
          <span>Find Your Dream</span>
          <span>House</span>
          <span style={{ fontSize: ".7rem" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </span>
          <div className="searchbar">
            <InputText
              style={{ width: "100%" }}
              type="text"
              placeholder="Search "
            />
            <Button label="Search" className="search-btn" />
          </div>
        </div>
      </div>
    </div>
    <div className="Section2">
        <div className="Keterangan">
          <span style={{fontSize : "2rem" , fontWeight : "bold", width :"30%"}}>Helps People to getting their dream house dor more than 32 years ago</span>
          <span style={{fontSize : ".8rem"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
          <Button label="Explore" className="search-btn" style={{width : "7vw" ,  backgroundColor: "#023020"}} />
        </div>
        <div className="ContohRumah">
          <img src={gambar1} />
          <div className="textarea">
            <span className="judul">What is Lorem Ipsum?</span>
            <span className="deskripsi">Lorem Ipsum is simply dummy text of the printing and typesetting industry</span>
          </div>
        </div>
    </div>
    </div>
  );
};

export default HomeWebsite;
