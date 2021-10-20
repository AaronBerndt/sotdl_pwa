import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import ActionListItem from "./ActionListItem";
import { mockCharacter1 } from "../../CharacterSheetPageMocks";
export default {
  title: "CharacterSheetPage/Atoms/ActionListItem",
  component: ActionListItem,
} as Meta;
export const Main: Story = () => (
  <ActionListItem talent={mockCharacter1.talents[0]} />
);
