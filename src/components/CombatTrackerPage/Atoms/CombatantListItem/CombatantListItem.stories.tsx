import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import CombatantListItem from "./CombatantListItem";
import { combatants } from "../../CombatTrackerPageMocks";
export default {
  title: "CombatTrackerPage/Atoms/CombatantListItem",
  component: CombatantListItem,
} as Meta;
export const Player: Story = () => (
  <CombatantListItem combatant={combatants[0]} />
);

export const Monster: Story = () => (
  <CombatantListItem combatant={combatants[2]} />
);

