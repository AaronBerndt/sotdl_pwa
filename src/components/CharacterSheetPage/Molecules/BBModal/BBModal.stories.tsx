import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import BBModal from "./BBModal";
export default {
  title: "CharacterSheetPage/Molecules/BBModal",
  component: BBModal,
} as Meta;
export const Main: Story = () => (
  <BBModal rollType="Challenge" rollReason="Strength" modifier={10} />
);
