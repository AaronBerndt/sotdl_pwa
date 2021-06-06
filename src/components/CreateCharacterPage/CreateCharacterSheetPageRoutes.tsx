import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import ChoiceView from "./Organisms/ChoiceView/ChoiceView";

export default function Routes() {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Redirect to={`${url}/ancestry`} />
      </Route>
      <Route exact path={`${path}/ancestry`}>
        <ChoiceView />
      </Route>
      {/* <Route exact path={`${path}/attributes`}> */}
      {/*   <PathsView /> */}
      {/* </Route> */}
    </Switch>
  );
}
