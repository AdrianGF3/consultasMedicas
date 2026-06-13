import { useState } from "react";
import Navbar from "../components/Navbar";

function NewPatient() {

    return (
        <>

            <Navbar />

            <h1>Nuevo Paciente</h1>

            <form>
                <div>
                    <label>Nombre</label>
                    <br />
                    <input value={nombre}/>
                </div>

                <br />

                <div>
                    <label>DNI</label>
                    <br />
                    <input value={dni}/>
                </div>

                <br />

                <div>
                    <label>Teléfono</label>
                    <br />
                    <input value={telefono}/>
                </div>

                <br />

                <button type="submit">
                    Guardar
                </button>
            </form>
        </>
    );
}

export default NewPatient;