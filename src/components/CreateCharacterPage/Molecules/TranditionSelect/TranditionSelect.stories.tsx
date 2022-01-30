import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import TranditionSelect from "./TranditionSelect";
import { CharacterBuilderProvider } from "../../context/CharacterBuilderContext";
export default {
  title: "CreateCharacterPage/Molecules/TranditionSelect",
  component: TranditionSelect,
} as Meta;
export const Main: Story = () => (
  <CharacterBuilderProvider>
    <TranditionSelect />
  </CharacterBuilderProvider>
);

