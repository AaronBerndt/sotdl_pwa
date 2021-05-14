import {
  Button,
  Dialog,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { filterAndSum } from "../../../../utils/arrayUtils";
import useToggle from "../../../hooks/useToggle";
import { Affliction } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import useUpdateAfflications from "../../hooks/useUpdateAfflictions";
import { afflictionsList } from "./AfflictionsList";
export default function AfflictionsModal() {
  const { open, toggleOpen } = useToggle();

  const { afflictions } = useCharacterAttributes();

  const { mutate: updateAfflications } = useUpdateAfflications();

  const onAddButtonClick = (afflictionName: string) =>
    updateAfflications({ afflictionName, action: "add" });

  const onRemoveButtonClick = (afflictionName: string) =>
    updateAfflications({ afflictionName, action: "remove" });

  return (
    <>
      <Dialog open={open} fullScreen>
        <List>
          {afflictionsList.map((affliction: Affliction, i) => (
            <ListItem key={i}>
              <ListItemIcon>
                {filterAndSum(afflictions, affliction.name, "name")}
              </ListItemIcon>
              <ListItemText primary={affliction.name} />
              <ListItemSecondaryAction>
                <Button onClick={() => onAddButtonClick(affliction.name)}>
                  Add
                </Button>
                <Button onClick={() => onRemoveButtonClick(affliction.name)}>
                  Remove
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Dialog>
      <Button onClick={() => toggleOpen()}>Afflictions</Button>
    </>
  );
}
