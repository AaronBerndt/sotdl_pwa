import { Grid, Modal } from "@material-ui/core";
import React from "react";
import { filterAndSum } from "../../../../../utils/arrayUtils";
import useToggle from "../../../../hooks/useToggle";
import {
  Characteristics,
  CharacterState,
} from "../../../CharacterSheetPageTypes";
import HealthWorkspaceButton from "../../HealthWorkpace/HealthWorkspaceButton";

type Props = {
  characteristics: Characteristics;
  characterState: CharacterState;
  onClick: Function;
};

export default function HealthWorkspaceModal({
  characterState,
  characteristics,
}: Props) {
  const { open, toggleOpen } = useToggle();

  const maxHealth = filterAndSum(characteristics, "Health", "name");
  const currentHealth = maxHealth - characterState.damage;

  return (
    <>
      <Modal open={open}>
        <Grid></Grid>
      </Modal>
      <HealthWorkspaceButton
        onClick={toggleOpen}
        maxHealth={maxHealth}
        currentHealth={currentHealth}
      />
    </>
  );
}
