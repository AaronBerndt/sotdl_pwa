import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { find } from "lodash";
import React from "react";
import { useHistory } from "react-router-dom";
import { Character } from "../CharacterSheetPage/CharacterSheetPageTypes";
import useCharacters from "../CharacterSheetPage/hooks/useCharacters";
import useDeleteCharacter from "./hooks/useDeleteCharacter";

export default function CharactersPage() {
  const { data: characters, isLoading } = useCharacters();
  const { mutate: deleteCharacter } = useDeleteCharacter();
  const history = useHistory();

  return (
    <Grid container alignContent="center">
      <Grid item xs={12}>
        <Button
          onClick={() => {
            history.push(`/create_character/`);
          }}
          fullWidth
        >
          Create New Character
        </Button>
        <Button
          onClick={() => {
            history.push(`/content_adder/`);
          }}
          fullWidth
        >
          Add/Edit Content
        </Button>
        <Button
          onClick={() => {
            history.push(`/compendium/`);
          }}
          fullWidth
        >
          Compendium
        </Button>
      </Grid>

      {isLoading === true && characters === undefined ? (
        <p>...Loading</p>
      ) : (
        <Grid item xs={12} alignContent="center" style={{ paddingTop: "50px" }}>
          <List>
            {characters.map((character: Character, i: number) => (
              <ListItem
                button
                key={i}
                onClick={() => {
                  console.log(character._id);
                  history.push(`/characters/${character._id}`);
                }}
              >
                <ListItemText
                  primary={character.name}
                  secondary={`${character.ancestry} ${
                    find(character.choices, {
                      name: "Past Life",
                    })
                      ? find(character.choices, { name: "Past Life" })?.value
                      : ""
                  } ${
                    character.masterPath
                      ? character.masterPath
                      : character.expertPath
                      ? character.expertPath
                      : character.novicePath
                      ? character.novicePath
                      : ""
                  } ${character.level}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() =>
                      history.push(`/edit_character/${character._id}`)
                    }
                  >
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => deleteCharacter(character)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      )}
    </Grid>
  );
}
