import { Story, Meta } from "@storybook/react";
import React from "react";
import { mockCharacter1 } from "../../CharacterSheetPageMocks";
import HealthWorkspaceButton from "./HealthWorkspaceButton";

export default {
  title: "CharacterSheetPage/Atoms/HealthWorkspaceButton",
  component: HealthWorkspaceButton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

export const Main: Story = (args) => (
  <HealthWorkspaceButton
    {...mockCharacter1}
    onClick={() => console.log("Alert")}
  />
);
