import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import TargetModal from "./TargetModal";
export default {
  title: "CharacterSheetPage/Molecules/TargetModal",
  component: TargetModal,
} as Meta;
export const Main: Story = () => (
  <TargetModal open={true} toggleOpen={Function} actionFunction={Function} />
);
