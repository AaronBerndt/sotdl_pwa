import React, { forwardRef } from "react";
import { useSnackbar, SnackbarContent } from "notistack";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import styled from "styled-components";

const colorObject: any = {
  attack: "#1b9af0",
  damage: "#d54f4f",
  challenge: "#CBC3E3",
  fate: "#FFB302",
};

const RollType: any = styled(Typography)`
  color: ${(props: any) => colorObject[props.name]};
  padding-right: 10px;
`;

const BoonOrBane: any = styled(Typography)`
  color: ${(props: any) =>
    Math.sign(props.totalBB) === 1 ? "#90EE90" : "red"};
`;

const Snackbar = forwardRef(({ message, key }: any, ref: any) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <SnackbarContent ref={ref}>
      <Card onClick={() => closeSnackbar(key)}>
        <CardContent>
          {message.rollType === "Fate" ? (
            <Grid container direction="row" spacing={2}>
              <RollType name={message.rollType.toLowerCase()} variant="body2">
                {message.rollType}
              </RollType>
              <Typography variant="body2">
                {`:${message.total} - ${message.whatHappens}`}
              </Typography>
            </Grid>
          ) : (
            <Grid container direction="row" spacing={2}>
              <Typography variant="body2">{message.rollReason}</Typography>
              <RollType name={message.rollType.toLowerCase()} variant="body2">
                :{message.rollType}
              </RollType>

              <Typography variant="body2">{`${message.formula}`}</Typography>
              {message.rollType !== "Damage" && (
                <>
                  {message.baneOrBoon !== "" && message.bbResult !== 0 && (
                    <BoonOrBane totalBB={message.totalBB} variant="body2">
                      {`${Math.sign(message.totalBB) === 1 ? " + " : " - "}${
                        message.bbResult
                      }`}
                    </BoonOrBane>
                  )}
                </>
              )}

              <Typography variant="body2">
                {`= ${
                  message.rollType === "Challenge"
                    ? `${message.total >= 10 ? "Pass" : "Fail"}(${
                        message.total
                      })`
                    : message.total
                }`}
              </Typography>
            </Grid>
          )}
        </CardContent>
      </Card>
    </SnackbarContent>
  );
});

export default Snackbar;
