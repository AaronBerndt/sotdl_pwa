import {
  Toolbar,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  List,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import useToggle from "../../../hooks/useToggle";
import AfflictionListItem from "../../Atoms/AfflictionListItem/AfflictionListItem";
import { Affliction } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import afflictionsList from "./AfflictionsList";

export default function AfflictionsModal() {
  const { open, toggleOpen } = useToggle();

  const { afflictions } = useCharacterAttributes();

  return (
    <>
      <Dialog open={open} fullScreen>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => toggleOpen()}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <DialogTitle>Afflictions</DialogTitle>
        </Toolbar>
        <List>
          {afflictionsList.map((affliction: Affliction, i) => (
            <AfflictionListItem
              affliction={affliction}
              afflictions={afflictions}
              key={i}
            />
          ))}
        </List>
      </Dialog>
      <Button onClick={() => toggleOpen()}>Afflictions</Button>
    </>
  );
}
