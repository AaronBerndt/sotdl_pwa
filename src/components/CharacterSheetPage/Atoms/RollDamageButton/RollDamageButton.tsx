import React from "react";
import useLongPress from "../../../hooks/useLongPress";
import useToggle from "../../../hooks/useToggle";
import { Targets } from "../../CharacterSheetPageTypes";
import useDamageTargets from "../../hooks/useDamageTargets";
import AddDamageModal from "../../Molecules/AddDamageModal/AddDamageModal";
import TargetModal from "../../Molecules/TargetModal/TargetModal";
import Button from "../../Shared/CustomButton";
export type Props = {
  rollReason: string;
  damage: any;
};
export default function RollDamageButton({ rollReason, damage }: Props) {
  const { open, toggleOpen } = useToggle();
  const { open: targetModalOpen, toggleOpen: toggleTargetModalOpen } =
    useToggle();

  const { mutate: damageRoll } = useDamageTargets();
  const longPressEvent = useLongPress(
    () => {
      window.navigator.vibrate(50);
      toggleOpen();
    },
    () => toggleTargetModalOpen(),
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
        actionFunction={(targets: Targets) =>
          damageRoll({
            targets,
            attackName: rollReason,
            damageRoll: damage,
          })
        }
        targerReason="Choose Targets to damage"
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
