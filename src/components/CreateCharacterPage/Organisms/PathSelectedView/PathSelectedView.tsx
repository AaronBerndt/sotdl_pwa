import {
  Grid,
  MenuItem,
  NativeSelect,
  Select,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";

export default function PathSelectedView() {
  const {
    level: selectedLevel,
    setLevel,
    novicePath,
    expertPath,
    masterPath,
  } = useCharacterBuilderContext();

  return (
    <Grid>
      <Grid xs={10}>
        {
          <NativeSelect onChange={() => {}}>
            {[...Array(11).keys()].map((number) => (
              <MenuItem value={number}>{number}</MenuItem>
            ))}
          </NativeSelect>
        }
      </Grid>
      <Grid xs={10}>{<Typography variant="h4">{novicePath}</Typography>}</Grid>
    </Grid>
  );
}
