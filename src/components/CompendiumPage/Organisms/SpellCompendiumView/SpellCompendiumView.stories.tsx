import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SpellCompendiumView from "./SpellCompendiumView";
export default {
  title: "CompendiumPage/Organisms/SpellCompendiumView",
  component: SpellCompendiumView,
} as Meta;
export const Main: Story = () => <SpellCompendiumView />;
