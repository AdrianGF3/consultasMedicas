import Navbar from "../components/Navbar";

function Home() {

    return (
        <>
            <Navbar />

            <h1>Citas Médicas</h1>

            //filtro de citas por dni
            <input
                type="text"
                placeholder="Buscar por DNI"
                value={filtro}
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
                                <button>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Home;