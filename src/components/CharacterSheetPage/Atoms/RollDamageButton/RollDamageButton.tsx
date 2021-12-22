import React from "react";
import useLongPress from "../../../hooks/useLongPress";
import useToggle from "../../../hooks/useToggle";
import useDamageTargets from "../../hooks/useDamageTargets";
import useRollDice from "../../hooks/useRollDice";
import AddDamageModal from "../../Molecules/AddDamageModal/AddDamageModal";
import TargetModal from "../../Molecules/TargetModal/TargetModal";
import Button from "../../Shared/CustomButton";
export type Props = {
  rollReason: string;
  damage: any;
};
export default function RollDamageButton({ rollReason, damage }: Props) {
  const { open, toggleOpen } = useToggle();
  const { rollDamageRoll } = useRollDice();
  const { open: targetModalOpen, toggleOpen: toggleTargetModalOpen } =
    useToggle();

  const { mutate: damageRoll } = useDamageTargets();
  const longPressEvent = useLongPress(
    () => {
      window.navigator.vibrate(50);
      toggleOpen();
    },
    () => rollDamageRoll(rollReason, damage, 0, 0),
    {
      shouldPreventDefault: true,
      delay: 500,
    }
  );

  return (
    <>
      <Button
        disabled={damage === 0}
        variant="outlined"
        color="secondary"
        {...longPressEvent}
        style={{
          color: "white",
          fontSize: "10.5px",
        }}
      >
        {damage}
      </Button>
      <TargetModal
        open={targetModalOpen}
        toggleOpen={toggleTargetModalOpen}
        actionFunction={(targets: string[]) =>
          damageRoll({
            targets,
            attackName: rollReason,
            damageRoll: damage,
          })
        }
        targerReason="Choose Targets to attack"
      />

      <AddDamageModal
        open={open}
        rollReason={rollReason}
        damage={damage}
        toggleOpen={toggleOpen}
      />
    </>
  );
}
