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
  total: 16,
  withBane,
  withBoon,
});

const createAttackRollObject = (withBoon: boolean, withBane: boolean) => ({
  rollReason: "Longsword",
  rollType: "Attack",
  formula: "15 + 1",
  total: 16,
  withBane,
  withBoon,
});

const createDamageRollObject = () => ({
  rollReason: "Longsword",
  rollType: "Damage",
  formula: "15 + 1",
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
export const Attack = () => (
  <SnackbarContent message={createAttackRollObject(false, false)} />
);

export const Damage = () => (
  <SnackbarContent message={createDamageRollObject()} />
);
