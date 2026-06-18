import { useState } from "react";
import Navbar from "../components/Navbar";

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

            alert("Paciente guardado");

            setNombre("");
            setDni("");
            setTelefono("");

        } catch (error) {
            console.error("Error:", error);
            alert("Error al guardar paciente");
        }
    }

    return (
        <>
            <div className="layout">
                
                <Navbar />

                <div className="content">

                    <h1>Nuevo Paciente</h1>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nombre</label>
                            <br />
                            <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </div>

                        <br />

                        <div>
                            <label>DNI</label>
                            <br />
                            <input value={dni} onChange={(e) => setDni(e.target.value)} />
                        </div>

                        <br />

                        <div>
                            <label>Teléfono</label>
                            <br />
                            <input value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                        </div>

                        <br />

                        <button type="submit">
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewPaciente;