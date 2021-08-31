import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SpellListItem from "./SpellListItem";
import { spellList } from "../../../CreateCharacterPage/CreateCharacterPageMocks";
import { mockCharacter1 } from "../../../CharacterSheetPage/CharacterSheetPageMocks";
export default {
  title: "CompendiumPage/Atoms/SpellListItem",
  component: SpellListItem,
} as Meta;
export const Main: Story = () => (
  <SpellListItem spell={mockCharacter1.spells[0]} />
);
