import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AddDamageModal from "./AddDamageModal";
export default {
  title: "CharacterSheetPage/Molecules/AddDamageModal",
  component: AddDamageModal,
} as Meta;
export const Main: Story = () => (
  <AddDamageModal
    open={true}
    rollReason="Test"
    damage={"1d6"}
    toggleOpen={Function}
  />
);

