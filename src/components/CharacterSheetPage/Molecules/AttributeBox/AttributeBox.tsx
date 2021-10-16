import { Grid } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import AttributeBox from "../../Atoms/AttributeBox/AttributeBox";

type Props = {
  attributeList: string[];
};

const StyledAttributeBox = styled(AttributeBox)`
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;

  /*
     Introduced in Internet Explorer 10.
     See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
   */
  -ms-user-select: none;
  user-select: none;
`;

export default function AttributeBoxList({ attributeList }: Props) {
  return (
    <Grid container spacing={1}>
      {attributeList.map((attribute) => (
        <Grid item xs={4}>
          <StyledAttributeBox label={attribute} />
        </Grid>
      ))}
    </Grid>
  );
}
