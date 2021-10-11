import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Level4ChoiceAccordion from "./Level4ChoiceAccordion";
export default {
  title: "CreateCharacterPage/Atoms/Level4ChoiceAccordion",
  component: Level4ChoiceAccordion,
} as Meta;
export const Main: Story = () => <Level4ChoiceAccordion choiceList={[]} />;
