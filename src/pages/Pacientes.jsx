import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Patients() {
    return (
        <>

            <Navbar />

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
                                <button>Editar</button>
                                <button>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    );
}

export default Patients;