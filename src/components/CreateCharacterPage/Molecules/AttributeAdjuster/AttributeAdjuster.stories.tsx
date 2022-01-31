import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AttributeAdjuster from "./AttributeAdjuster";
import { CharacterBuilderProvider } from "../../context/CharacterBuilderContext";
export default {
  title: "CreateCharacterPage/Molecules/AttributeAdjuster",
  component: AttributeAdjuster,
} as Meta;
export const Main: Story = () => (
  <CharacterBuilderProvider
    values={{
      level: 1,
      novicePath: "Warrior",
      ancestry: "Human",
    }}
  >
    <AttributeAdjuster label="Strength" />
  </CharacterBuilderProvider>
);


