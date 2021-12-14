import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import AdjustAttributesView from "./Organisms/AttributesView/AdjustAttributesView";
import ChoiceView from "./Organisms/ChoiceView/ChoiceView";
import PickDetailsView from "./Organisms/PickDetailsView/PickDetailsView";
import PickEquipmentView from "./Organisms/PickEquipmentView/PickEquipmentView";
import PickSpellsView from "./Organisms/PickSpellsView/PickSpellsView";

export default function Routes() {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`}>
        <Redirect to={`${path}/Ancestry&Paths`} />
      </Route>
      <Route path={`${path}/Ancestry&Paths`}>
        <ChoiceView />
      </Route>
      <Route path={`${path}/Adjust Attributes`}>
        <AdjustAttributesView />
      </Route>
      <Route path={`${path}/spells`}>
        <PickSpellsView />
      </Route>
      <Route path={`${path}/equipment`}>
        <PickEquipmentView />
      </Route>
      <Route path={`${path}/details`}>
        <PickDetailsView />
      </Route>
    </Switch>
  );
}
