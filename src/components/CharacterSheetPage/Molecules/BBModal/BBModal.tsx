import { Button, Card, Dialog as MuiDialog, Grid } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import useRollDice from "../../hooks/useRollDice";

type Props = {
  rollType: string;
  rollReason: string;
  modifier: any;
  open: boolean;
  toggleOpen: Function;
};

const Div = styled.div`
  position: relative;
  cursor: pointer;
  text-align: center;
  margin-right: 10px;
`;

const AttributeValue = styled.div`
  font-size: 26px;
  font-weight: 500;
  line-height: 27px;
`;
const AttributeFooter = styled(AttributeValue)`
  font-size: 12px;
`;

const Dialog = styled(MuiDialog)`
  root: {
    backgroundcolor: transparent;
  }
`;

export default function BBModal({
  rollType,
  rollReason,
  modifier,
  open,
  toggleOpen,
}: Props) {
  const [boonAmount, setBoonAmount] = useState(0);
  const [baneAmount, setBaneAmount] = useState(0);

  const { rollChallengeRoll, rollAttackRoll } = useRollDice();

  const onBaneButtonClick = () => {
    setBaneAmount((prev) => prev + 1);
    setBoonAmount(0);
  };

  const onBoonButtonClick = () => {
    setBoonAmount((prev) => prev + 1);
    setBaneAmount(0);
  };

  const onClearButtonClick = () => {
    setBoonAmount(0);
    setBaneAmount(0);
  };

  const onRollDiceButtonClick = () => {
    toggleOpen();
    rollType === "Challenge"
      ? rollChallengeRoll(
          modifier,
          rollReason,
          rollType,
          baneAmount,
          boonAmount
        )
      : rollAttackRoll();

    setBaneAmount(0);
    setBoonAmount(0);
  };

  return (
    <Dialog open={open}>
      <Card>
        <Grid container>
          <Grid item xs={6}>
            <Button onClick={onBaneButtonClick}>
              <Div>
                <AttributeValue>{baneAmount}</AttributeValue>
                <AttributeFooter>Bane</AttributeFooter>
              </Div>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={onBoonButtonClick}>
              <Div>
                <AttributeValue>{boonAmount}</AttributeValue>
                <AttributeFooter>Boon</AttributeFooter>
              </Div>
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth onClick={onClearButtonClick}>
            Clear
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button fullWidth onClick={onRollDiceButtonClick}>
            Roll Dice
          </Button>
        </Grid>
      </Card>
    </Dialog>
  );
}
