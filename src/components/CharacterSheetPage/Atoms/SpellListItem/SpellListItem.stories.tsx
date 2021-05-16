import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SpellListItem from "./SpellListItem";
export default {
  title: "CharacterSheetPage/Atoms/SpellListItem",
  component: SpellListItem,
} as Meta;
export const Main: Story = () => <SpellListItem sample="test" />;
