import { Story, Meta } from "@storybook/react";
import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import CharactersPage from "../CharactersPage";

export default {
  title: "Pages/CharactersPage",
  component: CharactersPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

export const Main: Story = (args) => (
  <BrowserRouter>
    <MemoryRouter initialEntries={["characters/1/attributes"]}>
      <CharactersPage />
    </MemoryRouter>
  </BrowserRouter>
);

