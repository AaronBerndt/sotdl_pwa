import { List } from "@material-ui/core";
import React from "react";
import CombatantListItem from "../../Atoms/CombatantListItem/CombatantListItem";
import { Combatant } from "../../CombatTrackerPageTypes";
import { useCombat } from "../../hooks/useCombats";
export type Props = {
  combatId: string;
};
export default function CombatOrderList({ combatId }: Props) {
  const { data: combat, isLoading } = useCombat(combatId);
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <List>
      {combat?.combatants.map((combatant: Combatant) => (
        <CombatantListItem combatant={combatant} />
      ))}
    </List>
  );
}

