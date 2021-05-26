import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import LevelSelector from "./LevelSelector";
export default {
  title: "CreateCharacterPage/Atoms/LevelSelector",
  component: LevelSelector,
} as Meta;
export const Main: Story = () => <LevelSelector sample="test" />;
