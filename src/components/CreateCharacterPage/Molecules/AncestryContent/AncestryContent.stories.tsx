import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import AncestryContent from "./AncestryContent";
import { ancestryList } from "../../CreateCharacterPageMocks";
export default {
  title: "CreateCharacterPage/Molecules/AncestryContent",
  component: AncestryContent,
} as Meta;
export const Main: Story = () => (
  <AncestryContent ancestryName={ancestryList[0].name} />
);


