import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Collapse,
  List,
  IconButton,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React from "react";
import useToggle from "../../../hooks/useToggle";
import { Affliction, CurrentAfflictions } from "../../CharacterSheetPageTypes";
import useUpdateAfflications from "../../hooks/useUpdateAfflictions";
import { Add, Remove } from "@material-ui/icons/";

export type Props = {
  afflictions: CurrentAfflictions;
  affliction: Affliction;
};
export default function AfflictionListItem({ affliction, afflictions }: Props) {
  const { open, toggleOpen } = useToggle();
  const { mutate: updateAfflications } = useUpdateAfflications();

  const onAddButtonClick = (afflictionName: string) =>
    updateAfflications({ afflictionName, action: "add" });

  const onRemoveButtonClick = (afflictionName: string) =>
    updateAfflications({ afflictionName, action: "remove" });

  const afflictionCount = afflictions.filter(
    ({ name }) => name === affliction.name
  ).length;

  return (
    <>
      <ListItem button onClick={() => toggleOpen()}>
        <ListItemIcon>{afflictionCount}</ListItemIcon>
        <ListItemText primary={affliction.name} />
        <ListItemSecondaryAction>
          <IconButton onClick={() => onAddButtonClick(affliction.name)}>
            <Add />
          </IconButton>
          <IconButton onClick={() => onRemoveButtonClick(affliction.name)}>
            <Remove />
          </IconButton>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button>
            <ListItemText primary={affliction.description} />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}
