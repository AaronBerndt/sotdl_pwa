import { Button, Grid, Modal } from "@material-ui/core";
import React from "react";
import { filterAndSum } from "../../../../../utils/arrayUtils";
import useToggle from "../../../../hooks/useToggle";
import {
  Characteristics,
  CharacterState,
} from "../../../CharacterSheetPageTypes";
import useUpdateHealth from "../../../hooks/useUpdateHealth";
import HealthWorkspaceButton from "../../HealthWorkpace/HealthWorkspaceButton";

type Props = {
  characteristics: Characteristics;
  characterState: CharacterState;
};

export default function HealthWorkspaceModal({
  characterState,
  characteristics,
}: Props) {
  const { open, toggleOpen } = useToggle();

  const maxHealth = filterAndSum(characteristics, "Health", "name");
  const currentHealth = maxHealth - characterState.damage;
  const healingRate = maxHealth;

  const { mutate: updateHealth } = useUpdateHealth();

  return (
    <>
      <Modal open={open}>
        <Grid>
          <p>{currentHealth}</p>
          <p>{maxHealth}</p>
          <p>{healingRate}</p>

          <Button>Heal</Button>
          <Button>Damage</Button>
        </Grid>
      </Modal>
      <HealthWorkspaceButton
        onClick={toggleOpen}
        maxHealth={maxHealth}
        currentHealth={currentHealth}
      />
    </>
  );
}
