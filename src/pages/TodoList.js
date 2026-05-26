import { useEffect, useRef, useState } from "react"
import "../assets/TodoList.scss"
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import 'primeicons/primeicons.css';
import { Toast } from 'primereact/toast';
import axios from "axios";

const Todolist = () =>{
    const [list , setList] = useState();
    const [input, setInput] = useState('')
    const [check, setCheck]=useState(false)
      const toast = useRef(null)


    const handleclick = (e, data) =>{
        if(e.target.id==="edit"){
           setList(list.map(daftar => daftar === data ? input : daftar)) // logikanya setList cek data list di maping kalau ada daftar===data diganti menjadi input kalau tidak seperti semula
            setInput('')
        }
        else if(e.target.id==="hapus"){
            setCheck(true)
            const newList = list.filter(daftar => daftar !== data); //setlist filter daftar kalau tidak ada data set data baru
            setList(newList);
             toast.current.show({severity:'error', summary: 'Success', detail:'HAPUS', life: 3000});
            
        }
        else if(e.target.id==="submit"){
            setList([...list, input]) //pakai data yang sudah ada di list memang kemudian di tambah pakai data dari inputtext
            setInput('')
        }
    }

    useEffect(()=>{
        if(!check){
            toast.current.show({severity:'success', summary: 'Success', detail:'TERUBAH', life: 3000});
        } else{
            setCheck(false)
        }
    },[list])

    useEffect(()=>{
        
        axios.get('https://dummyjson.com/products')
        .then(res => {
            const dataYgSdhDiFilter= res.data.products.filter(data => data.category === "beauty")
            setList(dataYgSdhDiFilter)})

        
    },[])




    return( 

        <div className="container">
            <Toast ref={toast} />
            <div className="Todolist">
                <span style={{color:"white", fontWeight:"bold", fontSize:"2rem"}}>React Todo</span>
                <span style={{color:"white"}}>Steamline Your Day</span>
                <div className="daftar">
                {list?.map(data => {
                    return(
                    <span className="list">
                        {data.title} {data.category}
                        <div>
                        <Button id="edit" onClick={(e)=>handleclick(e, data)} style={{color:"white"}} icon="pi pi-pen-to-square" rounded text severity="danger" aria-label="Edit" />
                        <Button id="hapus" onClick={(e)=> handleclick(e, data)} style={{color:"white"}} icon="pi pi-trash" rounded text severity="danger" aria-label="Delete" />    
                        </div>
                    </span>
                )})}
                </div>
            <InputText style={{width:"100%"}} type="text" placeholder="Enter A Todo" value={input} onChange={(e)=> setInput(e.target.value)}  />
            <Button id="submit" onClick={(e)=>handleclick(e)} label="Submit" className="search-btn"/>
            </div>
        </div>
    )
}


export default Todolist