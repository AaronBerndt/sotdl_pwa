import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import SpellsTable from "./Molecules/SpellsTable/SpellsTable";
import ActionsView from "./Organisms/ActionsViews/ActionsViews";
import AttributesView from "./Organisms/AttributesView/AttributesView";
import CurrencyView from "./Organisms/CurrencyView/CurrencyView";
import EquipmentView from "./Organisms/EquipmentView/EquipmentView";
import TalentsView from "./Organisms/TalentsView/TalentsView";

export default function Routes() {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Redirect to={`${url}/attributes`} />
      </Route>
      <Route exact path={`${path}/attributes`}>
        <AttributesView />
      </Route>
      <Route exact path={`${path}/actions`}>
        <ActionsView />
      </Route>
      <Route exact path={`${path}/magic`}>
        <SpellsTable />
      </Route>
      <Route exact path={`${path}/equipment`}>
        <EquipmentView />
      </Route>
      <Route exact path={`${path}/currency`}>
        <CurrencyView />
      </Route>
      <Route exact path={`${path}/talents`}>
        <TalentsView />
      </Route>
    </Switch>
  );
}
