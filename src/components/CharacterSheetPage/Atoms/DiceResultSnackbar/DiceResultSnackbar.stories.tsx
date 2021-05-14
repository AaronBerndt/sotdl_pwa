import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import DiceResultSnackbar from "./DiceResultSnackbar";
export default {
  title: "CharacterSheetPage/Atoms/DiceResultSnackbar",
  component: DiceResultSnackbar,
} as Meta;
export const Main: Story = () => <DiceResultSnackbar />;
