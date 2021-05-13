import { Button, Dialog, Grid } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalModalContext } from "../../context/GlobalModal";
import useRollDice from "../../hooks/useRollDice";

type Props = {
  rollType: string;
  rollReason: string;
  modifier: any;
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
const AttributeFooter = styled.div`
  font-size: 12px;
`;

export default function BBModal({ rollType, rollReason, modifier }: Props) {
  const { bbBoxOpen, bbBoxToggleOpen } = useGlobalModalContext();
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
    bbBoxToggleOpen();
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
    <Dialog open={bbBoxOpen}>
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
    </Dialog>
  );
}
