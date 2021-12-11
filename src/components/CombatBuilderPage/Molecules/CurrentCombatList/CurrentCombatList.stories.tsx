import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import CurrentCombatList from "./CurrentCombatList";
export default {
  title: "CombatBuilderPage/Molecules/CurrentCombatList",
  component: CurrentCombatList,
} as Meta;
export const Main: Story = () => (
  <CurrentCombatList
    monstersInCombat={["Goblin"]}
    setMonstersInCombat={Function}
  />
);
