import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import CustomItemForm from "./CustomItemForm";
export default {
  title: "CreateCharacterPage/Molecules/CustomItemForm",
  component: CustomItemForm,
} as Meta;
export const Main: Story = () => <CustomItemForm />;
