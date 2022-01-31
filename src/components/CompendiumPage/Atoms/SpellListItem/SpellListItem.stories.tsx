import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SpellListItem from "./SpellListItem";
import { spellList } from "../../../CreateCharacterPage/CreateCharacterPageMocks";
import { mockCharacter1 } from "../../../CharacterSheetPage/CharacterSheetPageMocks";
import { makeStyles, Theme, createStyles } from "@mui/material";
export default {
  title: "CompendiumPage/Atoms/SpellListItem",
  component: SpellListItem,
} as Meta;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: 400,
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export const Main: Story = () => (
  <SpellListItem spell={mockCharacter1.spells[0]} style={useStyles} />
);


