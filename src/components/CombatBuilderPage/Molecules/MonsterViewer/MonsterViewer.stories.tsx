import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import MonsterViewer from "./MonsterViewer";
import {Goblin} from "../../../CombatTrackerPage/CombatTrackerPageMocks";
export default {
  title: "CombatBuilderPage/Molecules/MonsterViewer",
  component: MonsterViewer,
} as Meta;
export const Main: Story = () => <MonsterViewer selectMonster={Goblin} />;

