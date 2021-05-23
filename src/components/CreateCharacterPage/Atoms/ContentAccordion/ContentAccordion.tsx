import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
export type Props = {
  header: string;
  secondaryHeading: string;
  details: string;
};
export default function ContentAccordion({
  header,
  secondaryHeading,
  details,
}: Props) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container>
          <Grid item xs={10}>
            <Typography>{header}</Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography>{secondaryHeading}</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{details}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}
