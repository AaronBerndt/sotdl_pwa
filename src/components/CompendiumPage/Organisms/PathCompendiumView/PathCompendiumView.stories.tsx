import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import PathCompendiumView from "./PathCompendiumView";
export default {
  title: "CompendiumPage/Organisms/PathCompendiumView",
  component: PathCompendiumView,
} as Meta;
export const Main: Story = () => <PathCompendiumView sample="test" />;


