import { Route, useMatch, Routes, Navigate } from "react-router-dom";
import AdjustAttributesView from "./Organisms/AttributesView/AdjustAttributesView";
import ChoiceView from "./Organisms/ChoiceView/ChoiceView";
import PickDetailsView from "./Organisms/PickDetailsView/PickDetailsView";
import PickEquipmentView from "./Organisms/PickEquipmentView/PickEquipmentView";
import PickSpellsView from "./Organisms/PickSpellsView/PickSpellsView";

export default function CreateCharacterSheetPageRoutes() {
  const { path, url } = useMatch("");

  return (
    <Routes>
      <Route path={`${path}`}>
        <Navigate to={`${path}/Ancestry&Paths`} replace />
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
    </Routes>
  );
}
