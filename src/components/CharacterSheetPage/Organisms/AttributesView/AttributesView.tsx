import { Grid } from "@material-ui/core";
import React from "react";
import AttributeBoxList from "../../Molecules/AttributeBox/AttributeBox";
export default function AttributesView() {
  return (
    <Grid alignItems="stretch">
      <AttributeBoxList
        attributeList={[
          "Strength",
          "Agility",
          "Will",
          "Intellect",
          "Perception",
          "Speed",
          "Corruption",
          "Power",
          "Insanity",
        ]}
      />
    </Grid>
  );
}
