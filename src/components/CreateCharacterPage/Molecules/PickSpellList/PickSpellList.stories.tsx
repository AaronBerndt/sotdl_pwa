import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import PickSpellList from "./PickSpellList";
import { CharacterBuilderProvider } from "../../context/CharacterBuilderContext";
export default {
  title: "CreateCharacterPage/Molecules/PickSpellList",
  component: PickSpellList,
} as Meta;
export const Main: Story = () => (
  <CharacterBuilderProvider
    values={{
      traditions: ["Celestial", "Air"],
    }}
  >
    <PickSpellList />
  </CharacterBuilderProvider>
);
