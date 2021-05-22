import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import PathsList from "./PathsList";
export default {
  title: "CreateCharacterPage/Molecules/PathsList",
  component: PathsList,
} as Meta;
export const Main: Story = () => <PathsList />;
