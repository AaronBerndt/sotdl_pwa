import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import ContentAccordion from "./ContentAccordion";
export default {
  title: "CreateCharacterPage/Atoms/ContentAccordion",
  component: ContentAccordion,
} as Meta;
export const Main: Story = () => (
  <ContentAccordion
    header="Test"
    secondaryHeading="Test"
    details="Test"
    defaultExpanded={true}
  />
);

