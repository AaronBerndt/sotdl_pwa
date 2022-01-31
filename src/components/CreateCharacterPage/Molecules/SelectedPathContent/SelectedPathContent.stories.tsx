import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SelectedPathContent from "./SelectedPathContent";
export default {
  title: "CreateCharacterPage/Molecules/SelectedPathContent",
  component: SelectedPathContent,
} as Meta;
export const Main: Story = () => <SelectedPathContent pathName="Warrior" />;


