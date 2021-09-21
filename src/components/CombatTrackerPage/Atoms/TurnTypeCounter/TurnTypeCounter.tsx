import { Avatar } from "@material-ui/core";
import React from "react";
import { TurnType } from "../../../CombatTrackerPage/CombatTrackerPageTypes";
export type Props = {
  currentTurnType: TurnType;
};
export default function TurnTypeCounter({ currentTurnType }: Props) {
  const turnTypeTextObject = {
    "Player Fast": "PF",
    "Player Slow": "PS",
    "Monster Fast": "MF",
    "Monster Slow": "MS",
  };
  return <Avatar>{turnTypeTextObject[currentTurnType]}</Avatar>;
}
