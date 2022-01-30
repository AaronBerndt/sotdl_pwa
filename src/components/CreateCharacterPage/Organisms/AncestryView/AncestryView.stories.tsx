import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AncestryView from "./AncestryView";
import { CharacterBuilderProvider } from "../../context/CharacterBuilderContext";
export default {
  title: "CreateCharacterPage/Organisms/AncestryView",
  component: AncestryView,
} as Meta;
export const Main: Story = () => (
  <CharacterBuilderProvider>
    <AncestryView toggleOpen={Function} />
  </CharacterBuilderProvider>
);

