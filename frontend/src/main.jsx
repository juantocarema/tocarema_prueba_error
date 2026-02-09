import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Crudproveedor from './proveedores/Crudproveedor.jsx';
import CrudResponsables from './responsable/CrudResponsable.jsx';
import CrudpersonaSolicitante from './personaSolicitante/CrudpersonaSolicitante.jsx';
import CrudEstadoSolicitud from './estadosolicitud/crudestadosolicitud.jsx';
import CrudEstadoEquipo from './estadoequipo/crudestadoequipo.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<div className="text-center"><h2>Bienvenido al sistema</h2><p>Seleccione una opción del menú para ver las tablas.</p></div>} />
          <Route path="responsables" element={<CrudResponsables />} />
          <Route path="proveedores" element={<Crudproveedor />} />
          <Route path="personas" element={<CrudpersonaSolicitante />} />
          <Route path="estadosolicitud" element={<CrudEstadoSolicitud />} />
          <Route path="estadoequipo" element={<CrudEstadoEquipo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)