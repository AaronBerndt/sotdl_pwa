import { Avatar, Grid, Typography } from "@material-ui/core";
import React from "react";
import {
  Characteristic,
  Talent,
} from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import ContentAccordion from "../../Atoms/ContentAccordion/ContentAccordion";
import useAncestries from "../../hooks/useAncestries";
import { find } from "lodash";
export type Props = {
  ancestryName: string;
};
export default function AncestryContent({ ancestryName }: Props) {
  const { data: ancestries } = useAncestries();

  const ancestry = find(ancestries, { name: ancestryName });

  const startinCharacteristic = ancestry.characteristics.filter(
    ({ level }: Characteristic) => level === 0
  );

  const levelUpCharacteristic = ancestry.characteristics.filter(
    ({ level }: Characteristic) => level !== 0
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
      <Grid>{<Typography variant="h4">Characteristics</Typography>}</Grid>
      <Grid>
        {startinCharacteristic.map((characteristic: Characteristic) => (
          <Grid item>
            <Typography variant="body2">{`${characteristic.name}:${characteristic.value}`}</Typography>
          </Grid>
        ))}
        {levelUpCharacteristic.map((characteristic: Characteristic) => (
          <Grid item>
            <Typography variant="body2">{`${characteristic.name}:${characteristic.value} level: ${characteristic.level}`}</Typography>
          </Grid>
        ))}

        <Grid>{<Typography variant="h4">Talents</Typography>}</Grid>
        <Grid>
          {ancestry.talents.map((talent: Talent) => (
            <Grid item>
              <ContentAccordion
                header={talent.name}
                secondaryHeading={`${talent.level}`}
                details={talent.description}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
