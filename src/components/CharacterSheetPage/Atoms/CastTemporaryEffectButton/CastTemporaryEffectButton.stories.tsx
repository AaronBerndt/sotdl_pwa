import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import CastTemporaryEffectButton from "./CastTemporaryEffectButton";
import { spellList } from "../../../CreateCharacterPage/CreateCharacterPageMocks";
export default {
  title: "CharacterSheetPage/Atoms/CastTemporaryEffectButton",
  component: CastTemporaryEffectButton,
} as Meta;
export const Main: Story = () => (
  <CastTemporaryEffectButton spell={spellList[0]} />
);

