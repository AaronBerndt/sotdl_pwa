import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

export default function Routes() {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Redirect to={`${url}/ancestry`} />
      </Route>

      <Route exact path={`${path}/ancestry`}></Route>
    </Switch>
  );
}
