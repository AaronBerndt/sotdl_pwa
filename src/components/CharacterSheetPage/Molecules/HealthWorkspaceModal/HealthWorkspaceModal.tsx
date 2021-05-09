import {
  Button,
  Card,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useToggle from "../../../hooks/useToggle";
import { Character } from "../../CharacterSheetPageTypes";
import useOverrideHealth from "../../hooks/useOverrideHealth";
import useUpdateHealth from "../../hooks/useUpdateHealth";
import HealthWorkspaceButton from "../../Atoms/HealthWorkpace/HealthWorkspaceButton";
import styled from "styled-components";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";

type Props = {
  character: Character;
};

const HealButton = styled(Button)`
  background-color: green;
  color: white;
`;

const DamageButton = styled(Button)`
  background-color: red;
  color: white;
`;

export default function HealthWorkspaceModal({ character }: Props) {
  const { open, toggleOpen } = useToggle();
  const { mutate: updateHealth } = useUpdateHealth();
  const { mutate: overrideHealth } = useOverrideHealth();
  const [numberToAdjustBy, setNumberToAdjustBy] = useState(0);

  const { health } = useCharacterAttributes();

  const currentHealth = health - character.characterState.damage;
  const healingRate = Math.floor(health * 0.4);

  return (
    <>
      <Modal open={open} onClose={() => toggleOpen()}>
        <Card>
          <Grid>
            <Typography variant="h3">{`${currentHealth} / ${health}`}</Typography>
            <p>{healingRate}</p>

            <Grid>
              <Grid item xs={3}>
                <HealButton
                  fullWidth
                  disabled={character.characterState.damage === 0}
                  onClick={() =>
                    updateHealth({
                      characterId: character.id,
                      healthChangeAmount: -healingRate,
                    })
                  }
                >
                  Heal
                </HealButton>
              </Grid>

              <Grid item>
                <TextField
                  variant="outlined"
                  defaultValue={0}
                  type="number"
                  onChange={(e) =>
                    e.target.value === ""
                      ? setNumberToAdjustBy(0)
                      : setNumberToAdjustBy(parseInt(e.target.value))
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <DamageButton
                  fullWidth
                  disabled={health === character.characterState.damage}
                  onClick={() =>
                    updateHealth({
                      characterId: character.id,
                      healthChangeAmount: numberToAdjustBy,
                    })
                  }
                >
                  Damage
                </DamageButton>
              </Grid>
              {health === character.characterState.damage && (
                <Button>Fate role</Button>
              )}
              <Button
                onClick={() =>
                  overrideHealth({
                    characterId: character.id,
                    healthOveride: numberToAdjustBy,
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
        currentHealth={currentHealth}
      />
    </>
  );
}
