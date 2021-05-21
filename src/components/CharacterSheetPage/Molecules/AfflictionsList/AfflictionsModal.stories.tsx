import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AfflictionsModal from "./AfflictionModal";
export default {
  title: "CharacterSheetPage/Molecules/AfflictionsList",
  component: AfflictionsList,
} as Meta;
export const Main: Story = () => <AfflictionsModal />;
