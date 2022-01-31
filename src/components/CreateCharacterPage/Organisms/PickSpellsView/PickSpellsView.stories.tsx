import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import PickSpellsView from "./PickSpellsView";
import { CharacterBuilderProvider } from "../../context/CharacterBuilderContext";
export default {
  title: "CreateCharacterPage/Organisms/PickSpellsView",
  component: PickSpellsView,
} as Meta;
export const Main: Story = () => (
  <CharacterBuilderProvider>
    <PickSpellsView />
  </CharacterBuilderProvider>
);


