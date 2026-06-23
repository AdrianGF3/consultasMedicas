import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/pages.css";

function NewPaciente() {
    const [nombre, setNombre] = useState("");
    const [dni, setDni] = useState("");
    const [telefono, setTelefono] = useState("");

    //funcion para guardar datos del paciente
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await window.api.addPaciente({
                dni,
                nombre,
                telefono
            });

            //En Electron + React (sobre todo con Vite), el alert() puede dejar el foco del renderer en un estado raro
            //alert("Paciente guardado");

            setNombre("");
            setDni("");
            setTelefono("");

        } catch (error) {
            console.error("Error:", error);
            //alert("Error al guardar paciente");
        }
    }

    return (
        <>
            <div className="layout">
                
                <Navbar />

                <div className="page">

                    <h1 className="page-title">Nuevo Paciente</h1>

                    <form className="form-card" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Nombre</label>
                            <br />
                            <input className="form-input" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </div>

                        <br />

                        <div>
                            <label className="form-label">DNI</label>
                            <br />
                            <input className="form-input" value={dni} onChange={(e) => setDni(e.target.value)} />
                        </div>

                        <br />

                        <div className="form-group">
                            <label className="form-label">Teléfono</label>
                            <br />
                            <input className="form-input" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                        </div>

                        <br />

                        <button className="save-btn" type="submit">
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewPaciente;