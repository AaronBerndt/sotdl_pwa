import { Button, Grid } from "@material-ui/core";
import React from "react";

type Props = {
  maxHealth: number;
  currentHealth: number;
  onClick: Function;
};

export default function HealthWorkspaceButton({
  maxHealth,
  currentHealth,
  onClick,
}: Props) {
  return (
    <Button variant="contained" color="primary" onClick={() => onClick}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {currentHealth}/{maxHealth}
        </Grid>
        <Grid item xs={12}>
          Health
        </Grid>
      </Grid>
    </Button>
  );
}
