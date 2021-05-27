import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import PathsView from "./PathsView";
import { CharacterBuilderProvider } from "../../context/CharacterBuilderContext";
export default {
  title: "CreateCharacterPage/Organisms/PathsView",
  component: PathsView,
} as Meta;
export const Main: Story = () => (
  <CharacterBuilderProvider>
    <PathsView />
  </CharacterBuilderProvider>
);
