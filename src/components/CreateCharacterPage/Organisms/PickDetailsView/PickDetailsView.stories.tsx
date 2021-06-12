import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import PickDetailsView from "./PickDetailsView";
import { CharacterBuilderProvider } from "../../context/CharacterBuilderContext";
import { ancestryList, pathsList } from "../../CreateCharacterPageMocks";
export default {
  title: "CreateCharacterPage/Organisms/PickDetailsView",
  component: PickDetailsView,
} as Meta;
export const Main: Story = () => (
  <CharacterBuilderProvider
    values={{
      detailChoices: [...ancestryList[0].detailChoices],
    }}
  >
    <PickDetailsView />
  </CharacterBuilderProvider>
);
