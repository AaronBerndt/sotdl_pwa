import { useSnackbar } from "notistack";
import { sumArray } from "../../../utils/arrayUtils";
import useUpdateHealth from "./useUpdateHealth";
import useUpdateAfflications from "./useUpdateAfflictions";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";
import { CurrentAffliction } from "../CharacterSheetPageTypes";

type MutipleRollResult = {
  diceTotal: number;
  diceResultList: number[];
  max: number;
};

export default function useRollDice() {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: updateAfflications } = useUpdateAfflications();
  const { mutate: updateHealth } = useUpdateHealth();
  const { afflictions } = useCharacterAttributes();

  const rollDice = (sides: number) => {
    const result = Math.floor(Math.random() * sides) + 1;
    return result;
  };

  const rollD20 = () => rollDice(20);
  const rollD6 = () => rollDice(6);
  const rollD3 = () => rollDice(3);

  const rollMutipleDice = (type: string, amount: number) => {
    console.log(amount);
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

    const baneOrBoon = baneAmount ? (baneAmount === 0 ? "" : "bane") : "boon";

    const bbResult: MutipleRollResult = [boonAmount, baneAmount].some(
      (amount) => amount !== 0
    )
      ? rollMutipleDice(
          "d6",
          baneAmount >= boonAmount ? baneAmount : boonAmount
        )
      : { diceTotal: 0, diceResultList: [], max: 0 };

    const formula = `${d20RollResult} ${
      Math.sign(modifier) === 1 || modifier === 0 ? `+${modifier}` : modifier
    }`;

    const total =
      d20RollResult +
      modifier +
      (baneAmount !== 0 ? -bbResult.max : bbResult.max);

    enqueueSnackbar({
      rollReason,
      rollType,
      formula,
      total,
      bbResult: bbResult.max,
      baneOrBoon,
    });
  };
  const rollAttackRoll = (
    modifier: number,
    rollReason: string,
    totalBB: number
  ) => {
    const d20RollResult = rollD20();
    const isNegative = Math.sign(totalBB) === -1;
    const bbResult: MutipleRollResult = [Math.abs(totalBB)].some(
      (amount) => amount !== 0
    )
      ? rollMutipleDice("d6", Math.abs(totalBB))
      : { diceTotal: 0, diceResultList: [], max: 0 };

    const formula = `${d20RollResult} ${
      Math.sign(modifier) === 1 || modifier === 0 ? `+${modifier}` : modifier
    }`;

    const total =
      d20RollResult + modifier + (isNegative ? -bbResult.max : bbResult.max);

    enqueueSnackbar({
      rollReason,
      rollType: "Attack",
      formula,
      total,
      bbResult: bbResult.max,
      totalBB,
    });
  };

  const rollDamageRoll = (
    rollReason: string,
    damage: string,
    extraDice: number,
    extraDamage: number
  ) => {
    const regex = /(-?\d+)/g;
    const result = damage.match(regex);

    const diceAmount = result![0];
    const diceType = result![1];
    const extraWeaponDamage = result![2];

    const diceResult = rollMutipleDice(
      `d${diceType}`,
      parseInt(diceAmount) + extraDice
    );

    const formula = `${diceResult.diceResultList.join("+")} ${
      extraDamage || extraWeaponDamage
        ? `+ ${
            extraDamage + (extraWeaponDamage ? parseInt(extraWeaponDamage) : 0)
          }`
        : ""
    }`;
    const total =
      diceResult.diceTotal +
      (extraWeaponDamage ? parseInt(extraWeaponDamage) : 0) +
      +(extraDamage ? extraDamage : 0);

    enqueueSnackbar({ rollReason, rollType: "Damage", formula, total });
  };

  const rollFateRoll = () => {
    const diceResult = rollD6();

    const isDying = afflictions
      .map(({ name }: CurrentAffliction) => name)
      .includes("Dying");

    let whatHappens = "Nothing";

    if (diceResult === 1) {
      if (!isDying) {
        updateAfflications({ afflictionName: "Dying", action: "add" });
        updateAfflications({ afflictionName: "Unconscious", action: "add" });
        updateAfflications({
          afflictionName: "Fate Success",
          action: "remove",
        });
        whatHappens = "You've started Dying";
      } else {
        updateAfflications({ afflictionName: "Dying", action: "remove" });
        updateAfflications({ afflictionName: "Unconscious", action: "remove" });

        updateAfflications({
          afflictionName: "Fate Success",
          action: "remove",
        });
        updateAfflications({ afflictionName: "Dead", action: "add" });
        whatHappens = "You've Died";
      }
    }

    if (diceResult === 6) {
      if (isDying) {
        updateAfflications({ afflictionName: "Disabled", action: "add" });
        updateAfflications({ afflictionName: "Dying", action: "remove" });
        updateAfflications({ afflictionName: "Unconscious", action: "remove" });

        whatHappens = "You're Disabled and not Dying";
      } else {
        updateAfflications({
          afflictionName: "Fate Success",
          action: "remove",
        });
        updateHealth({ healthChangeAmount: -1 });

        whatHappens = "You've Rallied!";
      }
    }

    if (diceResult !== 1 && diceResult !== 6) {
      if (!isDying) {
        if (
          afflictions.filter(
            ({ name }: CurrentAffliction) => name === "Fate Success"
          ).length !== 2
        ) {
          updateAfflications({ afflictionName: "Fate Success", action: "add" });
          whatHappens = "You're condition is improving";
        } else {
          updateAfflications({
            afflictionName: "Fate Success",
            action: "remove",
          });
          updateAfflications({ afflictionName: "Unconscious", action: "add" });
          updateHealth({ healthChangeAmount: -1 });
          whatHappens = "You're Stabilized and are Unconscious";
        }
      }
    }

    enqueueSnackbar({
      rollType: "Fate",
      whatHappens,
      total: diceResult,
    });
  };

  return {
    rollChallengeRoll,
    rollDamageRoll,
    rollFateRoll,
    rollAttackRoll,
  };
}


