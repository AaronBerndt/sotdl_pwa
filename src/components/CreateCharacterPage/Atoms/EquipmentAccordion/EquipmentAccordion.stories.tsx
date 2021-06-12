import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import EquipmentAccordion from "./EquipmentAccordion";
import { equipmentList } from "../../CreateCharacterPageMocks";
export default {
  title: "CreateCharacterPage/Atoms/EquipmentAccordion",
  component: EquipmentAccordion,
} as Meta;
export const Main: Story = () => (
  <EquipmentAccordion item={equipmentList[0]} inInventory={false} />
);
