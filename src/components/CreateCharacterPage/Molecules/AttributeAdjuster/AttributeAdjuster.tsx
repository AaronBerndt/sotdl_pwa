import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { find } from "lodash";
import React from "react";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import useAncestries from "../../hooks/useAncestries";
export type Props = {
  label: string;
};

export default function AttributeAdjuster({ label }: Props) {
  const {
    ancestry: selectedAncestry,
    pointsToSpend,
  } = useCharacterBuilderContext();
  const { data: ancestries, isLoading: ancestryLoading } = useAncestries();

  if (ancestryLoading) {
    return <div>Is loading</div>;
  }

  const { characteristics: ancestryCharacteristics } = find(ancestries, {
    name: selectedAncestry,
  });

  const { value: ancestryValue } = find(ancestryCharacteristics, {
    name: label,
  });

  return (
    <Grid container direction="column">
      <Grid item xs={2}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid container item>
        <Grid item xs={8}>
          <TextField variant="outlined" defaultValue="Total Score" disabled />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            defaultValue={ancestryValue}
            type="number"
            disabled
          />
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={8}>
          <TextField variant="outlined" defaultValue="Ancestry" disabled />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            defaultValue={ancestryValue}
            type="number"
            disabled
          />
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={8}>
          <TextField variant="outlined" defaultValue="Level up" disabled />
        </Grid>
        <Grid item xs={4}>
          <Button disabled={pointsToSpend === 0} variant="contained">
            0
          </Button>
        </Grid>
      </Grid>

      <Grid container item>
        <Grid item xs={8}>
          <TextField variant="outlined" defaultValue="Overide" disabled />
        </Grid>
        <Grid item xs={4}>
          <TextField variant="outlined" defaultValue={0} type="number" />
        </Grid>
      </Grid>
    </Grid>
  );
}
