import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AttributesView from "./AttributesView";
import { CharacterBuilderProvider } from "../../context/CharacterBuilderContext";
export default {
  title: "CreateCharacterPage/Organisms/AttributesView",
  component: AttributesView,
} as Meta;
export const Main: Story = () => (
  <CharacterBuilderProvider
    values={{
      level: 1,
      novicePath: "Warrior",
      ancestry: "Human",
    }}
  >
    <AttributesView />;
  </CharacterBuilderProvider>
);
