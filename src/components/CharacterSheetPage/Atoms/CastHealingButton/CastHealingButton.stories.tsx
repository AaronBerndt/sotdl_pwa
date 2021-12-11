import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import CastHealingButton from "./CastHealingButton";
import { spellList } from "../../../CreateCharacterPage/CreateCharacterPageMocks";
export default {
  title: "CharacterSheetPage/Atoms/CastHealingButton",
  component: CastHealingButton,
} as Meta;
export const Main: Story = () => <CastHealingButton spell={spellList[0]} />;
