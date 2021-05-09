import { Story, Meta } from "@storybook/react";
import React from "react";
import { mockCharacter1 } from "../../CharacterSheetPageMocks";
import AttributeBox from "./AttributeBox";
import { CharacterAttributesProvider } from "../../context/CharacterAttributesContext";

export default {
  title: "CharacterSheetPage/AttributeBox",
  component: AttributeBox,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

export const Main: Story = (args) => (
  <CharacterAttributesProvider character={mockCharacter1}>
    <AttributeBox label="Speed" />
  </CharacterAttributesProvider>
);

export const Clickable: Story = (args) => (
  <CharacterAttributesProvider character={mockCharacter1}>
    <AttributeBox label="Strength" clickable={true} />
  </CharacterAttributesProvider>
);
