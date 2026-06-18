import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Home() {
    const [citas, setCitas] = useState([]);
    const [filtro, setFiltro] = useState("");

    useEffect(() => {
        // Logica para obtener las citas
        loadCitas();
    }, []);

    //cargar citas desde la base de datos
    async function loadCitas() {
        try {
            const data = await window.api.getCitas();
            setCitas(data);
        } catch (error) {
            console.error("Error cargando citas:", error);
        }
    }

    //eliminar cita por id
    async function eliminarCita(id) {
        try {
            await window.api.deleteCita(id);
            loadCitas();
        } catch (error) {
            console.error(error);
        }
    }

    //filtro de citas por dni
    const citasFiltradas = citas.filter((cita) =>
        cita.dni
            .toLowerCase()
            .includes(filtro.toLowerCase())
    );

    return (
        <>
            <Navbar />

            <h1>Citas Médicas</h1>

            //filtro de citas por dni
            <input
                type="text"
                placeholder="Buscar por DNI"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
            />

            <table>
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Paciente</th>
                        <th>Teléfono</th>
                        <th>Fecha</th>
                        <th>Dolencia</th>
                        <th>Acción</th>
                    </tr>
                </thead>

                <tbody>
                    {citas.map((cita) => (
                        <tr key={cita.id}>
                            <td>{cita.dni}</td>
                            <td>{cita.nombre}</td>
                            <td>{cita.telefono}</td>
                            <td>{cita.fecha}</td>
                            <td>{cita.descripcion}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        eliminarCita(cita.id)
                                    }>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Home;