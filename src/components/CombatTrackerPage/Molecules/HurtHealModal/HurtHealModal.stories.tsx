import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import HurtHealModal from "./HurtHealModal";
export default {
  title: "CombatTrackerPage/Molecules/HurtHealModal",
  component: HurtHealModal,
} as Meta;
export const Main: Story = () => <HurtHealModal sample="test" />;
