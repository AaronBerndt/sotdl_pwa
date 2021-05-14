import { Story, Meta } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import CharactersPage from "../CharactersPage";

export default {
  title: "Pages/CharactersPage",
  component: CharactersPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

export const Main: Story = (args) => (
  <MemoryRouter>
    <CharactersPage />
  </MemoryRouter>
);
