import { useEffect, useState } from "react";
import { getAlojamientosZaragoza, getAlojamientosMurcia } from "./apiAlojamientos.js";
import "./Alojamientos.css";

function Alojamientos(){
    const [alojamientos, setAlojamientos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() =>{
        async function cargar(){
            try{

            }catch(err){
                console.error("Error:", err)
                setError("No se puede cargar los alojamientos ")
            }finally{
                setCargando(false);
            }
        }
        cargar();
    }, []);
    if(cargando) return <p>Cargando alojamientos...</p>
    if (error) return <p>{error}</p> 


    return(
        <section>
            <h2>Alojamientos</h2>
            {alojamientos.length ===0 ?(
                <p>No hay alojamientos disponibles</p>
            ) :(
                <div className="grid">
                    {alojamientos.map((r) =>
                        <div key={r.id} className="card"> 
                            <h3>{r.nombre}</h3>
                            <p>{r.dresciption}</p>
                             <p>{r.streetAddress}</p>
                        </div>
                    )}
                </div>
            )
        }
        </section>
    );
}
export default Alojamientos