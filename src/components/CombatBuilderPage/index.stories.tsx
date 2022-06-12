import { Story, Meta } from "@storybook/react";
import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import CombatBuilderPage from "../CombatBuilderPage";

export default {
  title: "Pages/CombatBuilderPage",
  component: CombatBuilderPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

export const Main: Story = (args) => <CombatBuilderPage />;
