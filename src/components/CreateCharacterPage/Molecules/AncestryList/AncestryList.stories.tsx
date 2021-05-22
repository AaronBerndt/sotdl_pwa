import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AncestryList from "./AncestryList";
export default {
  title: "CreateCharacterPage/Molecules/AncestryList",
  component: AncestryList,
} as Meta;
export const Main: Story = () => <AncestryList />;
