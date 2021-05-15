import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import EquipmentView from "./EquipmentView";
export default {
  title: "CharacterSheetPage/Organisms/EquipmentView",
  component: EquipmentView,
} as Meta;
export const Main: Story = () => <EquipmentView sample="test" />;
