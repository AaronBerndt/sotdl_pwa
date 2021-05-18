import { createContext, useContext } from "react";
import useToggle from "../../hooks/useToggle";

type GlobalModal = {
  bbBoxOpen: boolean;
  bbBoxToggleOpen: Function;
};

const GlobalModalContext = createContext<GlobalModal>({
  bbBoxOpen: false,
  bbBoxToggleOpen: Function,
});

export function GlobalModalProvider({ children }: any) {
  const { open: bbBoxOpen, toggleOpen: bbBoxToggleOpen } = useToggle();
  return (
    <GlobalModalContext.Provider
      value={{
        bbBoxOpen,
        bbBoxToggleOpen,
      }}
    >
      {children}
    </GlobalModalContext.Provider>
  );
}

export function useGlobalModalContext() {
  return useContext(GlobalModalContext);
}
