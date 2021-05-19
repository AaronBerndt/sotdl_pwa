import { Story, Meta } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import CharacterSheetPage from "../CharacterSheetPage";

export default {
  title: "Pages/CharacterSheetPage",
  component: CharacterSheetPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

export const Main: Story = (args) => (
  <BrowserRouter basename="/characters/1/attributes">
    <CharacterSheetPage />
  </BrowserRouter>
);
