import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import WeaponTable from "./WeaponTable";
export default {
  title: "CharacterSheetPage/Molecules/WeaponTable",
  component: WeaponTable,
} as Meta;
export const Main: Story = () => <WeaponTable />;


