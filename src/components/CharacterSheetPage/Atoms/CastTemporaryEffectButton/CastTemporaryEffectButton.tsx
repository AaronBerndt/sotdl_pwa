import { Button } from "@material-ui/core";
import { find } from "lodash";
import React from "react";
import useToggle from "../../../hooks/useToggle";
import useTemporaryEffectTarget from "../../hooks/useTemporaryEffectTargets";
import TargetModal from "../../Molecules/TargetModal/TargetModal";
export type Props = {
  spell: any;
};
export default function CastTemporaryEffectButton({ spell }: Props) {
  const { open, toggleOpen } = useToggle();
  const { mutate: giveTemporaryEffect } = useTemporaryEffectTarget();
  const { description: duration }: any = find(spell.properties, {
    name: "Duration",
  });

  return (
    <>
      <Button onClick={() => toggleOpen()}>Cast</Button>
      <TargetModal
        open={open}
        toggleOpen={toggleOpen}
        actionFunction={(targets: string[]) =>
          giveTemporaryEffect({
            targets,
            temporaryEffectName: spell.name,
            duration,
          })
        }
        targetReason={`Choose targets to give effect`}
      />
    </>
  );
}
