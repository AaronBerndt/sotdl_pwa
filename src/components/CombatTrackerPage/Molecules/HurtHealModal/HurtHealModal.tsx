import { Button, Card, Dialog, Grid, TextField } from "@material-ui/core";
import React from "react";
import { Combatant } from "../../CombatTrackerPageTypes";
export type Props = {
  toggleEvent: any;
  combatant: Combatant;
};
export default function HurtHealModal({ toggleEvent, combatant }: Props) {
  const { open, toggleOpen } = toggleEvent;
  return (
    <Dialog open={open} onClose={() => toggleOpen()}>
      <Card>
        <Grid container>
          <Grid item xs={6}>
            <p>{combatant.name}</p>
          </Grid>
          <Grid item xs={6}>
            <p>
              {combatant.currentHealth}/{combatant.maxHealth}
            </p>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField />
        </Grid>

        <Grid container>
          <Grid item xs={6}>
            <Button>Damage</Button>
          </Grid>
          <Grid item xs={6}>
            <Button>Heal</Button>
          </Grid>
        </Grid>
      </Card>
    </Dialog>
  );
}
