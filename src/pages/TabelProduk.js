import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios, { Axios } from "axios";
import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";

const TabelProduk = () => {
  const [datas, setDatas] = useState([]);
  const [r, setR] = useState(false);
  const toast = useRef(null);
  const[form,setForm] = useState({})
  
  
  
  
  const actionBodyTemplate = (data) => { 
    return (
        <div style={{ display: "flex", gap: "0.5rem" }}>
      <Button
        type="button"
        icon="pi pi-cog"
        severity="danger"
        rounded
        onClick={(e) => Hapus(e, data)}
      ></Button>
      <Button
        type="button"
        icon="pi pi-pencil"
        severity="warning"
        rounded
        onClick={(e) => Edit(e, data)}
      ></Button>
      </div>
      
    );
  };

  useEffect(() => {
    axios.get("http://localhost:8000/Products").then((res) => {
      setDatas(res.data);
      console.log(res);
    });
  }, [r]);

  const Hapus = async (e, data) => {
    try {
      await axios
        .delete(`http://localhost:8000/Products/${data.id}`, {
          "Content-Type": "application/json",
        })
        .then((res) => {
          setR(!r);
          console.log(res);
          toast.current.show({
            severity:'error', summary: 'Error',
            detail: "Data Berhasil Di Hapus",
            life: 3000,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };


  const Edit = (e, data)=>{
      setForm({...data});
  }
  const Submit = async () => {
  try {
    if (!form.title || !form.category || !form.rating) {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Semua field harus diisi",
        life: 3000,
      });
      return;
    }

    if (form.id) {
      await axios.put(
        `http://localhost:8000/Products/${form.id}`,
        form
      );

      toast.current.show({
        severity: "success",
        summary: "Updated",
        detail: "Data berhasil diupdate",
        life: 3000,
      });
    } else {
      await axios.post("http://localhost:8000/Products", form);

      toast.current.show({
        severity: "success",
        summary: "Created",
        detail: "Data berhasil ditambahkan",
        life: 3000,
      });
    }

    setForm({});

    setR(!r);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5rem",
        flexDirection: "column"
      }}
      className="Container"
    >
      <Toast ref={toast} />
      <span style={{fontSize:"3rem", fontWeight :"bold"}}>{form?.id ? "Update Data" : "Tambah Data"}</span>
      <div className="InputArea" style={{display:"flex", gap:"2rem", marginBottom:"3rem", marginTop:"3rem"}}>
        <InputText placeholder="Name" value={form?.title} onChange={(e)=> setForm ({...form, title : e.target.value})} />
        <InputText placeholder="Catgory" value={form?.category} onChange={(e)=> setForm ({...form, category : e.target.value})} />
        <InputText placeholder="Rating" value={form?.rating} onChange={(e)=> setForm ({...form, rating : e.target.value})} />
        <Button label="Submit"   label={form?.id ? "Update" : "Submit"}
         onClick={Submit}/>
      </div>
      <DataTable value={datas} showGridlines tableStyle={{ minWidth: "50rem" }} paginator rows={5}>
        <Column field="title" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="rating" header="Rating"></Column>
        <Column
          body={(data) => actionBodyTemplate(data)}
          header="Action"
        ></Column>
      </DataTable>
    </div>
  );
};
export default TabelProduk;
