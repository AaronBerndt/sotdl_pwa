import { useSnackbar } from "notistack";
import { sumArray } from "../../../utils/arrayUtils";

type MutipleRollResult = {
  diceTotal: number;
  diceResultList: number[];
  max: number;
};

export default function useRollDice() {
  const { enqueueSnackbar } = useSnackbar();

  const rollDice = (sides: number) => {
    const result = Math.floor(Math.random() * sides) + 1;
    return result;
  };

  const rollD20 = () => rollDice(20);
  const rollD6 = () => rollDice(6);
  const rollD3 = () => rollDice(3);

  const rollMutipleDice = (type: string, amount: number) => {
    const diceResultList = [...Array(amount).keys()].map(() =>
      type === "d6" ? rollD6() : rollD3()
    );

    return {
      diceTotal: sumArray(diceResultList),
      diceResultList,
      max: Math.max(...diceResultList),
    };
  };

  const rollChallengeRoll = (
    modifier: number,
    rollReason: string,
    rollType: "Challenge" | "Attack",
    baneAmount: number,
    boonAmount: number
  ) => {
    const d20RollResult = rollD20();
    const bbResult: MutipleRollResult = [boonAmount, baneAmount].some(
      (amount) => amount !== 0
    )
      ? rollMutipleDice(
          "d6",
          baneAmount >= boonAmount ? baneAmount : boonAmount
        )
      : { diceTotal: 0, diceResultList: [], max: 0 };

    const formula = `${d20RollResult} ${
      baneAmount !== 0
        ? ` - ${bbResult.max}`
        : boonAmount !== 0
        ? ` + ${bbResult.max}`
        : ""
    } + ${modifier}`;

    const total =
      d20RollResult +
      modifier +
      (baneAmount !== 0 ? -bbResult.max : bbResult.max);

    enqueueSnackbar(`${rollReason}:${rollType} ${formula} = ${total}`);
  };

  const rollAttackRoll = () => {
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
