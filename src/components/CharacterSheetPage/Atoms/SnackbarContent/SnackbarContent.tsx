import React, { forwardRef } from "react";
import { useSnackbar, SnackbarContent } from "notistack";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import styled from "styled-components";

const colorObject: any = {
  attack: "#1b9af0",
  attacked: "#1b9af0",
  damaged: "#d54f4f",
  damage: "#d54f4f",
  challenge: "#CBC3E3",
  fate: "#FFB302",
  heal: "#90EE90",
  healed: "#90EE90",
  effected: "#90EE90",
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
          ) : message.rollType === "Damaged" ? (
            <Grid container direction="row" spacing={2}>
              <RollType name={message.rollType.toLowerCase()} variant="body2">
                {message.rollType}
              </RollType>

              <Typography variant="body2">
                {message.attacker} delt {message.damageResult} damage with{" "}
                {message.attackName}
              </Typography>
            </Grid>
          ) : message.rollType === "Effected" ? (
            <Grid container direction="row" spacing={2}>
              <RollType name={message.rollType.toLowerCase()} variant="body2">
                {message.rollType}
              </RollType>

              <Typography variant="body2">
                {message.temporaryEffectGiver} granted you{" "}
                {message.temporaryEffectAdd}
              </Typography>
            </Grid>
          ) : message.rollType === "Healed" ? (
            <Grid container direction="row" spacing={2}>
              <RollType name={message.rollType.toLowerCase()} variant="body2">
                {message.rollType}
              </RollType>
              <Typography variant="body2">
                {message.healer} healed you {message.healedAmount}
              </Typography>
            </Grid>
          ) : message.rollType === "Attacked" ? (
            <Grid container direction="row" spacing={2}>
              <RollType name={message.rollType.toLowerCase()} variant="body2">
                {message.rollType}
              </RollType>
              <Typography variant="body2">
                {message.attacker} {message.attackResult}(
                {message.attackDiceResult}) with {message.attackName}
              </Typography>
            </Grid>
          ) : message.rollType === "Heal" ? (
            <Grid container direction="row" spacing={2}>
              <Typography variant="body2">{message.rollReason}</Typography>
              <RollType name={message.rollType.toLowerCase()} variant="body2">
                :{message.rollType}
              </RollType>

              <RollType name={message.rollType.toLowerCase()} variant="body2">
                {message.total}
              </RollType>
            </Grid>
          ) : message.rollType === "Attack" ? (
            <Grid>
              <Grid container direction="row" xs={12}>
                <Typography variant="body2">{message.rollReason}</Typography>
                <RollType name={message.rollType.toLowerCase()} variant="body2">
                  :{message.rollType}
                </RollType>
              </Grid>

              <Grid container direction="row" xs={12}>
                <Grid item xs={2}>
                  <Typography variant="body2">{`${message.d20Result}`}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2">{`${
                    Math.sign(message.modifier) === 1 ? "+" : ""
                  } ${message.modifier} `}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <BoonOrBane totalBB={message.bbResult} variant="body2">{`${
                    Math.sign(message.bbResult) === 1 ? " +" : " -"
                  } ${Math.abs(message.bbResult)}`}</BoonOrBane>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2">{`= ${message.total}`}</Typography>
                </Grid>
              </Grid>

              <Typography variant="body2">
                {message.targets.map((target: any) => (
                  <p>{`${target.name}: ${target.attackResult}`}</p>
                ))}
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
