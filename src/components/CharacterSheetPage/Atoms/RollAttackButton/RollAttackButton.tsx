import React from "react";
import useLongPress from "../../../hooks/useLongPress";
import useToggle from "../../../hooks/useToggle";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import useRollDice from "../../hooks/useRollDice";
import BBModal from "../../Molecules/BBModal/BBModal";
import Button from "../../Shared/CustomButton";
export type Props = {
  rollReason: string;
  attackRoll: string;
  totalBB: string;
};

export default function RollAttackButton({
  rollReason,
  attackRoll,
  totalBB,
}: Props) {
  const { open, toggleOpen } = useToggle();
  const { rollAttackRoll } = useRollDice();
  const longPressEvent = useLongPress(
    () => {
      window.navigator.vibrate(50);
      toggleOpen();
    },
    () => rollAttackRoll(Number(attackRoll), rollReason, Number(totalBB)),
    {
      shouldPreventDefault: true,
      delay: 500,
    }
  );

  const isNegative = totalBB.includes("-") ? "red" : "green";

  console.log(totalBB);

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        {...longPressEvent}
        style={{
          color: "white",
        }}
      >
        {`${attackRoll} `}
        {totalBB !== "" && (
          <span style={{ color: isNegative }}>{` ${totalBB}B`}</span>
        )}
      </Button>
      <BBModal
        rollType="Attack"
        rollReason={rollReason}
        modifier={attackRoll}
        open={open}
        toggleOpen={() => toggleOpen()}
        totalBB={Number(totalBB)}
      />
    </>
  );
}
