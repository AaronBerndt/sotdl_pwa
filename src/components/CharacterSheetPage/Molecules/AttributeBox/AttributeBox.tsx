import { Grid } from "@mui/material";
import React from "react";
import AttributeBox from "../../Atoms/AttributeBox/AttributeBox";

type Props = {
  attributeList: string[];
};
export default function AttributeBoxList({ attributeList }: Props) {
  return (
    <Grid container spacing={1}>
      {attributeList.map((attribute) => (
        <Grid item xs={4}>
          <AttributeBox label={attribute} />
        </Grid>
      ))}
    </Grid>
  );
}


