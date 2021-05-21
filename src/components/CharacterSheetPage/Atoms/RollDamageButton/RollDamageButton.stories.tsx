import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import RollDamageButton from "./RollDamageButton";
export default {
  title: "CharacterSheetPage/Atoms/RollDamageButton",
  component: RollDamageButton,
} as Meta;
export const Main: Story = () => (
  <RollDamageButton rollReason="Stuff" damage="1d6" />
);
