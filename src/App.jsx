import { HashRouter , Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Pacientes from "./pages/Pacientes";
import NewPaciente from "./pages/NewPaciente";
import NewCita from "./pages/NewCita";

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/new-paciente" element={<NewPaciente />} />
        <Route path="/new-cita" element={<NewCita />} />
      </Routes>
    </HashRouter>
  )
}

export default App
