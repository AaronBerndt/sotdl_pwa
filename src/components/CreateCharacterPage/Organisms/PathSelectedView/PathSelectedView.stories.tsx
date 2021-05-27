import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import PathSelectedView from "./PathSelectedView";
export default {
  title: "CreateCharacterPage/Organisms/PathSelectedView",
  component: PathSelectedView,
} as Meta;
export const Main: Story = () => <PathSelectedView sample="test" />;
