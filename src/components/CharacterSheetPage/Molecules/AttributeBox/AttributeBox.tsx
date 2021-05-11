import { Grid } from "@material-ui/core";
import React from "react";
import AttributeBox from "../../Atoms/AttributeBox/AttributeBox";

type Props = {
  attributeList: string[];
};
export default function AttributeBoxList({ attributeList }: Props) {
  return (
    <Grid container spacing={2}>
      {attributeList.map((attribute) => (
        <Grid item xs={3}>
          <AttributeBox label={attribute} />
        </Grid>
      ))}
    </Grid>
  );
}
