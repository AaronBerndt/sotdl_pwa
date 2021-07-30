import { Avatar, Grid, Typography } from "@material-ui/core";
import React from "react";
import {
  Characteristic,
  Talent,
} from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import ContentAccordion from "../../Atoms/ContentAccordion/ContentAccordion";
import useAncestries from "../../hooks/useAncestries";
import { find, groupBy } from "lodash";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
export type Props = {
  ancestryName: string;
};
export default function AncestryContent({ ancestryName }: Props) {
  const { data: ancestries } = useAncestries();
  const { level: selectedLevel } = useCharacterBuilderContext();

  const ancestry = find(ancestries, { name: ancestryName });

  const levelUpArray = groupBy(
    [...ancestry.characteristics, ...ancestry.talents],
    "level"
  );

  return (
    <Grid>
      <Grid container>
        <Grid xs={10}>
          {<Typography variant="h4">{ancestry.name}</Typography>}
        </Grid>
        <Grid xs={2} justify="flex-end">
          {<Avatar variant="square" />}
        </Grid>
      </Grid>
      <Grid>
        {<Typography variant="body2">{ancestry.description}</Typography>}
      </Grid>
      <Grid>
        {Object.entries(levelUpArray).map((group) => {
          const [LEVEL] = group;

          const talentList = ancestry.talents.filter(
            ({ level }: Talent) => level === parseInt(LEVEL)
          );

          const characteristicsList = ancestry.characteristics.filter(
            ({ level }: Characteristic) => level === parseInt(LEVEL)
          );

          return (
            <ContentAccordion
              header={`Level ${LEVEL} ${ancestry.name}`}
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
