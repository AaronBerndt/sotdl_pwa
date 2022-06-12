import { Route, Routes } from "react-router-dom";
import CharacterSheetPage from "./components/CharacterSheetPage";
import CharactersPage from "./components/CharactersPage";
import CreateCombatPage from "./components/CombatBuilderPage";
import CombatTrackerPage from "./components/CombatTrackerPage";
import CompendiumPage from "./components/CompendiumPage";
import ContentAdderPage from "./components/ContentAdderPage";
import CreateCharacterPage from "./components/CreateCharacterPage";
import ManageDetailsPage from "./components/CreateCharacterPage/ManageDetailsPage";
import ManageEquipmentPage from "./components/CreateCharacterPage/ManageEquipmentPage";
import ManageSpellPage from "./components/CreateCharacterPage/ManageSpellPage";
import ManagePartiesPage from "./components/ManagePartiesPage";
import CreatePartyView from "./components/ManagePartiesPage/Organisms/CreatePartyView/CreatePartyView";

import ManageOveridesPage from "./components/CreateCharacterPage/ManageOveridesPage";
import GameMasterPage from "./components/GameMasterPage";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CharactersPage />} />
      <Route path="/characters" element={<CharactersPage />} />
      <Route
        path="/characters/:characterId/*"
        element={<CharacterSheetPage />}
      />
      <Route path="/create_character/*" element={<CreateCharacterPage />} />
      <Route
        path="/edit_character/:characterId/*"
        element={<CreateCharacterPage />}
      />
      <Route
        path="/edit_character/:characterId/spells"
        element={<ManageSpellPage />}
      />
      <Route
        path="/edit_character/:characterId/items"
        element={<ManageEquipmentPage />}
      />

      <Route
        path="/edit_character/:characterId/details"
        element={<ManageDetailsPage />}
      />

      <Route
        path="/edit_character/:characterId/overides"
        element={<ManageOveridesPage />}
      />

      <Route path="/compendium" element={<CompendiumPage />} />
      <Route path="/game_master" element={<GameMasterPage />} />
      <Route path="/content_adder" element={<ContentAdderPage />} />
      <Route path="/manage_parties" element={<ManagePartiesPage />} />
      <Route path="/combat_builder" element={<CreateCombatPage />} />
      <Route path="/combats/" element={<CombatTrackerPage />} />
      <Route path="/combats/:combatId" element={<CombatTrackerPage />} />
      <Route path="/combat_builder" element={<CreateCombatPage />} />
      <Route path="/create_party" element={<CreatePartyView />} />
      <Route path="/edit_party/:partyId" element={<CreatePartyView />} />
    </Routes>
  );
}
