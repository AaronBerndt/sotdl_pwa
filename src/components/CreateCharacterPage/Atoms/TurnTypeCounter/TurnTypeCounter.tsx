import { Avatar } from "@mui/material";
import React from "react";

export type Props = {
  currentTurnType: any;
};
export default function TurnTypeCounter({ currentTurnType }: Props) {
  const turnTypeTextObject: any = {
    "Player Fast": "PF",
    "Player Slow": "PS",
    "Monster Fast": "MF",
    "Monster Slow": "MS",
  };
  return <Avatar>{turnTypeTextObject[currentTurnType]}</Avatar>;
}


