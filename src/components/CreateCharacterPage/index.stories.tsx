import { Story, Meta } from "@storybook/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import CreateCharacterPage from "../CreateCharacterPage";

export default {
  title: "Pages/CreateCharacterPage",
  component: CreateCharacterPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

export const Main: Story = (args) => (
  <BrowserRouter>
    <MemoryRouter initialEntries={["/create_character"]}>
      <CreateCharacterPage />
    </MemoryRouter>
  </BrowserRouter>
);


