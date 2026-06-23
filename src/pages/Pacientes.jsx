import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Pacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [pacienteAEliminar, setPacienteAEliminar] = useState(null);

    useEffect(() => {
        loadPacientes();
    }, []);

    //funcion para cargar pacientes
    async function loadPacientes() {
        try {
            const data = await window.api.getPacientes();
            setPacientes(data);
        } catch (error) {
            console.error("Error cargando pacientes:", error);
        }
    }

    //confirmar eliminacion de paciente
    async function confirmarEliminacion() {
        try {
            await window.api.deletePaciente(pacienteAEliminar);

            setPacienteAEliminar(null);
            loadPacientes();
        } catch (error) {
            console.error("Error eliminando paciente:", error);
        }
    }
    return (
        <>
            <div className="layout">

                <Navbar />

                <div className="page">

                    <h1 className="page-title">Pacientes</h1>

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>DNI</th>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pacientes.map((paciente) => (
                                <tr key={paciente.dni}>
                                    <td>{paciente.dni}</td>
                                    <td>{paciente.nombre}</td>
                                    <td>{paciente.telefono}</td>

                                    <td>
                                        <button className="delete-btn" onClick={() =>
                                            setPacienteAEliminar(paciente.dni)
                                        }>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {pacienteAEliminar && (
                        <div className="modal-overlay">
                            <div className="modal">
                                <h3>
                                    Confirmar eliminación
                                </h3>

                                <p>
                                    ¿Seguro que quieres eliminar este paciente?
                                </p>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "10px",
                                        marginTop: "15px"
                                    }}
                                >
                                    <button
                                        onClick={() =>
                                            setPacienteAEliminar(null)
                                        }
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={confirmarEliminacion}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Pacientes;