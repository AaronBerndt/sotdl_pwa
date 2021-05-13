import { Button, Dialog, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useGlobalModalContext } from "../../context/GlobalModal";
import useRollDice from "../../hooks/useRollDice";

type Props = {
  rollType: string;
  rollReason: string;
  modifier: any;
};

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
      <Grid>
        <Grid item xs={12}>
          <Button onClick={onBaneButtonClick}>Add Bane</Button>
          {boonAmount >= baneAmount ? boonAmount : baneAmount}
          <Button onClick={onBoonButtonClick}>Add Boon</Button>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth onClick={onRollDiceButtonClick}>
            Roll Dice
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}
