import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import DetailsView from "./DetailsView";
export default {
  title: "CharacterSheetPage/Organisms/DetailsView",
  component: DetailsView,
} as Meta;
export const Main: Story = () => <DetailsView />;

