import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import PickSpellItem from "./PickSpellItem";
import { spellList } from "../../CreateCharacterPageMocks";
import { CharacterBuilderProvider } from "../../context/CharacterBuilderContext";
import { makeStyles, Theme, createStyles } from "@mui/material";
export default {
  title: "CreateCharacterPage/Atoms/PickSpellItem",
  component: PickSpellItem,
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
  <CharacterBuilderProvider>
    <PickSpellItem spell={spellList[0]} style={useStyles} />
  </CharacterBuilderProvider>
);


