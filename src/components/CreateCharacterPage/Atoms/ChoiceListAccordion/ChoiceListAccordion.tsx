import {
  Select,
  MenuItem,
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { find } from "lodash";
import React, { useState } from "react";
import { Talent } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import ContentAccordion from "../ContentAccordion/ContentAccordion";
import ErrorIcon from "@material-ui/icons/Error";
import styled from "styled-components";
export type Props = {
  choiceList: Talent[];
};

const Accordion: any = styled(MuiAccordion)`
  border: 1px solid
    ${(props: any) => (props?.choicesRemains === "" ? "#1c9aef" : "")};
`;

export default function ChoiceListAccordion({ choiceList }: Props) {
  const { choices, setChoices } = useCharacterBuilderContext();
  const currentChoice = find(choices, { level: 4 });

  const [choice, setChoice] = useState(
    currentChoice?.value ? currentChoice?.value : ""
  );

  const onChange = (e: any) => {
    if (find(choices, { level: 4 })) {
      setChoices((prev: any) => [
        ...prev.filter(({ level }: Talent) => level !== 4),
        {
          name: "Level 4",
          value: e.target.value,
          level: 4,
        },
      ]);
    } else {
      setChoices((prev: any) => [
        ...prev,
        {
          name: "Level 4",
          value: e.target.value,
          level: 4,
        },
      ]);
    }

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
                <Typography>
                  You learn one spell or
                  {choiceList.length === 1
                    ? ` learn ${choiceList[0].name}`
                    : " learn one of the following."}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionSummary>

      <AccordionDetails>
        <Grid>
          <Grid item>
            <Select
              defaultValue={currentChoice?.value ? currentChoice?.value : ""}
              onChange={onChange}
            >
              {choiceList.map((choice: Talent) => (
                <MenuItem value={choice.name}>{choice.name}</MenuItem>
              ))}
              <MenuItem value={"One Spell"}>Spell</MenuItem>
            </Select>
          </Grid>

          {choiceList.map((choice: Talent) => (
            <Grid item>
              <ContentAccordion
                defaultExpanded={false}
                header={choice.name}
                details={choice.description}
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
