import { Button } from "@material-ui/core";
import React from "react";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import useUpdateTurnType from "../../hooks/useUpdateTurnType";
export default function TurnTypeButton() {
  const { turnType, activeCombat } = useCharacterAttributes();
  const { mutate: updateTurnType } = useUpdateTurnType();

  return (
    <>
      {activeCombat !== "" ? (
        <Button onClick={() => updateTurnType()}>{turnType}</Button>
      ) : null}
    </>
  );
}
