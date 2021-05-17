import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import ActionList from "./ActionList";
export default {
  title: "CharacterSheetPage/Molecules/ActionList",
  component: ActionList,
} as Meta;
export const Main: Story = () => <ActionList sample="test" />;
