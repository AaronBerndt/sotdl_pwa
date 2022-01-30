import { RouteMatch, Route, Routes, Navigate } from "react-router-dom";
import ActionsView from "./Organisms/ActionsViews/ActionsViews";
import AttributesView from "./Organisms/AttributesView/AttributesView";
import CurrencyView from "./Organisms/CurrencyView/CurrencyView";
import DetailsView from "./Organisms/DetailsView/DetailsView";
import EquipmentView from "./Organisms/EquipmentView/EquipmentView";
import MagicView from "./Organisms/MagicView/MagicView";
import TalentsView from "./Organisms/TalentsView/TalentsView";

export default function CharacterSheetPageRoutes() {
  // const { path, url } = useRouteMatch();

  return (
    <Routes>
      <Route path={`attributes`} element={<AttributesView />} />
      <Route path={`actions`} element={<ActionsView />} />
      <Route path={`magic`} element={<MagicView />} />
      <Route path={`equipment`} element={<EquipmentView />} />
      <Route path={`currency`} element={<CurrencyView />} />
      <Route path={`talents`} element={<TalentsView />} />
      <Route path={`details`} element={<DetailsView />} />
    </Routes>
  );
}

