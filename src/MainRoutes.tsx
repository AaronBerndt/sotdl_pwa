import { Route, Routes } from "react-router-dom";
import CharacterSheetPage from "./components/CharacterSheetPage";
import CharacterSheetPageRoutes from "./components/CharacterSheetPage/CharacterSheetPageRoutes";
import CharactersPage from "./components/CharactersPage";
import CreateCombatPage from "./components/CombatBuilderPage";
import CompendiumPage from "./components/CompendiumPage";
import ContentAdderPage from "./components/ContentAdderPage";
import CreateCharacterPage from "./components/CreateCharacterPage";
import CreateCharacterSheetPageRoutes from "./components/CreateCharacterPage/CreateCharacterSheetPageRoutes";
import ManagePartiesPage from "./components/ManagePartiesPage";
import CreatePartyView from "./components/ManagePartiesPage/Organisms/CreatePartyView/CreatePartyView";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CharactersPage />} />
      <Route path="/character/:characterId" element={<CharacterSheetPage />}>
        <CharacterSheetPageRoutes />
      </Route>
      <Route path="/create_character" element={<CharacterSheetPage />}>
        <CreateCharacterSheetPageRoutes />
      </Route>
      <Route
        path="/edit_character/:characterId"
        element={<CreateCharacterPage />}
      >
        <CreateCharacterSheetPageRoutes />
      </Route>
      <Route path="/compendium" element={<CompendiumPage />} />
      <Route path="/content_adder" element={<ContentAdderPage />} />
      <Route path="/manage_parties" element={<ManagePartiesPage />} />
      <Route path="/combat_builder" element={<CreateCombatPage />} />
      <Route path="/create_party" element={<CreatePartyView />} />
      <Route path="/edit_party/:partyId" element={<CreatePartyView />} />
    </Routes>
  );
}
