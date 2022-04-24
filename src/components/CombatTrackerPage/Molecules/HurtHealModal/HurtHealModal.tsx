import { Button, Card, Dialog, Grid, TextField } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { Combatant } from "../../CombatTrackerPageTypes";
export type Props = {
  toggleEvent: any;
  combatant: Combatant;
};

const StyledText: any = styled.p``;
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
            <StyledText>
              {combatant.currentHealth}/{combatant.health}
            </StyledText>
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
