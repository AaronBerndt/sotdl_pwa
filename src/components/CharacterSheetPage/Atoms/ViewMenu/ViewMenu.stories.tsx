
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
    <ViewMenu
      currentState={0}
      menu={["Attributes", "Actions", "Magic", "Equipment", "Talents"]}
      updateCurrentChoice={() => console.log("action")}
    />
  </CharacterAttributesProvider>
);

