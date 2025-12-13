// src/stores/useModalStore.js (또는 .ts)
import { create } from 'zustand';

export const useModalStore = create((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}));