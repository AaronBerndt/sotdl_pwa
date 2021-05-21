import React, { forwardRef } from "react";
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

const Snackbar = forwardRef(({ message }: any, ref: any) => {
  return (
    <SnackbarContent ref={ref}>
      <Card>
        <CardContent>
          <Grid container direction="row" spacing={2}>
            <Grid container item xs={4}>
              <p>{message.rollReason}:</p>
              <RollType name={message.rollType.toLowerCase()}>
                {message.rollType}
              </RollType>
            </Grid>

            <Grid container item xs={6}>
              <p>{`${message.formula}`}</p>
              {message.rollType !== "Damage" && (
                <>
                  {message.baneOrBoon !== "" && message.bbResult !== 0 && (
                    <BoonOrBane baneOrBoon={message.baneOrBoon}>
                      {`${message.baneOrBoon === "boon" ? " + " : " - "}${
                        message.bbResult
                      }`}
                    </BoonOrBane>
                  )}
                </>
              )}

              <p>{`= ${
                message.rollType === "Challenge"
                  ? `${message.total >= 10 ? "Pass" : "Fail"}(${message.total})`
                  : message.total
              }`}</p>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </SnackbarContent>
  );
});

export default Snackbar;
