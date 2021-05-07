import { Typography, Box, Button } from "@material-ui/core";
import React from "react";
import { Characteristics, CharacterState } from "../../CharacterSheetPageTypes";

type Props = {
  characteristics: Characteristics;
  characterState: CharacterState;
};

export default function CharacterNameTag({
  characteristics,
  characterState,
}: Props) {
  const maxHealth = 10;
  const currentHealth = maxHealth - characterState.currentDamage;

  return (
    <>
      <Button>{`${currentHealth}/${maxHealth}`}</Button>
    </>
  );
}
