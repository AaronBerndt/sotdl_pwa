import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import AncestryView from "./Organisms/AncestryView/AncestryView";
import PathsView from "./Organisms/PathsView/PathsView";

export default function Routes() {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Redirect to={`${url}/ancestry`} />
      </Route>
      <Route exact path={`${path}/ancestry`}>
        <AncestryView />
      </Route>
      <Route exact path={`${path}/paths`}>
        <PathsView />
      </Route>
      <Route exact path={`${path}/attributes`}>
        <PathsView />
      </Route>
    </Switch>
  );
}
