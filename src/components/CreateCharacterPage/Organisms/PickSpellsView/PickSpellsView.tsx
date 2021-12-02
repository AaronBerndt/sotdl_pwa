import { Grid } from "@material-ui/core";
import React from "react";
import SpellsTable from "../../Molecules/PickSpellTable/PickSpellTable";
export default function PickSpellsView() {
  return (
    <Grid>
      <Grid item>
        <SpellsTable pickSpell={true} />
      </Grid>
    </Grid>
  );
}
