import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import CreateCombatView from "./CreateCombatView";
export default {
  title: "CombatTrackerPage/Organisms/CreateCombatView",
  component: CreateCombatView,
} as Meta;
export const Main: Story = () => <CreateCombatView />;


