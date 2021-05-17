import { Story, Meta } from "@storybook/react";
import React from "react";
import { mockCharacter1 } from "../../CharacterSheetPageMocks";
import { CharacterAttributesProvider } from "../../context/CharacterAttributesContext";
import HealthWorkspaceButton from "./HealthWorkspaceButton";

export default {
  title: "CharacterSheetPage/Atoms/HealthWorkspaceButton",
  component: HealthWorkspaceButton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

export const Main: Story = (args) => (
  <CharacterAttributesProvider character={mockCharacter1}>
    <HealthWorkspaceButton
      currentHealth={50}
      onClick={() => console.log("Alert")}
    />
  </CharacterAttributesProvider>
);
