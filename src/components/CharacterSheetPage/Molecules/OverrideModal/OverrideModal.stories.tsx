import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import OverrideModal from "./OverrideModal";
export default {
  title: "CharacterSheetPage/Molecules/OverrideModal",
  component: OverrideModal,
} as Meta;
export const Main: Story = () => <OverrideModal />;
