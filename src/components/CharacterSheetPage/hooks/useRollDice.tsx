import { useSnackbar } from "notistack";
import React from "react";
import { sumArray } from "../../../utils/arrayUtils";
import { DiceRoll } from "../CharacterSheetPageTypes";
import { useDiceRollerContext } from "../context/DiceRollerContext";
import { useCharacter } from "./useCharacters";

export default function useRollDice() {
  const { updateDiceResult } = useDiceRollerContext();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const rollDice = (sides: number) => {
    const result = Math.floor(Math.random() * sides) + 1;
    return result;
  };

  const rollD20 = () => rollDice(20);
  const rollD6 = () => rollDice(6);
  const rollD3 = () => rollDice(3);

  const rollMutipleDice = (type: string, amount: number) => {
    const diceResultList = Array(amount).map(() =>
      type === "d6" ? rollD6() : rollD3()
    );

    return {
      diceTotal: sumArray(diceResultList),
      diceResultList,
    };
  };

  const rollChallengeRoll = (
    modifier: number,
    rollReason: string,
    baneAmount: number,
    boonAmount: number
  ) => {
    const d20RollResult = rollD20();
    const bbResult =
      (baneAmount | boonAmount) !== 0
        ? rollMutipleDice(
            "d6",
            baneAmount >= boonAmount ? baneAmount : boonAmount
          )
        : { diceTotal: 0, diceResultList: [] };

    const formula = `${d20RollResult} ${
      baneAmount !== 0
        ? ` - ${bbResult}`
        : boonAmount !== 0
        ? ` + ${bbResult}`
        : ""
    } + ${modifier}`;
    const total = d20RollResult + modifier + bbResult.diceTotal;

    enqueueSnackbar(`${rollReason}:Challenge ${formula} = ${total}`);
  };

  const rollAttackRoll = (reason: string, damage: string) => {
    const diceResult = rollD6();
  };

  const rollFateRoll = () => {
    const diceResult = rollD6();
  };

  return {
    rollChallengeRoll,
    rollAttackRoll,
    rollFateRoll,
  };
}
