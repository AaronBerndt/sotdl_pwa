import { Grid } from "@material-ui/core";
import React from "react";
import AttributeAdjuster from "../../Molecules/AttributeAdjuster/AttributeAdjuster";
export default function AdjustAttributesView() {
  return (
    <Grid>
      {["Strength", "Agility", "Will", "Intellect"].map((attribute: string) => (
        <Grid item xs={4}>
          <AttributeAdjuster label={attribute} />
        </Grid>
      ))}
    </Grid>
  );
}
