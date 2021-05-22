import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AttributesView from "./AttributesView";
export default {
  title: "CreateCharacterPage/Organisms/AttributesView",
  component: AttributesView,
} as Meta;
export const Main: Story = () => <AttributesView />;
