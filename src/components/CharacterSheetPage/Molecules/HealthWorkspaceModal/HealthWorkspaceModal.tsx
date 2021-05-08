import { Button, Card, Grid, Modal, Typography } from "@material-ui/core";
import React from "react";
import { filterAndSum } from "../../../../../utils/arrayUtils";
import useToggle from "../../../../hooks/useToggle";
import { Character } from "../../../CharacterSheetPageTypes";
import useOverrideHealth from "../../../hooks/useOverrideHealth";
import useUpdateHealth from "../../../hooks/useUpdateHealth";
import HealthWorkspaceButton from "../../HealthWorkpace/HealthWorkspaceButton";

type Props = {
  character: Character;
};

export default function HealthWorkspaceModal({ character }: Props) {
  const { open, toggleOpen } = useToggle();

  const maxHealth = filterAndSum(
    [...character?.characteristics, ...character.characterState.override],
    "Health",
    "name"
  );
  const currentHealth = maxHealth - character.characterState.damage;
  const healingRate = Math.floor(maxHealth * 0.4);

  const { mutate: updateHealth } = useUpdateHealth();
  const { mutate: overrideHealth } = useOverrideHealth();

  return (
    <>
      <Modal open={open} onClose={() => toggleOpen()}>
        <Card>
          <Grid>
            <Typography variant="h3">{`${currentHealth} / ${maxHealth}`}</Typography>
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

              {maxHealth === character.characterState.damage && (
                <Button
                  onClick={() =>
                    overrideHealth({
                      characterId: character.id,
                      healthOveride: 10,
                    })
                  }
                >
                  Fate role
                </Button>
              )}
              <Button
                onClick={() =>
                  overrideHealth({
                    characterId: character.id,
                    healthOveride: 10,
                  })
                }
              >
                Override Health
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
