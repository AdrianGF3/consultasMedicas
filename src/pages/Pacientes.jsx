import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Pacientes() {
    const [pacientes, setPacientes] = useState([]);

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

    //eliminar paciente
    async function eliminarPaciente(dni) {
        const confirmacion = window.confirm(
            "¿Seguro que quieres eliminar este paciente? Esta accion no se puede deshacer!"
        );

        if (!confirmacion) return;

        await window.api.deletePaciente(dni);

        alert("Paciente eliminado correctamente");

        loadPacientes();
    }
    return (
        <>
            <div className="layout">

                <Navbar />
                
                <div className="content">

                    <h1>Pacientes</h1>

                    <table>
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
                                        <button onClick={() =>
                                            eliminarPaciente(paciente.dni)
                                        }>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Pacientes;