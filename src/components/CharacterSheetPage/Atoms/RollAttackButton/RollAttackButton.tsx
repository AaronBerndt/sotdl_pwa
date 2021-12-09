import React from "react";
import useLongPress from "../../../hooks/useLongPress";
import useToggle from "../../../hooks/useToggle";
import useAttackTargets from "../../hooks/useAttackTargets";
// import useRollDice from "../../hooks/useRollDice";
import BBModal from "../../Molecules/BBModal/BBModal";
import TargetModal from "../../Molecules/TargetModal/TargetModal";
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
  const {
    open: targetModalOpen,
    toggleOpen: toggleTargetModalOpen,
  } = useToggle();
  // const { rollAttackRoll } = useRollDice();

  const { mutate: attackTargets } = useAttackTargets();
  const longPressEvent = useLongPress(
    () => {
      window.navigator.vibrate(50);
      toggleOpen();
    },
    () => {
      toggleTargetModalOpen();
      // rollAttackRoll(Number(attackRoll), rollReason, Number(totalBB));
    },
    {
      shouldPreventDefault: true,
      delay: 500,
    }
  );

  const isNegative = totalBB.includes("-");

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
          <span style={{ color: isNegative ? "red" : "green" }}>{`${
            !isNegative ? "+" : ""
          }${totalBB}B`}</span>
        )}
      </Button>
      <TargetModal
        open={targetModalOpen}
        toggleOpen={toggleTargetModalOpen}
        actionFunction={attackTargets}
      />
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
