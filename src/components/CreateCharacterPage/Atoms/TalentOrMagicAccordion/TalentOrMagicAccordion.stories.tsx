import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import TalentOrMagicAccordion from "./TalentOrMagicAccordion";
import { ancestryList } from "../../CreateCharacterPageMocks";
export default {
  title: "CreateCharacterPage/Atoms/TalentOrMagicAccordion",
  component: TalentOrMagicAccordion,
} as Meta;
export const Main: Story = () => (
  <TalentOrMagicAccordion talent={ancestryList[1].talents[3]} />
);

