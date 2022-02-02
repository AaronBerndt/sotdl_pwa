import { Button } from "@mui/material";
import React from "react";
import useToggle from "../../../hooks/useToggle";
import { Targets } from "../../CharacterSheetPageTypes";
import useDamageTargets from "../../hooks/useDamageTargets";
import TargetModal from "../../Molecules/TargetModal/TargetModal";
export type Props = {
  rollReason: string;
  damage: any;
};
export default function RollDamageButton({ rollReason, damage }: Props) {
  const { open: targetModalOpen, toggleOpen: toggleTargetModalOpen } =
    useToggle();

  const { mutate: damageRoll } = useDamageTargets();

  return (
    <>
      <Button
        disabled={damage === 0}
        onClick={() => toggleTargetModalOpen()}
        variant="outlined"
        color="secondary"
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
        actionFunction={(targets: Targets, extraProps?: any) =>
          damageRoll({
            targets,
            attackName: rollReason,
            damageRoll: damage,
            ...extraProps,
          })
        }
        targetReason="Choose Targets to damage"
      />
    </>
  );
}
