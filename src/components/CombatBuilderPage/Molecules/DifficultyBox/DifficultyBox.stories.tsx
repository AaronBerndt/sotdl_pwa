import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import DifficultyBox from "./DifficultyBox";
import {Goblin} from "../../../CombatTrackerPage/CombatTrackerPageMocks";
export default {
  title: "CombatBuilderPage/Molecules/DifficultyBox",
  component: DifficultyBox,
} as Meta;
export const Main: Story = () => (
  <DifficultyBox
    monstersInCombat={[{ ...Goblin, amount: 1 }]}
    setMonstersInCombat={Function}
  />
);


