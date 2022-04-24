import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
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

const StyledText: any = styled.p`
  color: ${(prop) => prop.color};
`;
export default function CombatantListItem({ combatant }: Props) {
  const [checked, setChecked] = useState(false);
  const toggleEvent = useToggle();

  return (
    <>
      <ListItem button onClick={() => toggleEvent.toggleOpen()}>
        <ListItemIcon>
          <TurnTypeCounter currentTurnType={combatant.turnType} />
        </ListItemIcon>
        <ListItemText
          primary={combatant.name}
          secondary={
            <StyledText color={createTextColor(combatant)}>
              {combatant.currentHealth}/{combatant.health}
            </StyledText>
          }
        />
        <ListItemSecondaryAction>
          <Checkbox
            checked={checked}
            onClick={() => setChecked((prev) => !prev)}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <HurtHealModal toggleEvent={toggleEvent} combatant={combatant} />
    </>
  );
}
