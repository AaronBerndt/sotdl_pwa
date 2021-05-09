import { Grid } from "@material-ui/core";
import React from "react";
import AttributeBox from "../../Atoms/AttributeBox/AttributeBox";

type Props = {
  attributeList: string[];
};
export default function AttributeBoxList({ attributeList }: Props) {
  return (
    <Grid container xs={attributeList.length === 4 ? 4 : 3}>
      {attributeList.map((label) => (
        <Grid>
          <AttributeBox label={label} />
        </Grid>
      ))}
    </Grid>
  );
}
