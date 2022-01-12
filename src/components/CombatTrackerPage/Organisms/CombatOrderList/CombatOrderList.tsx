import { List } from "@material-ui/core";
import { filter } from "lodash";
import React from "react";
import CombatantListItem from "../../Atoms/CombatantListItem/CombatantListItem";
import { Combatant } from "../../CombatTrackerPageTypes";
import { useCombat } from "../../hooks/useCombats";
export type Props = {
  combatId: string;
};
export default function CombatOrderList({ combatId }: Props) {
  const { data: combat, isLoading } = useCombat(combatId);
  console.log(combat);
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <List>
      {filter(combat?.combatants, { turnType: "Fast" }).map(
        (combatant: Combatant) => (
          <CombatantListItem combatant={combatant} />
        )
      )}
      {filter(combat?.combatants, { turnType: "Monster Fast" }).map(
        (combatant: Combatant) => (
          <CombatantListItem combatant={combatant} />
        )
      )}
      {filter(combat?.combatants, { turnType: "Slow" }).map(
        (combatant: Combatant) => (
          <CombatantListItem combatant={combatant} />
        )
      )}
      {filter(combat?.combatants, { turnType: "Monster Slow" }).map(
        (combatant: Combatant) => (
          <CombatantListItem combatant={combatant} />
        )
      )}
    </List>
  );
}
