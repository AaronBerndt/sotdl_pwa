import { Story, Meta } from "@storybook/react";
import React from "react";
import { mockCharacter1 } from "../../CharacterSheetPageMocks";
import HealthWorkspace from "./HealthWorkpace";

export default {
  title: "CharacterSheetPage/Atoms/HealthWorkspace",
  component: HealthWorkspace,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

export const Main: Story = (args) => <HealthWorkspace {...mockCharacter1} />;
