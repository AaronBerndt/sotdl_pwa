import { Grid } from "@material-ui/core";
import React from "react";
import { lengthIsZero } from "../../../../utils/logic";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import SpellsTable from "../../Molecules/SpellsTable/SpellsTable";
export default function MagicView() {
  const { spells } = useCharacterAttributes();

  return (
    <Grid>{lengthIsZero(spells) ? <p>No Spells</p> : <SpellsTable />}</Grid>
  );
}
