import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import FullRestModal from "./FullRestModal";
export default {
  title: "CharacterSheetPage/Organisms/FullRestModal",
  component: FullRestModal,
} as Meta;
export const Main: Story = () => <FullRestModal />;
