import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import EditPartyView from "./EditPartyView";
export default {
  title: "ManagePartiesPage/Organisms/EditPartyView",
  component: EditPartyView,
} as Meta;
export const Main: Story = () => <EditPartyView />;
