import { useAuth0 } from "@auth0/auth0-react";
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
import { useNavigate } from "react-router-dom";
import { Character } from "../CharacterSheetPage/CharacterSheetPageTypes";
import { usePlayerCharacters } from "../CharacterSheetPage/hooks/useCharacters";
import useDeleteCharacter from "./hooks/useDeleteCharacter";
import BottomNav from "./Organisms/BottomNav/BottomNav";

export default function CharactersPage() {
  const { user } = useAuth0();

  return (
    <>
      {user ? (
        <CharactersPageContent playerId={user.sub ? user.sub : ""} />
      ) : (
        <p>Is Loading</p>
      )}
    </>
  );
}

type Props = {
  playerId: string;
};

function CharactersPageContent({ playerId }: Props) {
  const { data: characters, isLoading } = usePlayerCharacters(playerId);
  const { mutate: deleteCharacter } = useDeleteCharacter(playerId);
  const navigate = useNavigate();

  return (
    <Grid container alignContent="center">
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
                  <IconButton onClick={() => deleteCharacter(character)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      )}
      <BottomNav
        components={
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              navigate(`/create_character/`);
            }}
            fullWidth
          >
            Create New Character
          </Button>
        }
      />
    </Grid>
  );
}
