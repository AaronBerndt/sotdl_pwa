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
import React, { useState } from "react";

import ErrorIcon from "@material-ui/icons/Error";
import { Talent } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import styled from "styled-components";
export type Props = {
  talent: Talent;
};

const Accordion: any = styled(MuiAccordion)`
  border: 1px solid
    ${(props: any) => (props?.choicesRemains === "" ? "#1c9aef" : "")};
`;

export default function LangOrProfesssionAccordion({ talent }: Props) {
  const [choice, setChoice] = useState("");
  const [languageOrProfession, setLanguageOrProfession] = useState(
    "Profession"
  );

  const toggleLanguageOrProfession = (e: any) => {
    setLanguageOrProfession(e.target.value);
  };

  const onChoiceSelect = (e: any) => {
    setChoice(e.target.value);
  };

  return (
    <Accordion choicesRemains={choice}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Grid container>
          {choice === "" && <ErrorIcon style={{ color: "#1c9aef" }} />}
          <Grid item>
            <Typography>{talent.name}</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container direction="column">
          <Grid item>
            <Typography>{talent.description}</Typography>
          </Grid>

          {talent.description.includes("language") && (
            <Grid item>
              <Select
                value={languageOrProfession}
                onChange={toggleLanguageOrProfession}
              >
                {["Language", "Profession"].map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
          {languageOrProfession === "Language" ? (
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
          ) : (
            <Grid item>
              <Select value={choice} onChange={onChoiceSelect}>
                {[
                  "Academic",
                  "Common",
                  "Criminal",
                  "Martial",
                  "Wilderness",
                  "Religious",
                ]
                  .filter((profession) =>
                    talent.description.includes(profession.toLowerCase())
                  )
                  .map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
