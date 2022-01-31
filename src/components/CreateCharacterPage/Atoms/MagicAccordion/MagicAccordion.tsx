import {
  Accordion as MuiAccordion,
  AccordionSummary,
  Grid,
  Typography,
  AccordionDetails,
  Select,
  MenuItem,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { Talent } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import ErrorIcon from "@mui/icons-material/Error";

const Accordion: any = styled(MuiAccordion)`
  border: 1px solid
    ${(props: any) => (props?.choicesRemains === "" ? "#1c9aef" : "")};
`;

export type Props = {
  talent: Talent;
};

export default function MagicAccordion({ talent }: Props) {
  const [choice, setChoice] = useState("");

  const onChoiceSelect = (e: any) => {
    setChoice(e.target.value);
  };

  return (
    <Accordion choicesRemains={choice}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Grid container>
          <Grid item xs={12}>
            {choice === "" && <ErrorIcon style={{ color: "#1c9aef" }} />}
            <Grid item>
              <Typography>{talent.name}</Typography>
            </Grid>
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
  );
}


