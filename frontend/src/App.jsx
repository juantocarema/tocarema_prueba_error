import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Ecosystem</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/responsables">Responsables</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/proveedores">Proveedores</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/personas">Personas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/estadosolicitud">Estados Solicitud</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/estadoequipo">Estados Equipo</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container mt-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
