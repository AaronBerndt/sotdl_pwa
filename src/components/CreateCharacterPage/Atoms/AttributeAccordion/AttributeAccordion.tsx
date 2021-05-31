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

  const onChoiceSelect = (e) => {
    setChoices(e.target.value);
  };

  const choiceLimit = talent.description.includes("two") ? 2 : 3;

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
          <Grid container>
            <Grid item xs={24}>
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
