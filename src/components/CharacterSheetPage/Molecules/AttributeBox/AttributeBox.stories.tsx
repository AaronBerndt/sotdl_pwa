import { Story, Meta } from "@storybook/react";
import React from "react";
import { mockCharacter1 } from "../../CharacterSheetPageMocks";
import { CharacterAttributesProvider } from "../../context/CharacterAttributesContext";
import AttributeBox from "./AttributeBox";
import AttributeBoxList from "./AttributeBox";

export default {
  title: "CharacterSheetPage/Molecules/AttributeBox",
  component: AttributeBox,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

export const Four: Story = (args) => (
  <CharacterAttributesProvider character={mockCharacter1}>
    <AttributeBoxList
      attributeList={["Speed", "Corruption", "Insanity", "Defense"]}
    />
  </CharacterAttributesProvider>
);

export const Five: Story = (args) => (
  <CharacterAttributesProvider character={mockCharacter1}>
    <AttributeBoxList
      attributeList={["Strength", "Agility", "Will", "Intellect", "Perception"]}
    />
  </CharacterAttributesProvider>
);

export const More: Story = (args) => (
  <CharacterAttributesProvider character={mockCharacter1}>
    <AttributeBoxList
      attributeList={[
        "Strength",
        "Agility",
        "Will",
        "Intellect",
        "Perception",
        "Speed",
        "Corruption",
        "Insanity",
        "Defense",
        "Power",
      ]}
    />
  </CharacterAttributesProvider>
);
