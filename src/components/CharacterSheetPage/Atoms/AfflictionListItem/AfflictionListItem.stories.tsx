import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AfflictionListItem from "./AfflictionListItem";
import afflictionsList from "../../Molecules/AfflictionsList/AfflictionsList";
export default {
  title: "CharacterSheetPage/Atoms/AfflictionListItem",
  component: AfflictionListItem,
} as Meta;
export const Main: Story = () => (
  <AfflictionListItem afflictions={[]} affliction={afflictionsList[0]} />
);

