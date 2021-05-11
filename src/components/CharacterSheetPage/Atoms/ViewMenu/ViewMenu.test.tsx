import { Story, Meta } from "@storybook/react";
import { mockCharacter1 } from "../../CharacterSheetPageMocks";
import { CharacterAttributesProvider } from "../../context/CharacterAttributesContext";
import ViewMenu from "./ViewMenu";

export default {
  title: "CharacterSheetPage/Atoms/ViewMenu",
  component: ViewMenu,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

export const Main: Story = (args) => (
  <CharacterAttributesProvider character={mockCharacter1}>
    <ViewMenu />
  </CharacterAttributesProvider>
);
