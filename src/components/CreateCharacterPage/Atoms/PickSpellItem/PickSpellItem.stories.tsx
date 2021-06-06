import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import PickSpellItem from "./PickSpellItem";
import { spellList } from "../../CreateCharacterPageMocks";
import { CharacterBuilderProvider } from "../../context/CharacterBuilderContext";
export default {
  title: "CreateCharacterPage/Atoms/PickSpellItem",
  component: PickSpellItem,
} as Meta;
export const Main: Story = () => (
  <CharacterBuilderProvider>
    <PickSpellItem spell={spellList[0]} />
  </CharacterBuilderProvider>
);
