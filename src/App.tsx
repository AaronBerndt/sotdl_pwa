import { RedirectLoginOptions, useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "./components/CharactersPage/Atoms/LoginButton/LoginButton";
import Routes from "./MainRoutes";

function App() {
  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();

  useEffect(() => {
    (async function login() {
      if (!isLoading && !user) {
        await loginWithRedirect();
      }
    })();
  }, [isLoading]);

  return <Routes />;
}

export default App;
