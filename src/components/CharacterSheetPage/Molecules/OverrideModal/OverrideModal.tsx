import {
  Dialog,
  Toolbar,
  IconButton,
  DialogTitle,
  List,
  Button,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import useToggle from "../../../hooks/useToggle";
import { Override } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import useDeleteOverride from "../../hooks/useDeleteOverride";
export default function OverrideModal() {
  const { open, toggleOpen } = useToggle();

  const { overrides } = useCharacterAttributes();

  const { mutate: deleteOveride } = useDeleteOverride();

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
          <DialogTitle>Temporary Values</DialogTitle>
        </Toolbar>
        <List>
          {overrides.map((override: Override, i) => (
            <ListItem key={i}>
              <ListItemText primary={`${override.name}: ${override.value}`} />
              <ListItemSecondaryAction>
                <Button
                  onClick={() => deleteOveride({ overrideToDelete: override })}
                >
                  X
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Dialog>
      <Button onClick={() => toggleOpen()}>Temporary Values</Button>
    </>
  );
}
