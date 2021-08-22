import {
  Accordion as MuiAccordion,
  AccordionSummary,
  Grid,
  Typography,
  AccordionDetails,
  Select,
  MenuItem,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { useState } from "react";
import { Talent } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import ErrorIcon from "@material-ui/icons/Error";
import styled from "styled-components";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";

export type Props = {
  talent: Talent;
};

const Accordion: any = styled(MuiAccordion)`
  border: 1px solid
    ${(props: any) =>
      props?.choicesRemains.length !== props.choiceLimit ? "#1c9aef" : ""};
`;

export default function AttributeAccordion({ talent }: Props) {
  const { setCharacteristics, characteristics } = useCharacterBuilderContext();
  const [choices, setChoices] = useState<string[]>(
    characteristics
      .filter(({ level }: Talent) => level === talent.level)
      .map(({ name }: Talent) => name)
  );

  const regex = /Increase (.*) by (.*)/gm;

  const regExResults: any = regex.exec(talent.description);

  const choiceLimit =
    regExResults[1] === "two" ? 2 : regExResults[1] === "one" ? 1 : 3;

  const onChoiceSelect = (e: any) => {
    const values = e.target.value;
    console.log(values);
    if (values.length !== 0) {
      setChoices(values);

      if (values.length === choiceLimit) {
        setCharacteristics((prev: any) => [
          ...prev.filter(
            (previousValue: any) => previousValue.level !== talent.level
          ),
          ...values.map((name: string) => ({
            id: `${name}-${talent.level}`,
            name,
            value: parseInt(regExResults[2]),
            level: talent.level,
          })),
        ]);
      }
    } else {
      setChoices([]);
      setCharacteristics((previousValues: any) =>
        previousValues.filter(
          (previousValue: any) => previousValue.level !== talent.level
        )
      );
    }
  };

  return (
    <Accordion choicesRemains={choices} choiceLimit={choiceLimit}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Grid container>
          <Grid item>
            <Grid container>
              {choices.length !== choiceLimit && (
                <ErrorIcon style={{ color: "#1c9aef" }} />
              )}
              <Grid item>
                <Typography>{talent.name}</Typography>
              </Grid>
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
            {choices.length !== choiceLimit && (
              <Typography>{`Choices Remain: ${
                choiceLimit - choices.length
              }`}</Typography>
            )}
          </Grid>
          <Grid item>
            <Select
              multiple
              value={choices}
              onChange={onChoiceSelect}
              renderValue={(selected: any) => selected.join(", ")}
            >
              {["Strength", "Agility", "Will", "Intellect"].map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  disabled={
                    choices.length === choiceLimit && !choices.includes(name)
                  }
                >
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
