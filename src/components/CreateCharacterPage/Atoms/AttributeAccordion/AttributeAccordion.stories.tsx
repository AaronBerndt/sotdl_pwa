import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AttributeAccordion from "./AttributeAccordion";
import { pathsList } from "../../CreateCharacterPageMocks";
export default {
  title: "CreateCharacterPage/Atoms/AttributeAccordion",
  component: AttributeAccordion,
} as Meta;
export const OneChoice: Story = () => (
  <AttributeAccordion
    talent={{
      name: "Attributes Increase",
      description: "Increase two by 1",
      level: 1,
    }}
  />
);

export const ThreeChoices: Story = () => (
  <AttributeAccordion
    talent={{
      name: "Attributes Increase",
      description: "Increase three by 1",
      level: 8,
    }}
  />
);


