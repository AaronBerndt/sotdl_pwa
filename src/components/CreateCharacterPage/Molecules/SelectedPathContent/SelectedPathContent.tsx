import { Grid, Typography } from "@material-ui/core";
import { groupBy } from "lodash";
import React from "react";
import { sumArray } from "../../../../utils/arrayUtils";
import {
  Characteristic,
  Talent,
} from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import { Path } from "../../CreateCharacterSheetPageTypes";
import usePaths from "../../hooks/usePaths";
export type Props = {
  pathName: string;
};
export default function SelectedPathContent({ pathName }: Props) {
  const { data: paths, isLoading } = usePaths();
  const { level: selectedLevel } = useCharacterBuilderContext();

  if (isLoading) {
    return <p>Is Loading</p>;
  }

  const [path] = paths.filter(({ name }: Path) => name === pathName);

  const talents = path.talents.filter(
    ({ level }: Talent) => level <= selectedLevel
  );

  const characteristicsList = groupBy(
    path.characteristics.filter(
      ({ level }: Characteristic) => level <= selectedLevel
    ),
    "name"
  );

  return (
    <Grid>
      <Grid xs={10}>{<Typography variant="h4">{path.name}</Typography>}</Grid>

      <Typography variant="h6">Characteristics</Typography>
      {Object.entries(characteristicsList).map((entry) => {
        const [NAME, VALUES] = entry;

        const characteristicsValues = VALUES.map(({ value }: any) => value);

        return (
          <Typography>{`${NAME}: +${sumArray(
            characteristicsValues
          )}`}</Typography>
        );
      })}

      <Typography variant="h6">Talents</Typography>
    </Grid>
  );
}
