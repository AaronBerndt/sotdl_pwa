import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import FormTypeSelector from "./FormTypeSelector";
export default {
  title: "ContentAdderPage/Atoms/FormTypeSelector",
  component: FormTypeSelector,
} as Meta;
export const Main: Story = () => (
  <FormTypeSelector selectFormType={Function} formType="Ancestry" />
);

