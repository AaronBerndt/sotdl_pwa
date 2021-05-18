import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SpellListItem from "./SpellListItem";
import { mockCharacter1 } from "../../CharacterSheetPageMocks";
export default {
  title: "CharacterSheetPage/Atoms/SpellListItem",
  component: SpellListItem,
} as Meta;
export const Main: Story = () => (
  <SpellListItem spell={mockCharacter1.spells[0]} />
);
