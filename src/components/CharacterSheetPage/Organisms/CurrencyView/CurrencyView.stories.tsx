import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import CurrencyView from "./CurrencyView";
export default {
  title: "CharacterSheetPage/Organisms/CurrencyView",
  component: CurrencyView,
} as Meta;
export const Main: Story = () => <CurrencyView />;
