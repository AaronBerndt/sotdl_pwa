import React from "react";
import { Switch, Route } from "react-router-dom";
import CharacterSheetPage from "./components/CharacterSheetPage";
import CharactersPage from "./components/CharactersPage";
import CreateCharacterPage from "./components/CreateCharacterPage";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <CharactersPage />
      </Route>
      <Route path="/characters/:characterId">
        <CharacterSheetPage />
      </Route>
      <Route path="/create_character">
        <CreateCharacterPage />
      </Route>
      <Route path="/edit_character/:characterId">
        <CreateCharacterPage />
      </Route>
    </Switch>
  );
}
