import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import LevelSelector from "./LevelSelector";
import { CharacterBuilderProvider } from "../../context/CharacterBuilderContext";

export default {
  title: "CreateCharacterPage/Atoms/LevelSelector",
  component: LevelSelector,
} as Meta;

export const Main: Story = () => (
  <CharacterBuilderProvider>
    <LevelSelector />
  </CharacterBuilderProvider>
);



