import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import TalentsView from "./TalentsView";
export default {
  title: "CharacterSheetPage/Organisms/TalentsView",
  component: TalentsView,
} as Meta;
export const Main: Story = () => <TalentsView />;


