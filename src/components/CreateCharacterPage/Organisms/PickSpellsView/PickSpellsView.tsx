import { Grid } from "@mui/material";
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

