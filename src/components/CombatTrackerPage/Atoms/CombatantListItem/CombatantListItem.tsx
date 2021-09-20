import { ListItem } from "@material-ui/core";
import React from "react";
import { Combatant } from "../../CombatTrackerPageTypes";
export type Props = {
  combatant: Combatant;
};
export default function CombatantListItem({ combatant }: Props) {
  return <ListItem></ListItem>;
}
