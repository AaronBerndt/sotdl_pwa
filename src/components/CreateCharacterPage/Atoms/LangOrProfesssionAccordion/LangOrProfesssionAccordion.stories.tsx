import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import LangOrProfesssionAccordion from "./LangOrProfesssionAccordion";
import { pathsList } from "../../CreateCharacterPageMocks";
export default {
  title: "CreateCharacterPage/Atoms/LangOrProfesssionAccordion",
  component: LangOrProfesssionAccordion,
} as Meta;
export const Main: Story = () => (
  <LangOrProfesssionAccordion talent={pathsList[0].talents[1]} />
);
