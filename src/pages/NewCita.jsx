import Navbar from "../components/Navbar";

function NewCita() {
    return (
        <>

            <Navbar />

            <h1>Nueva Cita</h1>

            <form>
                <div>
                    <label>Paciente</label>
                    <br />
                    <select>
                        <option></option>
                        <option></option>
                    </select>
                </div>

                <br />

                <div>
                    <label>Fecha</label>
                    <br />
                    <input type="date"/>
                </div>

                <br />

                <div>
                    <label>Descripción de la dolencia</label>
                    <br />
                    <textarea rows="4"></textarea>
                </div>

                <br />

                <button type="submit">
                    Guardar
                </button>
            </form>

        </>
    );
}

export default NewCita;