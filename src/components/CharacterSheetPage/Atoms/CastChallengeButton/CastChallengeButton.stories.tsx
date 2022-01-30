import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import CastChallengeButton from "./CastChallengeButton";
import {spellList} from "../../../CreateCharacterPage/CreateCharacterPageMocks";
export default {
  title: "CharacterSheetPage/Atoms/CastChallengeButton",
  component: CastChallengeButton,
} as Meta;
export const Main: Story = () => <CastChallengeButton spell={spellList[0]} />;

