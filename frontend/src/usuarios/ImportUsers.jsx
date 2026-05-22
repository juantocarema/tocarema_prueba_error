import React, { useState } from 'react';
import axios from 'axios';
import { URI } from '../config/api';

const ImportUsers = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Por favor selecciona un archivo Excel (.xlsx) o CSV');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${URI}/admin/import-users`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage(response.data.message);
      setFile(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al importar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Importar Usuarios Permitidos</h4>
        </div>
        <div className="card-body">
          <p className="text-muted">
            Sube un archivo Excel (.xlsx) con la lista de personas autorizadas para registrarse. 
            El archivo debe contener una columna llamada <strong>Documento</strong>. Opcionalmente puede tener <strong>Nombres</strong> y <strong>Email</strong>.
          </p>

          <div className="mb-3">
            <input 
              type="file" 
              className="form-control" 
              accept=".xlsx, .xls, .csv" 
              onChange={handleFileChange} 
            />
          </div>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <button 
            className="btn btn-primary" 
            onClick={handleUpload} 
            disabled={loading || !file}
          >
            {loading ? 'Importando...' : 'Subir e Importar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportUsers;
