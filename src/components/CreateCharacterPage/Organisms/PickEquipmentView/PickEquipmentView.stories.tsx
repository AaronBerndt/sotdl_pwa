import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import PickEquipmentView from "./PickEquipmentView";
import { CharacterBuilderProvider } from "../../context/CharacterBuilderContext";
export default {
  title: "CreateCharacterPage/Organisms/PickEquipmentView",
  component: PickEquipmentView,
} as Meta;
export const Main: Story = () => (
  <CharacterBuilderProvider>
    <PickEquipmentView />
  </CharacterBuilderProvider>
);


