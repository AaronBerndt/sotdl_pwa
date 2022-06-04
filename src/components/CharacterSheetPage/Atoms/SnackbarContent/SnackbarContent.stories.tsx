import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SnackbarContent from "./SnackbarContent";
export default {
  title: "CharacterSheetPage/Atoms/SnackbarContent",
  component: SnackbarContent,
} as Meta;

const createChallengeRollObject = (withBoon: boolean, withBane: boolean) => ({
  rollReason: "Will",
  rollType: "Challenge",
  formula: "15 + 1",
  total: withBoon ? 18 : withBane ? 14 : 16,
  bbResult: 2,
  baneOrBoon: withBoon ? "boon" : withBane ? "bane" : "",
});

const createAttackRollObject = (withBoon: boolean, withBane: boolean) => ({
  rollReason: "Longsword",
  rollType: "Attack",
  formula: "15 + 1",
  d20Result: 15,
  modifier: 1,
  total: withBoon ? 18 : withBane ? 14 : 16,
  bbResult: withBoon ? 2 : -2,
  targets: [
    { name: "Joe 1", attackResult: "Miss" },
    { name: "Joe 2", attackResult: "Hit" },
    { name: "Joe 3", attackResult: "Crit" },
  ],
  baneOrBoon: withBoon ? "boon" : withBane ? "bane" : "",
});

const createDamageRollObject = () => ({
  rollReason: "Longsword",
  rollType: "Damage",
  formula: "5 + 5 + 5 + 1",
  total: 16,
});

const createFateRollObject = () => ({
  rollType: "Fate",
  whatHappens: "You're Stabilized and are Unconscious",
  total: 5,
});

const createHealRoll = () => ({
  rollReason: "Spell Recovery",
  rollType: "Heal",
  total: 16,
});

const createHealedRoll = () => ({
  healer: "Tim",
  rollType: "Healed",
  healedAmount: 16,
});

const createDamagedRoll = () => ({
  attacker: "Tim",
  rollType: "Damaged",
  attackName: "Fire Ball",
  damageResult: 16,
});

const createAttacked = () => ({
  attacker: "Tim",
  rollType: "Attacked",
  attackName: "Sword",
  attackDiceResult: 16,
  attackResult: "Hit",
});

const createEffect = () => ({
  rollType: "Effected",
  temporaryEffectGiver: "Tim",
  temporaryEffectAdd: "Bless",
  duration: 10,
});

export const Challenge = () => (
  <SnackbarContent message={createChallengeRollObject(false, false)} />
);

export const ChallengeWithBoon = () => (
  <SnackbarContent message={createChallengeRollObject(true, false)} />
);

export const ChallengeWithBane = () => (
  <SnackbarContent message={createChallengeRollObject(false, true)} />
);
export const Attack = () => (
  <SnackbarContent message={createAttackRollObject(false, false)} />
);

export const AttackWithBane = () => (
  <SnackbarContent message={createAttackRollObject(false, true)} />
);
export const AttackWithBoon = () => (
  <SnackbarContent message={createAttackRollObject(true, false)} />
);

export const damage = () => (
  <SnackbarContent message={createDamageRollObject()} />
);
export const Heal = () => <SnackbarContent message={createHealRoll()} />;

export const Fate = () => <SnackbarContent message={createFateRollObject()} />;
export const damaged = () => <SnackbarContent message={createDamagedRoll()} />;
export const Healed = () => <SnackbarContent message={createHealedRoll()} />;
export const Attacked = () => <SnackbarContent message={createAttacked()} />;
export const Effected = () => <SnackbarContent message={createEffect()} />;
