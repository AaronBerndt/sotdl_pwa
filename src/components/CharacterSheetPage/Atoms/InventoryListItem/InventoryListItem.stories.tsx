import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import InventoryListItem from "./InventoryListItem";
import { mockCharacter1 } from "../../CharacterSheetPageMocks";
export default {
  title: "CharacterSheetPage/Atoms/InventoryListItem",
  component: InventoryListItem,
} as Meta;
export const Main: Story = () => (
  <InventoryListItem item={mockCharacter1.items.armor[0]} />
);

