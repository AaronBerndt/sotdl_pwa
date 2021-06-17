import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AncestryForm from "./AncestryForm";
export default {
  title: "ContentAdderPage/Organisms/AncestryForm",
  component: AncestryForm,
} as Meta;
export const Main: Story = () => <AncestryForm />;
