import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import MagicAccordion from "./MagicAccordion";
import { pathsList } from "../../CreateCharacterPageMocks";
export default {
  title: "CreateCharacterPage/Atoms/MagicAccordion",
  component: MagicAccordion,
} as Meta;
export const Main: Story = () => (
  <MagicAccordion talent={pathsList[1].talents[1]} />
);

