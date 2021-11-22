import React from "react";
import useLongPress from "../../../hooks/useLongPress";
import useToggle from "../../../hooks/useToggle";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import useRollDice from "../../hooks/useRollDice";
import BBModal from "../../Molecules/BBModal/BBModal";
import Button from "../../Shared/CustomButton";
export type Props = {
  rollReason: string;
  attributeToUse: string;
  attackRoll: string;
  totalBB: string;
};

export default function RollAttackButton({
  rollReason,
  attributeToUse,
  attackRoll,
  totalBB,
}: Props) {
  const { open, toggleOpen } = useToggle();
  const { rollAttackRoll } = useRollDice();
  console.log(Number(attackRoll), Math.abs(Number(totalBB)));
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
        <p>
          {`${attackRoll} `}
          {totalBB !== "" && (
            <span style={{ color: isNegative }}>{`${totalBB}B`}</span>
          )}
        </p>
      </Button>
      <BBModal
        rollType="Attack"
        rollReason={rollReason}
        modifier={attackRoll}
        open={open}
        toggleOpen={() => toggleOpen()}
        totalBB={totalBB}
      />
    </>
  );
}
