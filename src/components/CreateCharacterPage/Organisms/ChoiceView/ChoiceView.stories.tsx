import { Story, Meta } from "@storybook/react/types-6-0";
import ChoiceView from "./ChoiceView";
import { CharacterBuilderProvider } from "../../context/CharacterBuilderContext";
export default {
  title: "CreateCharacterPage/Organisms/ChoiceView",
  component: ChoiceView,
} as Meta;
export const Main: Story = () => (
  <CharacterBuilderProvider>
    <ChoiceView />
  </CharacterBuilderProvider>
);


