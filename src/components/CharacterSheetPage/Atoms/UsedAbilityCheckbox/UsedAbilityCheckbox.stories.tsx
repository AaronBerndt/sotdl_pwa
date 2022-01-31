import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import UsedAbilityCheckbox from "./UsedAbilityCheckbox";
export default {
  title: "CharacterSheetPage/Atoms/UsedAbilityCheckbox",
  component: UsedAbilityCheckbox,
} as Meta;
export const Main: Story = () => <UsedAbilityCheckbox sample="test" />;


