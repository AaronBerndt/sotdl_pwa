import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import MonsterList from "./MonsterList";
export default {
  title: "CombatBuilderPage/Molecules/MonsterList",
  component: MonsterList,
} as Meta;
export const Main: Story = () => (
  <MonsterList addMonsterButtonClick={Function} />
);
