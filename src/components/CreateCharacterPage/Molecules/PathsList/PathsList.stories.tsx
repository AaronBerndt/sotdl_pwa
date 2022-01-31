import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import PathsList from "./PathsList";
export default {
  title: "CreateCharacterPage/Molecules/PathsList",
  component: PathsList,
} as Meta;

export const Novice: Story = () => (
  <PathsList pathType="Novice" toggleClose={Function} />
);
export const Expert: Story = () => (
  <PathsList pathType="Expert" toggleClose={Function} />
);
export const Master: Story = () => (
  <PathsList pathType="Master" toggleClose={Function} />
);



