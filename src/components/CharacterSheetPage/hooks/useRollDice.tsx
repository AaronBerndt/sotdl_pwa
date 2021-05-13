import React from "react";
import { sumArray } from "../../../utils/arrayUtils";
import { DiceRoll } from "../CharacterSheetPageTypes";
import { useDiceRollerContext } from "../context/DiceRollerContext";

export default function useRollDice() {
  const { updateDiceResult } = useDiceRollerContext();

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
    rollReason: string,
    baneAmount: number,
    boonAmount: number
  ) => {
    const d20RollResult = rollD20();
    const bbResult = rollMutipleDice(
      "d6",
      baneAmount >= boonAmount ? baneAmount : boonAmount
    );

    const diceResult: DiceRoll = {
      reason: rollReason,
      type: "Challenge",
      result: d20RollResult + bbResult.diceTotal,
      withBoon: boonAmount !== 0,
      witthBane: baneAmount !== 0,
    };

    updateDiceResult(diceResult);
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
