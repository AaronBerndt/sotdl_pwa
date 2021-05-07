import { Story, Meta } from "@storybook/react";
import React from "react";
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
    maxHealth={100}
    currentHealth={50}
    onClick={() => console.log("Alert")}
  />
);
