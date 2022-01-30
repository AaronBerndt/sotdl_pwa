import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import MagicView from "./MagicView";
export default {
  title: "CharacterSheetPage/Organisms/MagicView",
  component: MagicView,
} as Meta;
export const Main: Story = () => <MagicView />;

