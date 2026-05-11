import { create } from 'zustand';

const useAdminStore = create((set) => ({
  admin: null,
  isAdmin: false,
  isModalOpen: false,
  isError: false,

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  login: (adminData) => set({ 
    admin: adminData, 
    isAdmin: true, 
    isError: false 
  }),

  logout: () => set({ 
    admin: null, 
    isAdmin: false, 
    isError: false 
  }),
}));

export default useAdminStore;
