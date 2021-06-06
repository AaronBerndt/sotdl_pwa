import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AdjustAttributesView from "./AdjustAttributesView";
import { CharacterBuilderProvider } from "../../context/CharacterBuilderContext";
export default {
  title: "CreateCharacterPage/Organisms/AdjustAttributesView",
  component: AdjustAttributesView,
} as Meta;
export const Main: Story = () => (
  <CharacterBuilderProvider
    values={{
      level: 1,
      novicePath: "Warrior",
      ancestry: "Human",
      characteristics: [
        {
          name: "Will",
          value: 1,
          level: 1,
        },
        {
          name: "Strength",
          value: 1,
          level: 1,
        },
      ],
    }}
  >
    <AdjustAttributesView />;
  </CharacterBuilderProvider>
);
