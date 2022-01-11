import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import React, { useState } from "react";
import useLongPress from "../../../hooks/useLongPress";
import useToggle from "../../../hooks/useToggle";
import { Combatant } from "../../CombatTrackerPageTypes";
import HurtHealModal from "../../Molecules/HurtHealModal/HurtHealModal";
import TurnTypeCounter from "../TurnTypeCounter/TurnTypeCounter";
export type Props = {
  combatant: Combatant;
};

const createTextColor = (combatant: Combatant) => {
  const remainingPercent = Math.round(
    (Number(combatant.currentHealth) / Number(combatant.health)) * 100
  );

  const color =
    remainingPercent > 80 ? "green" : remainingPercent > 50 ? "yellow" : "red";

  return color;
};

export default function CombatantListItem({ combatant }: Props) {
  const [checked, setChecked] = useState(false);
  const toggleEvent = useToggle();

  const longPressEvent = useLongPress(
    () => {},
    () => toggleEvent.toggleOpen(),
    {
      shouldPreventDefault: true,
      delay: 500,
    }
  );

  return (
    <>
      <ListItem button onClick={() => toggleEvent.toggleOpen()}>
        <ListItemIcon>
          <TurnTypeCounter currentTurnType={combatant.turnType} />
        </ListItemIcon>
        <ListItemText
          primary={combatant.name}
          secondary={
            <p style={{ color: createTextColor(combatant) }}>
              {combatant.currentHealth}/{combatant.health}
            </p>
          }
        />
        <ListItemSecondaryAction>
          <Checkbox checked={checked} />
        </ListItemSecondaryAction>
      </ListItem>
      <HurtHealModal toggleEvent={toggleEvent} combatant={combatant} />
    </>
  );
}
