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
  const [choices, setChoices] = useState<string[]>([]);
  const { setCharacteristics } = useCharacterBuilderContext();

  const regex = /Increase (.*) by (.*)/gm;

  const [_, amountToIncrease, amountToIncreaseBy]: any = regex.exec(
    talent.description
  );

  const choiceLimit =
    amountToIncrease === "two" ? 2 : amountToIncrease === "one" ? 1 : 3;

  const onChoiceSelect = (e) => {
    const values = e.target.value;
    if (values.length !== 0) {
      setChoices(values);
      setCharacteristics((prev: any) => [
        ...prev,
        ...values.map((name: string) => ({
          id: `${name}-${talent.level}`,
          name,
          value: parseInt(amountToIncreaseBy),
          level: talent.level,
        })),
      ]);
    } else {
      setChoices([]);
      setCharacteristics((previousValues: any) =>
        previousValues.filter(
          (previousValue: any) =>
            previousValue.level === talent.level &&
            !values.includes(previousValue.name)
        )
      );

      /* ); */
    }
  };

  return (
    <Badge
      invisible={choices.length === choiceLimit}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      badgeContent={<ErrorIcon style={{ color: "#1c9aef" }} />}
    >
      <Accordion choicesRemains={choices} choiceLimit={choiceLimit}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Grid container xs={12}>
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
    </Badge>
  );
}
