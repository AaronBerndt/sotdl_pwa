import React, { useState } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import HurtHealModal from "./HurtHealModal";
import { combatants } from "../../CombatTrackerPageMocks";
import useToggle from "../../../hooks/useToggle";
export default {
  title: "CombatTrackerPage/Molecules/HurtHealModal",
  component: HurtHealModal,
} as Meta;
export const Main: Story = () => {
  const toggleEvent = useToggle();
  return <HurtHealModal toggleEvent={toggleEvent} combatant={combatants[0]} />;
};


