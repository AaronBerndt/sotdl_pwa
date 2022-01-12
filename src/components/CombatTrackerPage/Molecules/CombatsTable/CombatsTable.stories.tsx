import { Story, Meta } from "@storybook/react";
import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import CombatsTable from "./CombatsTable";

export default {
  title: "Pages/CombatsTable",
  component: CombatsTable,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

export const Main: Story = (args) => <CombatsTable />;
