import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import ChoiceAccordion from "./ChoiceAccordion";
import { pathsList } from "../../CreateCharacterPageMocks";
export default {
  title: "CreateCharacterPage/Atoms/ChoiceAccordion",
  component: ChoiceAccordion,
} as Meta;

export const Main: Story = () => (
  <ChoiceAccordion talent={pathsList[2].talents[3]} choicesRemains={false} />
);

