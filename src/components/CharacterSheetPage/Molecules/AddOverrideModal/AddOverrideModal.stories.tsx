import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AddOverrideModal from "./AddOverrideModal";
export default {
  title: "CharacterSheetPage/Molecules/AddOverrideModal",
  component: AddOverrideModal,
} as Meta;
export const Main: Story = () => <AddOverrideModal sample="test" />;

