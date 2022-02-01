import { Button } from "@mui/material";
import React from "react";
import useToggle from "../../../hooks/useToggle";
import { Targets } from "../../CharacterSheetPageTypes";
import useAttackTargets from "../../hooks/useAttackTargets";
import TargetModal from "../../Molecules/TargetModal/TargetModal";
export type Props = {
  rollReason: string;
  attackRoll: string;
  totalBB: string;
  attributeTarget: string;
};

export default function RollAttackButton({
  rollReason,
  attackRoll,
  totalBB,
  attributeTarget,
}: Props) {
  const { open: targetModalOpen, toggleOpen: toggleTargetModalOpen } =
    useToggle();

  const { mutate: attackTargets } = useAttackTargets();

  const isNegative = totalBB.includes("-");

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => toggleTargetModalOpen()}
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
        totalBB={Number(totalBB)}
        actionFunction={(targets: Targets, extraProps?: any) =>
          attackTargets({
            targets,
            attackName: rollReason,
            attackType: "Attack",
            attributeTarget,
            attackRoll,
            ...extraProps,
          })
        }
        targetReason="Choose Targets to attack"
      />
    </>
  );
}
