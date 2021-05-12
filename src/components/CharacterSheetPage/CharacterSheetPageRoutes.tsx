import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AttributesView from "./Organisms/AttributesView/AttributesView";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/attributes" />
      </Route>
      <Route path="/attributes">
        <AttributesView />
      </Route>
      <Route path="/actions">
        <p>actions</p>
      </Route>
      <Route path="/magic">
        <p>magic</p>
      </Route>
      <Route path="/equipment">
        <p>equipment</p>
      </Route>
      <Route path="/talents">
        <p>talents</p>
      </Route>
    </Switch>
  );
}
