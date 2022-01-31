import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import PathContent from "./PathContent";
import { CharacterBuilderProvider } from "../../context/CharacterBuilderContext";
export default {
  title: "CreateCharacterPage/Molecules/PathContent",
  component: PathContent,
} as Meta;
export const Main: Story = () => (
  <CharacterBuilderProvider>
    <PathContent pathName="Warrior" />
  </CharacterBuilderProvider>
);


