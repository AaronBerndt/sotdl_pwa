import { Story, Meta } from "@storybook/react";
import React from "react";
import HealthWorkspaceModal from "./HealthWorkspaceModal";

import { mockCharacter1 } from "../../../CharacterSheetPageMocks";

export default {
  title: "CharacterSheetPage/Atoms/HealthWorkspaceModal",
  component: HealthWorkspaceModal,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

export const Main: Story = (args) => (
  <HealthWorkspaceModal character={mockCharacter1} />
);
