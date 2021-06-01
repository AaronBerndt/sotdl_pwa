import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import MagicAccordion from "./MagicAccordion";
export default {
  title: "CreateCharacterPage/Atoms/MagicAccordion",
  component: MagicAccordion,
} as Meta;
export const Main: Story = () => <MagicAccordion sample="test" />;
