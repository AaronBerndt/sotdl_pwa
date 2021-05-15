import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import ActionsViews from "./ActionsViews";
export default {
  title: "CharacterSheetPage/Organisms/ActionsViews",
  component: ActionsViews,
} as Meta;
export const Main: Story = () => <ActionsViews sample="test" />;
