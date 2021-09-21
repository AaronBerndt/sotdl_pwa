import { Button, Card, Dialog, Grid } from "@material-ui/core";
import React from "react";
export type Props = {
  toggleEvent: any;
};
export default function HurtHealModal({ toggleEvent }: Props) {
  const { open, toggleOpen } = toggleEvent;
  return (
    <Dialog open={open}>
      <Card>
        <Grid container></Grid>
      </Card>
    </Dialog>
  );
}
