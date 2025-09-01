import { create } from "zustand";

const defaultVAlues = { id: "", title: "" };
interface RenameProps {
  initialValue: typeof defaultVAlues;
  isOpen: boolean;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}

export const useRenameBoardStore = create<RenameProps>((set) => ({
  initialValue: defaultVAlues,
  isOpen: false,

  onOpen: (id: string, title: string) => {
    try {
      set({
        initialValue: { id, title },
        isOpen: true,
      });
    } catch (error) {
      console.error(error);
    }
  },

  onClose: () => {
    try {
      set({
        isOpen: false,
        initialValue: defaultVAlues,
      });
    } catch (error) {
      console.error(error);
    }
  },
}));
