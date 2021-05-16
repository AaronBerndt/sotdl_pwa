import { Grid } from "@material-ui/core";
import React from "react";
import SpellsTable from "../../Molecules/SpellsTable/SpellsTable";
import WeaponTable from "../../Molecules/WeaponTable/WeaponTable";
export default function ActionsView() {
  return (
    <Grid>
      <WeaponTable />
      <SpellsTable />
    </Grid>
  );
}
