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

const BoonOrBane: any = styled.p`
  color: ${(props: any) => (props.baneOrBoon === "boon" ? "green" : "red")};
`;

export default function Snackbar({ message }: any) {
  return (
    <SnackbarContent>
      <Card>
        <CardContent>
          <Grid container item>
            <Grid container>
              <Grid item>
                <p>{message.rollReason}:</p>
              </Grid>
              <Grid item>
                <RollType name={message.rollType.toLowerCase()}>
                  {message.rollType}
                </RollType>
              </Grid>

              <Grid container item direction="row">
                <p>{`${message.formula} `}</p>
                {message.rollType !== "damage" && (
                  <>
                    {message.baneOrBoon !== "" && (
                      <BoonOrBane baneOrBoon={message.baneOrBoon}>
                        {`${message.baneOrBoon === "boon" ? " + " : " - "}${
                          message.bbResult
                        }`}
                      </BoonOrBane>
                    )}
                  </>
                )}
                <p>{`= ${message.total}`}</p>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </SnackbarContent>
  );
}
