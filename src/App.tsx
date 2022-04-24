import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Routes from "./MainRoutes";

function App() {
  const { isLoading, loginWithRedirect, user } = useAuth0();

  useEffect(() => {
    (async function login() {
      if (!isLoading && !user) {
        await loginWithRedirect();
      }
    })();
  }, [isLoading, loginWithRedirect, user]);

  return <Routes />;
}

export default App;
