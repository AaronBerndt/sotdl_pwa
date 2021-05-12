import Grid from "@material-ui/core/Grid";
import React from "react";
import CharacterNameTag from "./Atoms/CharacterNameTag/CharacterNameTag";
import ViewMenu from "./Atoms/ViewMenu/ViewMenu";
import { CharacterAttributesProvider } from "./context/CharacterAttributesContext";
import { useCharacter } from "./hooks/useCharacters";
import AttributeBoxList from "./Molecules/AttributeBox/AttributeBox";
import HealthWorkspaceModal from "./Molecules/HealthWorkspaceModal/HealthWorkspaceModal";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./CharacterSheetPageRoutes";

export default function CharacterSheetPage(): JSX.Element {
  const { data: characterData, isLoading } = useCharacter(1);
  return (
    <Router basename="/attributes">
      {isLoading ? (
        <p>Is Loading....</p>
      ) : (
        <CharacterAttributesProvider character={characterData?.data}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <CharacterNameTag {...characterData?.data} />
            </Grid>
            <Grid item xs={4}>
              <HealthWorkspaceModal character={characterData?.data} />
            </Grid>
            <Grid item>
              <AttributeBoxList
                attributeList={["Speed", "Corruption", "Insanity", "Defense"]}
              />
            </Grid>
            <Grid item xs={12}>
              <ViewMenu />
            </Grid>
          </Grid>
          <Grid>
            <Routes />
          </Grid>
        </CharacterAttributesProvider>
      )}
    </Router>
  );
}
