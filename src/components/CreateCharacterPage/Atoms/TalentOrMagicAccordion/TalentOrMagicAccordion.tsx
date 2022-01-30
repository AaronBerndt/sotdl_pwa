import {
  Accordion as MuiAccordion,
  AccordionSummary,
  Grid,
  Typography,
  AccordionDetails,
  FormControl,
  Select,
} from "@mui/material";
import { ExpandMore } from "@material-ui/icons";
import React, { useState } from "react";
import { Talent } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import { find } from "lodash";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import ErrorIcon from "@material-ui/icons/Error";
import styled from "styled-components";

export type Props = {
  talent: Talent;
};

const Accordion: any = styled(MuiAccordion)`
  border: 1px solid
    ${(props: any) => (props?.choicesRemains === "" ? "#1c9aef" : "")};
`;

export default function TalentOrMagicAccordion({ talent }: Props) {
  const { choices, setChoices } = useCharacterBuilderContext();
  const currentChoice = find(choices, { level: talent.level });
  const [choice, setChoice] = useState(
    currentChoice?.value ? currentChoice?.value : ""
  );

  const onChoiceSelect = (e: any) => {
    setChoices((prev: any) => [
      ...prev,
      {
        name: talent.name,
        value: e.target.value,
        level: talent.level,
      },
    ]);

    setChoice(e.target.value);
  };

  return (
    <Accordion choicesRemains={choice}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Grid container>
          <Grid item xs={10}>
            <Grid container>
              {choice === "" && <ErrorIcon style={{ color: "#1c9aef" }} />}
              <Grid item>
                <Typography>{talent.name}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Typography>{talent.level}</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid>
          <Typography>{talent.description}</Typography>
          {talent?.choices && (
            <FormControl>
              <Select
                native
                defaultValue={`Pick ${talent} name`}
                onChange={onChoiceSelect}
              >
                <option value="" />
                {talent.choices.map((choice: any, i: number) => (
                  <option aria-label={choice.name} value={choice.name} key={i}>
                    {choice.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

