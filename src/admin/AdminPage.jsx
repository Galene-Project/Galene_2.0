import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-col overflow-hidden">
      <header className="p-4 bg-gray-800 border-b border-gray-700 flex justify-end items-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg transition-colors"
        >
          Fechar
        </button>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <AdminDashboard />
      </main>
    </div>
  );
};

export default AdminPage;
