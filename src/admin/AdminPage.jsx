import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Painel Administrativo</h1>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </header>
      <main className="admin-content">
        <AdminDashboard />
      </main>
    </div>
  );
};

export default AdminPage;
