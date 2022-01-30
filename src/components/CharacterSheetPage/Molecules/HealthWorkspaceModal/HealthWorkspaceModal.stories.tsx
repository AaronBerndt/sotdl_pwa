import { Story, Meta } from "@storybook/react";
import React from "react";
import { mockCharacter1 } from "../../CharacterSheetPageMocks";
import { CharacterAttributesProvider } from "../../context/CharacterAttributesContext";
import HealthWorkspaceModal from "./HealthWorkspaceModal";

export default {
  title: "CharacterSheetPage/Atoms/HealthWorkspaceModal",
  component: HealthWorkspaceModal,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

export const Main: Story = (args) => (
  <CharacterAttributesProvider character={mockCharacter1}>
    <HealthWorkspaceModal character={mockCharacter1} />
  </CharacterAttributesProvider>
);

