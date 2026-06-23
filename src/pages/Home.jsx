import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/pages.css";

function Home() {
    const [citas, setCitas] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [citaSeleccionada, setCitaSeleccionada] = useState(null);

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
            <div className="layout">

                <Navbar />

                <div className="page">

                    <h1 className="page-title">Citas Médicas</h1>

                    <input
                        className="search-input"
                        type="text"
                        placeholder="Buscar por DNI"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>DNI</th>
                                <th>Paciente</th>
                                <th>Teléfono</th>
                                <th>Fecha</th>
                                <th>Detalle</th>
                                <th>Acción</th>
                            </tr>
                        </thead>

                        <tbody>
                            {citasFiltradas.map((cita) => (
                                <tr key={cita.id}>
                                    <td>{cita.dni}</td>
                                    <td>{cita.nombre}</td>
                                    <td>{cita.telefono}</td>
                                    <td>{cita.fecha}</td>
                                    <td>
                                        <button
                                            className="save-btn"
                                            onClick={() =>
                                                setCitaSeleccionada(cita)
                                            }
                                        >
                                            Ver detalle
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                eliminarCita(cita.id)
                                            }>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {citaSeleccionada && (
                        <div className="modal-overlay">
                            <div className="modal">
                                <h2>Detalle de la cita</h2>

                                <p>
                                    <strong>Paciente:</strong>{" "}
                                    {citaSeleccionada.nombre}
                                </p>

                                <p>
                                    <strong>DNI:</strong>{" "}
                                    {citaSeleccionada.dni}
                                </p>

                                <p>
                                    <strong>Fecha:</strong>{" "}
                                    {citaSeleccionada.fecha}
                                </p>

                                <p>
                                    <strong>Dolencia:</strong>
                                </p>

                                <p className="descripcion">
                                    {citaSeleccionada.descripcion}
                                </p>

                                <button
                                    className="save-btn"
                                    onClick={() =>
                                        setCitaSeleccionada(null)
                                    }
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;