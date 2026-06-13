import { Link } from "react-router-dom";
import "../styles/sidebar.css";

function Navbar() {
  return (
    <nav className="sidebar">
      <Link to="/">Citas</Link> 
      <Link to="/pacientes">Pacientes</Link>
      <Link to="/new-paciente">Nuevo Paciente</Link>
      <Link to="/new-cita">Nueva Cita</Link>
    </nav>
  );
}

export default Navbar;