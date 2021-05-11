import Grid from "@material-ui/core/Grid";
import React from "react";
import CharacterNameTag from "./Atoms/CharacterNameTag/CharacterNameTag";
import { CharacterAttributesProvider } from "./context/CharacterAttributesContext";
import { useCharacter } from "./hooks/useCharacters";
import AttributeBoxList from "./Molecules/AttributeBox/AttributeBox";
import HealthWorkspaceModal from "./Molecules/HealthWorkspaceModal/HealthWorkspaceModal";

export default function CharacterSheetPage() {
  const { data: characterData, isLoading } = useCharacter(1);
  return (
    <>
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
            <Grid></Grid>
          </Grid>
          <Grid></Grid>
        </CharacterAttributesProvider>
      )}
    </>
  );
}
