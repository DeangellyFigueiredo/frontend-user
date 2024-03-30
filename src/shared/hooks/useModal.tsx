import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface ModalContextProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  openModal: () => void;
  closeModal: () => void;
  idObject: any;
  setIdObject: Dispatch<SetStateAction<any>>;
}

interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext({} as ModalContextProps);

export function ModalProvider({children}: ModalProviderProps) {
  const [open, setOpen] = useState(false);
  const [idObject, setIdObject] = useState(null);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setIdObject(null);
  };

  return (
    <ModalContext.Provider
      value={{open, setOpen, openModal, closeModal, idObject, setIdObject}}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
