import { Button } from "@material-ui/core";
import React from "react";
import useToggle from "../../../hooks/useToggle";
import { Spell } from "../../CharacterSheetPageTypes";
import useAttackTargets from "../../hooks/useAttackTargets";
import TargetModal from "../../Molecules/TargetModal/TargetModal";
export type Props = {
  spell: Spell;
};
export default function CastChallengeButton({ spell }: Props) {
  const { open, toggleOpen } = useToggle();
  const { mutate: attackTargets } = useAttackTargets();

  return (
    <>
      <Button onClick={() => toggleOpen()}>Cast</Button>
      <TargetModal
        open={open}
        toggleOpen={toggleOpen}
        actionFunction={(targets: string[]) =>
          attackTargets({
            targets,
            attackType: "Challenge",
            attackRoll: 0,
            attributeTarget: "Agility",
          })
        }
      />
    </>
  );
}
