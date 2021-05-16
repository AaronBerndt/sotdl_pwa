import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ActionsView from "./Organisms/ActionsViews/ActionsViews";
import AttributesView from "./Organisms/AttributesView/AttributesView";
import EquipmentView from "./Organisms/EquipmentView/EquipmentView";
import TalentsView from "./Organisms/TalentsView/TalentsView";

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
        <ActionsView />
      </Route>
      <Route path="/magic">
        <p>magic</p>
      </Route>
      <Route path="/equipment">
        <EquipmentView />
      </Route>
      <Route path="/talents">
        <TalentsView />
      </Route>
    </Switch>
  );
}
