import { Dialog, Card, Grid, Button } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import useRollDice from "../../hooks/useRollDice";
export type Props = {
  rollReason: string;
  damage: string;
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

export default function AddDamageModal({
  open,
  rollReason,
  damage,
  toggleOpen,
}: Props) {
  const [extraDamage, setExtraDamage] = useState(0);
  const [extraDice, setExtraDice] = useState(0);

  const { rollDamageRoll } = useRollDice();

  const onExtraDiceButtonClick = () => {
    setExtraDice((prev) => prev + 1);
  };

  const onExtraDamageButtonClick = () => {
    setExtraDamage((prev) => prev + 1);
  };

  const onClearButtonClick = () => {
    setExtraDamage(0);
    setExtraDice(0);
  };

  const onRollDiceButtonClick = () => {
    toggleOpen();
    rollDamageRoll(rollReason, damage, extraDice, extraDamage);
    setExtraDamage(0);
    setExtraDice(0);
  };

  return (
    <Dialog open={open} onClose={() => toggleOpen()}>
      <Card>
        <Grid container>
          <Grid item xs={6}>
            <Button onClick={onExtraDiceButtonClick}>
              <Div>
                <AttributeValue>{extraDice}</AttributeValue>
                <AttributeFooter>Dice</AttributeFooter>
              </Div>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={onExtraDamageButtonClick}>
              <Div>
                <AttributeValue>{extraDamage}</AttributeValue>
                <AttributeFooter>Damage</AttributeFooter>
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

