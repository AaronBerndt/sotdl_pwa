import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import AdjustAttributesView from "./Organisms/AttributesView/AdjustAttributesView";
import ChoiceView from "./Organisms/ChoiceView/ChoiceView";
import PickDetailsView from "./Organisms/PickDetailsView/PickDetailsView";
import PickEquipmentView from "./Organisms/PickEquipmentView/PickEquipmentView";
import PickSpellsView from "./Organisms/PickSpellsView/PickSpellsView";

export default function Routes() {
  const { path, url } = useRouteMatch();

  console.log(path, url);
  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Redirect to={`${path}/Ancestry&Paths`} />
      </Route>
      <Route exact path={`${path}/Ancestry&Paths`}>
        <ChoiceView />
      </Route>
      <Route exact path={`${path}/Adjust Attributes`}>
        <AdjustAttributesView />
      </Route>
      <Route exact path={`${path}/spells`}>
        <PickSpellsView />
      </Route>
      <Route exact path={`${path}/equipment`}>
        <PickEquipmentView />
      </Route>
      <Route exact path={`${path}/details`}>
        <PickDetailsView />
      </Route>
    </Switch>
  );
}
