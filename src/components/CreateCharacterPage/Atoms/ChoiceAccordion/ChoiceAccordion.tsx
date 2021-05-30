import {
  Accordion as MuiAccordion,
  AccordionSummary,
  Grid,
  Typography,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  Badge,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { Talent } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import usePaths from "../../hooks/usePaths";
import ErrorIcon from "@material-ui/icons/Error";
export type Props = {
  talent: Talent;
  choicesRemains: boolean;
};

const Accordion: any = styled(MuiAccordion)`
  border: 1px solid
    ${(props: any) => (props?.choicesRemains === "" ? "#1c9aef" : "")};
`;

export default function ChoiceAccordion({ talent, choicesRemains }: Props) {
  const { data: paths } = usePaths();

  const [choice, setChoice] = useState("");

  const onChoiceSelect = (e) => {
    setChoice(e.target.value);
  };

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
            <Grid item xs={10}>
              <Typography>{talent.name}</Typography>
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
                  inputProps={{
                    name: "age",
                    id: "age-native-simple",
                  }}
                >
                  <option value="" />
                  {talent.choices.map((choice: any) => (
                    <option aria-label={choice.name} value={choice.name}>
                      {choice.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Badge>
  );
}
