import React from "react";
import { Switch, useRouteMatch, Redirect, Route } from "react-router-dom";
import ActionsView from "./Organisms/ActionsViews/ActionsViews";
import AttributesView from "./Organisms/AttributesView/AttributesView";
import CurrencyView from "./Organisms/CurrencyView/CurrencyView";
import DetailsView from "./Organisms/DetailsView/DetailsView";
import EquipmentView from "./Organisms/EquipmentView/EquipmentView";
import MagicView from "./Organisms/MagicView/MagicView";
import TalentsView from "./Organisms/TalentsView/TalentsView";

export default function Routes() {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`}>
        <Redirect to={`${url}/attributes`} />
      </Route>
      <Route path={`${path}/attributes`}>
        <AttributesView />
      </Route>
      <Route path={`${path}/actions`}>
        <ActionsView />
      </Route>
      <Route path={`${path}/magic`}>
        <MagicView />
      </Route>
      <Route path={`${path}/equipment`}>
        <EquipmentView />
      </Route>
      <Route path={`${path}/currency`}>
        <CurrencyView />
      </Route>
      <Route path={`${path}/talents`}>
        <TalentsView />
      </Route>
      <Route path={`${path}/details`}>
        <DetailsView />
      </Route>
    </Switch>
  );
}
