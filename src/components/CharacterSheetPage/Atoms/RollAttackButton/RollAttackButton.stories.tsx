import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import RollAttackButton from "./RollAttackButton";
export default {
  title: "CharacterSheetPage/Atoms/RollAttackButton",
  component: RollAttackButton,
} as Meta;
export const Main: Story = () => (
  <RollAttackButton
    rollReason="Test"
    attackRoll="+1"
    totalBB=""
    attributeTarget="Defense"
  />
);

