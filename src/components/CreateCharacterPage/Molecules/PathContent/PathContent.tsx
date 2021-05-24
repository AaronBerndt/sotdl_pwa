import { Grid, Typography, Avatar } from "@material-ui/core";
import { find, groupBy } from "lodash";
import React from "react";
import {
  Characteristic,
  Talent,
} from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import ContentAccordion from "../../Atoms/ContentAccordion/ContentAccordion";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import usePaths from "../../hooks/usePaths";
export type Props = {
  pathName: string;
};
export default function PathContent({ pathName }: Props) {
  const { data: paths, isLoading } = usePaths();
  const { level: selectedLevel } = useCharacterBuilderContext();

  const path = find(paths, { name: pathName });

  if (isLoading) {
    return <p>Is Loading</p>;
  }

  const levelUpArray = groupBy(
    [...path.characteristics, ...path.talents],
    "level"
  );

  return (
    <Grid>
      <Grid container>
        <Grid xs={10}>{<Typography variant="h4">{path.name}</Typography>}</Grid>
        <Grid xs={2} justify="flex-end">
          {<Avatar variant="square" />}
        </Grid>
      </Grid>
      <Grid>{<Typography variant="body2">{path.description}</Typography>}</Grid>
      <Grid>
        {Object.entries(levelUpArray).map((group) => {
          const [LEVEL] = group;

          const talentList = path.talents.filter(
            ({ level }: Talent) => level === parseInt(LEVEL)
          );

          const characteristicsList = path.characteristics.filter(
            ({ level }: Characteristic) => level === parseInt(LEVEL)
          );

          return (
            <ContentAccordion
              header={`Level ${LEVEL} ${path.name}`}
              defaultExpanded={selectedLevel >= parseInt(LEVEL)}
              details={
                <Grid>
                  <Typography variant="h6">Characteristics</Typography>
                  {characteristicsList.map((characteristic: Characteristic) => (
                    <Typography>{`${characteristic.name}: +${characteristic.value}`}</Typography>
                  ))}

                  <Typography variant="h6">Talents</Typography>
                  {talentList.map((talent: Talent) => (
                    <ContentAccordion
                      defaultExpanded={true}
                      header={talent.name}
                      details={talent.description}
                    />
                  ))}
                </Grid>
              }
            />
          );
        })}
      </Grid>
    </Grid>
  );
}
