import { Story, Meta } from "@storybook/react";
import CharacterNameTag from "./CharacterNameTag";
import { mockCharacter1 } from "../../CharacterSheetPageMocks";

export default {
  title: "CharacterSheetPage/Atoms/CharacterNameTag",
  component: CharacterNameTag,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

export const Main: Story = (args) => <CharacterNameTag {...mockCharacter1} />;

