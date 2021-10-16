import { Grid } from "@material-ui/core";
import React from "react";
import AttributeBox from "../../Atoms/AttributeBox/AttributeBox";
import { Unselectable } from "../../Shared/Tags";

type Props = {
  attributeList: string[];
};
export default function AttributeBoxList({ attributeList }: Props) {
  return (
    <Grid container spacing={1}>
      {attributeList.map((attribute) => (
        <Unselectable>
          <Grid item xs={4}>
            <AttributeBox label={attribute} />
          </Grid>
        </Unselectable>
      ))}
    </Grid>
  );
}
