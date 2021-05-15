import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import SpellsTable from "./SpellsTable";
import { mockCharacter1 } from "../../CharacterSheetPageMocks";
import { CharacterAttributesProvider } from "../../context/CharacterAttributesContext";
import { SnackbarProvider } from "notistack";
export default {
  title: "CharacterSheetPage/Molecules/SpellsTable",
  component: SpellsTable,
} as Meta;
export const Main: Story = () => (
  <SnackbarProvider maxSnack={3}>
    <CharacterAttributesProvider character={mockCharacter1}>
      <SpellsTable />
    </CharacterAttributesProvider>
  </SnackbarProvider>
);
