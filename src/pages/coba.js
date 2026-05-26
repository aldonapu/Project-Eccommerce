import { useState } from "react"
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';


const Coba= ()=>{

const [coba, setCoba] = useState([
    {   nama: 'miaw', 
        ras: 'kucing', 
        fav: [
            {
                makanan: [
                    {gorengan: 'tahu isi', snack: 'selamat'}
                ], 
                minuman: 'soda'
            }
        ]
    },
    {   nama :'ANJINGG!!!!', 
        ras :'GUGUK', 
        fav: [
            {
                makanan: [
                    {gorengan: 'tempe', snack: 'chic choc'} /*aray ke 1 (0) */
                ], 
                minuman: 'aer mineral'
            }
        ]
    }
])
console.log(coba[0].fav[0].makanan[0].gorengan)
const [input, setInput] = useState("")

const [data, setData]=useState({nama: 'aldo', umur: 26, makanan: 'gorengan', minuman: 'soda'})
console.log(data.nama)
setData([{...data[0], makanan : 'gorengan'}])

const Klik = (e, ayam)=>{

    if(e.target.name==="hapus"){
        setCoba(coba.filter(kambing => kambing !== ayam))
    }else if(e.target.name==="edit"){
        setCoba(coba.map(kambing=> kambing === ayam ? input : kambing  ))
        setInput('')
    } else{
        setCoba([...coba, input])
        setInput('')
    }

}  




return(

   
    <div className="Container Utama" style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
        <div className="Content" style={{display:"flex", justifyContent:"center", alignItems: "center", flexDirection :"column"}}>
            <span>Kegiatan Sehari-hari</span>
            {
                coba.map(kelinci=>{
                    return(
                        <>
                        <span>{kelinci.nama}</span>
                        <span>{kelinci.ras}</span>
                        <span>{kelinci.fav[0].makanan[0].snack}</span> {/* data coba yang sudah di pecah menjadi kelinci akses data favorite. jadi akses fav data ke 1 (0) pe makanan. akses ke makana pe data pertama pe variable snack  */}
                         <span>{kelinci.fav[0].minuman}</span>
                        
                        </>

                    )
                })
            }
            <div className="list" style={{display:"flex", flexDirection:"column", marginTop:"3rem"}}>
                {/* {coba.map(ayam =>{
                    return(
                        <>
                        <span>{ayam}</span>
                        <div className="tombol" style={{display: "flex", gap:"2rem", margin:"1rem"}}>
                        <Button label="Hapus" name="hapus" onClick={(e)=>Klik(e, ayam)}/>
                        <Button label="Edit" name="edit" onClick={(e)=>Klik(e, ayam)} />
                        </div> 
                        </> 
                    )
                })} */}
            </div>
             <InputText style={{width:"100%"}} type="text" placeholder="Enter A Todo" value={input} onChange={(e)=>setInput(e.target.value)}/>
             <Button label="Submit" style={{marginTop:"1rem"}} onClick={(e)=>Klik(e)}/>
            <div style={{display: "flex", flexDirection:"column"}}>
            {/* {coba.map(anjing =>{
                return(
                    <span>{anjing[1].}</span>
                )
            })} */}
            <span>{coba[0].nama}</span> {/* mengambil data objek pertama didalamn aray dan akses variable nama */}
            </div>
        </div>
            



    </div>
  
)

}

export default Coba