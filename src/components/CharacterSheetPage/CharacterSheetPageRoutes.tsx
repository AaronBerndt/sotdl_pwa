import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import SpellsTable from "./Molecules/SpellsTable/SpellsTable";
import ActionsView from "./Organisms/ActionsViews/ActionsViews";
import AttributesView from "./Organisms/AttributesView/AttributesView";
import CurrencyView from "./Organisms/CurrencyView/CurrencyView";
import DetailsView from "./Organisms/DetailsView/DetailsView";
import EquipmentView from "./Organisms/EquipmentView/EquipmentView";
import TalentsView from "./Organisms/TalentsView/TalentsView";

export default function Routes() {
  const { path, url } = useRouteMatch();

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
        <SpellsTable />
      </Route>
      <Route path="/equipment">
        <EquipmentView />
      </Route>
      <Route path="/currency">
        <CurrencyView />
      </Route>
      <Route path="/talents">
        <TalentsView />
      </Route>
      <Route exact path={`${path}/details`}>
        <DetailsView />
      </Route>
    </Switch>
  );
}
