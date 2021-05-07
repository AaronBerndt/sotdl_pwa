import { Story, Meta } from "@storybook/react";
import CharacterSheetPage from "../CharacterSheetPage";

export default {
  title: "Pages/CharacterSheetPage",
  component: CharacterSheetPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

export const Main: Story = (args) => <CharacterSheetPage />;
