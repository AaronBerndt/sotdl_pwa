import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import SpellsTable from "./Molecules/SpellsTable/SpellsTable";
import ActionsView from "./Organisms/ActionsViews/ActionsViews";
import AttributesView from "./Organisms/AttributesView/AttributesView";
import CurrencyView from "./Organisms/CurrencyView/CurrencyView";
import EquipmentView from "./Organisms/EquipmentView/EquipmentView";
import TalentsView from "./Organisms/TalentsView/TalentsView";

export default function Routes() {
  let { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${url}/attributes`}>
        <AttributesView />
      </Route>
      <Route path={`${url}/actions`}>
        <ActionsView />
      </Route>
      <Route path={`${url}/magic`}>
        <SpellsTable />
      </Route>
      <Route path={`${url}/equipment`}>
        <EquipmentView />
      </Route>
      <Route path={`${url}/currency`}>
        <CurrencyView />
      </Route>
      <Route path={`${url}/talents`}>
        <TalentsView />
      </Route>
    </Switch>
  );
}
