import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import StepperFooter from "./StepperFooter";
export default {
  title: "CreateCharacterPage/Molecules/StepperFooter",
  component: StepperFooter,
} as Meta;
export const Main: Story = () => <StepperFooter sample="test" />;
