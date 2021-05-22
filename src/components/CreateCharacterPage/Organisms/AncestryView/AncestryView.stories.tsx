import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AncestryView from "./AncestryView";
export default {
  title: "CreateCharacterPage/Organisms/AncestryView",
  component: AncestryView,
} as Meta;
export const Main: Story = () => <AncestryView />;
