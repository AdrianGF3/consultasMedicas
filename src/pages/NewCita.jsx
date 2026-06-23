import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/pages.css";

function NewCita() {
    const [pacientes, setPacientes] = useState([]);
    const [fecha, setFecha] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [pacienteDni, setPacienteDni] = useState("");

    useEffect(() => {
        loadPacientes();
    }, []);

    async function loadPacientes() {
        const data = await window.api.getPacientes();
        setPacientes(data);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await window.api.addCita({
                paciente_dni: pacienteDni,
                fecha,
                descripcion
            });

            //alert("Cita guardada");

            setPacienteDni("");
            setFecha("");
            setDescripcion("");
        } catch (error) {
            console.error(error);
            //alert("Error al guardar la cita");
        }
    }

    return (
        <>
            <div className="layout">

                <Navbar />

                <div className="page">
                    <h1 className="page-title">Nueva Cita</h1>

                    <form className="form-card" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Paciente</label>
                            <br />
                            <select
                                className="form-input"
                                value={pacienteDni}
                                onChange={(e) =>
                                    setPacienteDni(e.target.value)
                                }
                                required
                            >
                                <option value="">
                                    Selecciona un paciente
                                </option>

                                {pacientes.map((p) => (
                                    <option key={p.dni} value={p.dni}>
                                        {p.nombre} ({p.dni})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <br />

                        <div className="form-group">
                            <label className="form-label">Fecha</label>
                            <br />
                            <input className="form-input" type="date" value={fecha}
                                onChange={(e) =>
                                    setFecha(e.target.value)
                                }
                                required />
                        </div>

                        <br />

                        <div className="form-group">
                            <label className="form-label">Descripción de la dolencia</label>
                            <br />
                            <textarea className="form-input form-textarea" value={descripcion}
                                onChange={(e) =>
                                    setDescripcion(e.target.value)
                                }
                                required>

                            </textarea>
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

export default NewCita;