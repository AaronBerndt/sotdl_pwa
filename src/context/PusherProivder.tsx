import { createContext, useContext } from "react";

const PusherContext = createContext<any>({
  channel: null,
});

export function PusherProivder({ children, pusher }: any) {
  const channel = pusher.subscribe("my-channel");

  return (
    <PusherContext.Provider value={{ channel }}>
      {children}
    </PusherContext.Provider>
  );
}

export function usePusherContext() {
  return useContext(PusherContext);
}
