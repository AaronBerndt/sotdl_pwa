import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import PathForm from "./PathForm";
export default {
  title: "ContentAdderPage/Organisms/PathForm",
  component: PathForm,
} as Meta;
export const Main: Story = () => <PathForm sample="test" />;
