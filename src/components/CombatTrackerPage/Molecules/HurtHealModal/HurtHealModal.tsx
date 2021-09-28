import { Button, Card, Dialog, Grid } from "@material-ui/core";
import React from "react";
export type Props = {
  toggleEvent: any;
};
export default function HurtHealModal({ toggleEvent }: Props) {
  const { open, toggleOpen } = toggleEvent;
  return (
    <Dialog open={open} onClose={() => toggleOpen()}>
      <Card>
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
