import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import TurnTypeCounter from "./TurnTypeCounter";
export default {
  title: "CombatTrackerPage/Atoms/TurnTypeCounter",
  component: TurnTypeCounter,
} as Meta;
export const Fast: Story = () => (
  <TurnTypeCounter currentTurnType="Player Fast" />
);
export const Slow: Story = () => (
  <TurnTypeCounter currentTurnType="Player Slow" />
);
export const MonsterFast: Story = () => (
  <TurnTypeCounter currentTurnType="Monster Fast" />
);
export const MonsterSlow: Story = () => (
  <TurnTypeCounter currentTurnType="Monster Slow" />
);

export const Acted: Story = () => <TurnTypeCounter currentTurnType="Acted" />;
