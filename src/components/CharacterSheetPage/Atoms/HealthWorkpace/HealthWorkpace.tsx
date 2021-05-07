import { Button, Grid } from "@material-ui/core";
import React from "react";
import { filterAndSum } from "../../../../utils/arrayUtils";
import { Characteristics, CharacterState } from "../../CharacterSheetPageTypes";

type Props = {
  characteristics: Characteristics;
  characterState: CharacterState;
};

export default function HealthWorkspace({
  characteristics,
  characterState,
}: Props) {
  const maxHealth = filterAndSum(characteristics, "Health", "name");
  const currentHealth = maxHealth - characterState.currentDamage;

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        console.log("hello");
      }}
    >
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
