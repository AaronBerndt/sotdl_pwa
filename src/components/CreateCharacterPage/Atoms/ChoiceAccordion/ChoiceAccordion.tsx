import {
  Accordion as MuiAccordion,
  AccordionSummary,
  Grid,
  Typography,
  AccordionDetails,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { Talent } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import ErrorIcon from "@material-ui/icons/Error";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import { find } from "lodash";
import tranditionList from "../../../CharacterSheetPage/Shared/Tranditions";
import usePaths from "../../hooks/usePaths";
import ContentAccordion from "../ContentAccordion/ContentAccordion";
import useAncestries from "../../hooks/useAncestries";
import { Ancestry } from "../../CreateCharacterSheetPageTypes";
export type Props = {
  talent: Talent;
  choicesRemains: boolean;
};

const Accordion: any = styled(MuiAccordion)`
  border: 1px solid
    ${(props: any) => (props?.choicesRemains === "" ? "#1c9aef" : "")};
`;

export default function ChoiceAccordion({ talent, choicesRemains }: Props) {
  const { choices, setChoices, novicePath } = useCharacterBuilderContext();
  const currentChoice = find(choices, { level: talent.level });

  const [choice, setChoice] = useState(
    currentChoice?.value ? currentChoice?.value : ""
  );

  const { data: paths, isLoading: pathsIsLoading } = usePaths();
  const { data: ancestries, isLoading: ancestryIsLoading } = useAncestries();

  if (pathsIsLoading || ancestryIsLoading) {
    return <p>Is Loading</p>;
  }

  const path = find(paths, { name: novicePath });

  const onChange = (e: any) => {
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
                <Typography>
                  {talent.level === 4
                    ? `You learn one spell or gain ${talent.name}`
                    : talent.name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid>
          <FormControl>
            {talent.name === "Discipline" ? (
              <Grid>
                <Typography>{talent.description}</Typography>
                <Select defaultValue="None" onChange={onChange}>
                  {path.disciplines.map((discipline: any) => (
                    <MenuItem value={discipline.name}>
                      {discipline.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            ) : talent.name === "Faith" ? (
              <Grid>
                <Typography>{talent.description}</Typography>
                <Select defaultValue="None" onChange={onChange}></Select>
              </Grid>
            ) : talent.name === "Tradition Focus" ? (
              <Grid>
                <Typography>{talent.description}</Typography>
                <Select defaultValue="None" onChange={onChange}>
                  {tranditionList.map((tradition) => (
                    <MenuItem value={tradition}>{tradition}</MenuItem>
                  ))}
                </Select>
              </Grid>
            ) : talent.name === "Knack" ? (
              <Grid>
                <Typography>{talent.description}</Typography>
                <Select defaultValue="None" onChange={onChange}>
                  <MenuItem value={"None"}>None</MenuItem>
                  {path.knacks.map((knack: any) => (
                    <MenuItem value={knack.name}>{knack.name}</MenuItem>
                  ))}
                </Select>
              </Grid>
            ) : talent.level === 4 ? (
              <Grid>
                <Select defaultValue="None" onChange={onChange}>
                  <MenuItem value={talent.name}>{talent.name}</MenuItem>
                  <MenuItem value={"One Spell"}>Spell</MenuItem>
                </Select>
                <ContentAccordion
                  defaultExpanded={false}
                  header={talent.name}
                  details={talent.description}
                />
              </Grid>
            ) : talent.name === "Past Life" ? (
              <Grid>
                <Typography>{talent.description}</Typography>
                <Select defaultValue="" onChange={onChange}>
                  {ancestries
                    .filter(
                      ({ talents }: Ancestry) =>
                        !talents
                          .map(({ name }: Talent) => name)
                          .includes("Past Life")
                    )
                    .map((ancestry: Ancestry) => (
                      <MenuItem value={ancestry.name}>{ancestry.name}</MenuItem>
                    ))}
                </Select>
              </Grid>
            ) : (
              <Typography>{talent.description}</Typography>
            )}
          </FormControl>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
