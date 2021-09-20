import { Grid } from "@material-ui/core";
import React from "react";
import SpellsTable from "../../../CharacterSheetPage/Molecules/SpellsTable/SpellsTable";
import TranditionSelect from "../../Molecules/TranditionSelect/TranditionSelect";
export default function PickSpellsView() {
  return (
    <Grid>
      <Grid item>
        <TranditionSelect />
      </Grid>
      <Grid item>
        <SpellsTable pickSpell={true} />
      </Grid>
    </Grid>
  );
}
