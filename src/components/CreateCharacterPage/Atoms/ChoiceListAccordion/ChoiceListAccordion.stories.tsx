import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import ChoiceListAccordion from "./ChoiceListAccordion";
export default {
  title: "CreateCharacterPage/Atoms/ChoiceListAccordion",
  component: ChoiceListAccordion,
} as Meta;
export const Main: Story = () => <ChoiceListAccordion choiceList={[]} />;

