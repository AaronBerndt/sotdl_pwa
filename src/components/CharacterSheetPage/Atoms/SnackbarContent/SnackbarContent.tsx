import React from "react";
import { useSnackbar, SnackbarContent } from "notistack";
import { Card, CardContent, Grid } from "@material-ui/core";
import styled from "styled-components";

const colorObject: any = {
  attack: "#1b9af0",
  damage: "#d54f4f",
  challenge: "#8359ee",
};

const RollType: any = styled.p`
  color: ${(props: any) => colorObject[props.name]};
`;

export default function Snackbar({ message }: any) {
  return (
    <SnackbarContent>
      <Card>
        <CardContent>
          <Grid container>
            <Grid container>
              <Grid container>
                <Grid item>
                  <p>{message.rollReason}:</p>
                </Grid>
                <Grid item>
                  <RollType name={message.rollType.toLowerCase()}>
                    {message.rollType}
                  </RollType>
                </Grid>
              </Grid>

              <Grid item>{message.formula}</Grid>
            </Grid>
            <Grid>{message.total}</Grid>
          </Grid>
        </CardContent>
      </Card>
    </SnackbarContent>
  );
}
