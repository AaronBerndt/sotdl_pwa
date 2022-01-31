import { Route, useMatch, Routes, Navigate } from "react-router-dom";
import AdjustAttributesView from "./Organisms/AttributesView/AdjustAttributesView";
import ChoiceView from "./Organisms/ChoiceView/ChoiceView";
import PickDetailsView from "./Organisms/PickDetailsView/PickDetailsView";
import PickEquipmentView from "./Organisms/PickEquipmentView/PickEquipmentView";
import PickSpellsView from "./Organisms/PickSpellsView/PickSpellsView";

export default function CreateCharacterSheetPageRoutes() {
  return (
    <Routes>
      <Route path={`Ancestry&Paths`} element={<ChoiceView />} />
      <Route path={`spells`} element={<PickSpellsView />} />
      <Route path={`equipment`} element={<PickEquipmentView />} />
      <Route path={`details`} element={<PickDetailsView />} />
      <Route path={`Adjust Attributes`} element={<AdjustAttributesView />} />
    </Routes>
  );
}


