import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AncestryList from "./AncestryList";
import { CharacterBuilderProvider } from "../../context/CharacterBuilderContext";
export default {
  title: "CreateCharacterPage/Molecules/AncestryList",
  component: AncestryList,
} as Meta;
export const Main: Story = () => (
  <CharacterBuilderProvider>
    <AncestryList toggleClose={Function} />;
  </CharacterBuilderProvider>
);

