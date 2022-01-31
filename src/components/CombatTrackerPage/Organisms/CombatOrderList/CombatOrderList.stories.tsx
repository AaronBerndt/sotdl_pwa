import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import CombatOrderList from "./CombatOrderList";
export default {
  title: "CombatTrackerPage/Organisms/CombatOrderList",
  component: CombatOrderList,
} as Meta;
export const Main: Story = () => <CombatOrderList combatId="1" />;


