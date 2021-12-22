import { Story, Meta } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import CombatTrackerPage from "./index";

export default {
  title: "Pages/CombatTrackerPage",
  component: CombatTrackerPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

export const Main: Story = (args) => (
  <BrowserRouter basename="/combat/1/">
    <CombatTrackerPage />
  </BrowserRouter>
);
