import {
  Badge,
  Accordion as MuiAccordion,
  AccordionSummary,
  Grid,
  Typography,
  AccordionDetails,
  Select,
  MenuItem,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { Talent } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import ErrorIcon from "@material-ui/icons/Error";

const Accordion: any = styled(MuiAccordion)`
  border: 1px solid
    ${(props: any) => (props?.choicesRemains === "" ? "#1c9aef" : "")};
`;

export type Props = {
  talent: Talent;
};

export default function MagicAccordion({ talent }: Props) {
  return (
    <Badge
      invisible={choice !== ""}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      badgeContent={<ErrorIcon style={{ color: "#1c9aef" }} />}
    >
      <Accordion choicesRemains={choice}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Grid container>
            <Grid item xs={12}>
              <Typography>{talent.name}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column">
            <Grid item>
              <Typography>{talent.description}</Typography>
            </Grid>

            <Grid item>
              <Select value={choice} onChange={onChoiceSelect}>
                {[
                  "Dark Speech",
                  "Dwarfish",
                  "Elvish",
                  "High Archaic",
                  "Trollish",
                  "Religious",
                ].map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Badge>
  );
}
