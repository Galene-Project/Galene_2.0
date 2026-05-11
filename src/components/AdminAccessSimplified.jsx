import React, { useEffect } from 'react';
import { create } from 'zustand';

const useAdminStore = create((set) => ({
  isAdmin: false,
  isModalOpen: false,
  isError: false,
  openModal: () => set({ isModalOpen: true, isError: false }),
  closeModal: () => set({ isModalOpen: false, isError: false }),
  login: (password) => {
    if (password === 'admin123') {
      set({ isAdmin: true, isModalOpen: false, isError: false });
    } else {
      set({ isError: true });
    }
  },
  logout: () => set({ isAdmin: false }),
}));

const AdminAccess = () => {
  const { isAdmin, isModalOpen, isError, openModal, closeModal, login, logout } = useAdminStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        openModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(e.target.password.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isAdmin ? (
        <div className="p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Panel</h1>
          <p className="text-lg text-gray-600 mb-6">You have admin access.</p>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800">Welcome</h1>
          <p className="text-lg text-gray-600 mt-4">Press Ctrl+Alt+A or click the floating button for admin access.</p>
        </div>
      )}

      {/* Floating Button */}
      {!isAdmin && (
        <button
          onClick={openModal}
          className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-2xl w-16 h-16 flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 z-40"
          title="Ctrl+Alt+A"
        >
          ⚙️
        </button>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Access</h2>
            {isError && (
              <p className="text-red-500 mb-4 font-medium text-center bg-red-50 p-3 rounded-md">
                Incorrect password!
              </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                autoFocus
                required
              />
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg font-semibold transition-colors text-lg"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-lg font-semibold transition-colors text-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAccess;
