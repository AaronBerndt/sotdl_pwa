import { Button, Card, Grid, Modal } from "@material-ui/core";
import React from "react";
import { filterAndSum } from "../../../../../utils/arrayUtils";
import useToggle from "../../../../hooks/useToggle";
import { Character } from "../../../CharacterSheetPageTypes";
import useUpdateHealth from "../../../hooks/useUpdateHealth";
import HealthWorkspaceButton from "../../HealthWorkpace/HealthWorkspaceButton";

type Props = {
  character: Character;
};

export default function HealthWorkspaceModal({ character }: Props) {
  const { open, toggleOpen } = useToggle();

  const maxHealth = filterAndSum(character?.characteristics, "Health", "name");
  const currentHealth = maxHealth - character.characterState.damage;
  const healingRate = Math.floor(maxHealth * 0.4);

  const { mutate: updateHealth } = useUpdateHealth();

  return (
    <>
      <Modal open={open} onClose={() => toggleOpen()}>
        <Card>
          <Grid>
            <p>{currentHealth}</p>
            <p>{maxHealth}</p>
            <p>{healingRate}</p>

            <Grid>
              <Button
                disabled={character.characterState.damage === 0}
                onClick={() =>
                  updateHealth({
                    characterId: character.id,
                    healthChangeAmount: -healingRate,
                    maxHealth,
                  })
                }
              >
                Heal
              </Button>
              <Button
                disabled={maxHealth === character.characterState.damage}
                onClick={() =>
                  updateHealth({
                    characterId: character.id,
                    healthChangeAmount: 10,
                    maxHealth,
                  })
                }
              >
                Damage
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Modal>
      <HealthWorkspaceButton
        onClick={toggleOpen}
        maxHealth={maxHealth}
        currentHealth={currentHealth}
      />
    </>
  );
}
