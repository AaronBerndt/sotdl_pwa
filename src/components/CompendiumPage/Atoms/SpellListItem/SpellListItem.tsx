import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { Spell } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
export type Props = {
  spell: Spell;
};
export default function SpellListItem({ spell }: Props) {
  return (
    <ListItem>
      <ListItemText primary={spell.name} />
    </ListItem>
  );
}
