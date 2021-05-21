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
  total: withBoon ? 18 : withBane ? 14 : 16,
  bbResult: 2,
  baneOrBoon: withBoon ? "boon" : withBane ? "bane" : "",
});

const createDamageRollObject = () => ({
  rollReason: "Longsword",
  rollType: "Damage",
  formula: "5 + 5 + 5 + 1",
  total: 16,
});

const createFateRollObject = () => ({
  rollReason: "",
  rollType: "Fate",
  formula: "15 + 1",
  total: 16,
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
export const Damage = () => (
  <SnackbarContent message={createDamageRollObject()} />
);
