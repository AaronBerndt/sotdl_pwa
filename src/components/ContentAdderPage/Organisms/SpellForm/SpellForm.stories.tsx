import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SpellForm from "./SpellForm";
export default {
  title: "ContentAdderPage/Organisms/SpellForm",
  component: SpellForm,
} as Meta;
export const Main: Story = () => <SpellForm sample="test" />;
