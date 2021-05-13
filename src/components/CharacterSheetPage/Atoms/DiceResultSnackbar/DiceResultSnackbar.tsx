import { Snackbar } from "@material-ui/core";
import React from "react";
import { useDiceRollerContext } from "../../context/DiceRollerContext";

export default function DiceResultSnackbar() {
  const { diceRollResult } = useDiceRollerContext();

  const colorObject = {
    attack: "#1b9af0",
    damage: "#d54f4f",
    challenge: "#8359ee",
  };

  return (
    <>
      {diceRollResult !== null && (
        <Snackbar
          open={diceRollResult !== null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          autoHideDuration={6000}
          message={`${diceRollResult.reason}: ${diceRollResult.result}`}
        />
      )}
    </>
  );
}
