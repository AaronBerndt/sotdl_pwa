import {
  Accordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Grid,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import styled from "styled-components";
export type Props = {
  header: string;
  details: any;
  defaultExpanded: boolean;
  secondaryHeading?: string;
};

const AccordionDetails = styled(MuiAccordionDetails)``;

const AccordionSummary = styled(MuiAccordionSummary)``;

export default function ContentAccordion({
  header,
  secondaryHeading,
  defaultExpanded,
  details,
}: Props) {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container>
          <Grid item xs={10}>
            <Typography variant="h6">{header}</Typography>
          </Grid>

          {secondaryHeading && (
            <Grid item xs={2}>
              <Typography>{secondaryHeading}</Typography>
            </Grid>
          )}
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{details}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}
