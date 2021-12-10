import { Button } from "@material-ui/core";
import { find } from "lodash";
import React from "react";
import useToggle from "../../../hooks/useToggle";
import useHealTargets from "../../hooks/useHealTargets";
import TargetModal from "../../Molecules/TargetModal/TargetModal";
export type Props = {
  spell: any;
};
export default function CastHealingButton({ spell }: Props) {
  const { open, toggleOpen } = useToggle();
  const { mutate: healTargets } = useHealTargets();
  const { description: healingFactor }: any = find(spell.properties, {
    name: "HealingFactor",
  });

  return (
    <>
      <Button onClick={() => toggleOpen()}>Cast</Button>
      <TargetModal
        open={open}
        toggleOpen={toggleOpen}
        actionFunction={(targets: string[]) =>
          healTargets({ targets, healingFactor })
        }
        targerReason={`Choose targets to heal`}
      />
    </>
  );
}
