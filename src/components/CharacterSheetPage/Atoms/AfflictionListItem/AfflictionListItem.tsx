import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Collapse,
  List,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React from "react";
import useToggle from "../../../hooks/useToggle";
import { Affliction, CurrentAfflictions } from "../../CharacterSheetPageTypes";
import useUpdateAfflications from "../../hooks/useUpdateAfflictions";
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
          <Button onClick={() => onAddButtonClick(affliction.name)}>+</Button>
          <Button onClick={() => onRemoveButtonClick(affliction.name)}>
            -
          </Button>
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
