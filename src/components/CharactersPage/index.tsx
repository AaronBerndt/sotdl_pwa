import { Button, Grid, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { Character } from "../CharacterSheetPage/CharacterSheetPageTypes";
import useCharacters from "../CharacterSheetPage/hooks/useCharacters";

export default function CharactersPage() {
  const { data: characters, isLoading } = useCharacters();
  const history = useHistory();

  return (
    <Grid container>
      {isLoading === true && characters === undefined ? (
        <p>...Loading</p>
      ) : (
        <List>
          {characters.map((character: Character, i: number) => (
            <ListItem
              button
              key={i}
              onClick={() => {
                history.push(`/characters/${character.id}`);
              }}
            >
              <ListItemText
                primary={character.name}
                secondary={`${character.ancestry} ${
                  character.novicePath ? character.novicePath : ""
                } ${character.expertPath ? `.${character.expertPath}` : ""} ${
                  character.masterPath ? `.${character.masterPath}` : ""
                } ${character.level}`}
              />
            </ListItem>
          ))}
        </List>
      )}
      <Grid item xs={12}>
        <Button>Create New Character </Button>
      </Grid>
    </Grid>
  );
}
