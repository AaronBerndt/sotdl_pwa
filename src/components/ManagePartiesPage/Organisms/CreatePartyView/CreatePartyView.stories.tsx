import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import CreatePartyView from "./CreatePartyView";
export default {
  title: "ManagePartiesPage/Organisms/CreatePartyView",
  component: CreatePartyView,
} as Meta;
export const Main: Story = () => <CreatePartyView />;
