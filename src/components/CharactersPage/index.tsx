import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { find } from "lodash";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Character } from "../CharacterSheetPage/CharacterSheetPageTypes";
import useCharacters from "../CharacterSheetPage/hooks/useCharacters";
import useDeleteCharacter from "./hooks/useDeleteCharacter";

export default function CharactersPage() {
  const { data: characters, isLoading } = useCharacters();
  const { mutate: deleteCharacter } = useDeleteCharacter();
  const navigate = useNavigate();

  return (
    <Grid container alignContent="center">
      <Grid item xs={12}>
        <Button
          onClick={() => {
            navigate(`/create_character/`);
          }}
          fullWidth
        >
          Create New Character
        </Button>
        <Button
          onClick={() => {
            navigate(`/content_adder/`);
          }}
          fullWidth
        >
          Add/Edit Content
        </Button>
        <Button
          onClick={() => {
            navigate(`/compendium/`);
          }}
          fullWidth
        >
          Compendium
        </Button>
        <Button
          onClick={() => {
            navigate(`/manage_parties/`);
          }}
          fullWidth
        >
          Manage Parties
        </Button>
        <Button
          onClick={() => {
            navigate(`/combat_builder/`);
          }}
          fullWidth
        >
          Combat Builder
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
                  navigate(`/characters/${character._id}`);
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
                    onClick={() => navigate(`/edit_character/${character._id}`)}
                  >
                    <Edit />
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
