import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import ChoiceView from "./ChoiceView";
export default {
  title: "CreateCharacterPage/Organisms/ChoiceView",
  component: ChoiceView,
} as Meta;
export const Main: Story = () => <ChoiceView />;
