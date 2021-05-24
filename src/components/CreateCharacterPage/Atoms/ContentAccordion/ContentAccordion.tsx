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
  details: any;
  defaultExpanded: boolean;
  secondaryHeading?: string;
};
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
            <Typography>{header}</Typography>
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
