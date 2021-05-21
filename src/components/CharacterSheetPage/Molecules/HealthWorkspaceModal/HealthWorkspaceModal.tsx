import {
  Button,
  ButtonGroup,
  Card,
  Dialog,
  Grid,
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
  const healingRate = Math.floor(health / 4);

  return (
    <>
      <Dialog open={open} onClose={() => toggleOpen()}>
        <Card>
          <Grid>
            <Typography variant="h3">{`${currentHealth} / ${health}`}</Typography>

            {currentHealth === 0 ? (
              <Grid xs="auto">
                <Button
                  fullWidth
                  onChange={() => {
                    //Fate Roll
                  }}
                >
                  Fate Roll
                </Button>
              </Grid>
            ) : null}

            <Grid>
              <Grid item xs="auto">
                <ButtonGroup color="primary">
                  {[0.5, 1, "full"].map((healingFactor: any, i) => (
                    <HealButton
                      disabled={character.characterState.damage === 0}
                      onClick={() =>
                        updateHealth({
                          characterId: character.id,
                          healthChangeAmount: -(healingFactor === "full"
                            ? health
                            : Math.floor(healingRate * healingFactor)),
                        })
                      }
                      key={i}
                    >
                      Heal{" "}
                      {healingFactor === "full"
                        ? "Full"
                        : Math.floor(healingRate * healingFactor)}
                    </HealButton>
                  ))}
                </ButtonGroup>
              </Grid>

              <Grid item xs={12}>
                <ButtonGroup>
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
                  <DamageButton
                    fullWidth
                    disabled={
                      health === character.characterState.damage ||
                      numberToAdjustBy === 0
                    }
                    onClick={() =>
                      updateHealth({
                        characterId: character.id,
                        healthChangeAmount: numberToAdjustBy,
                      })
                    }
                  >
                    Damage
                  </DamageButton>
                  <Button
                    disabled={numberToAdjustBy === 0}
                    onClick={() =>
                      overrideHealth({
                        characterId: character.id,
                        healthOveride: numberToAdjustBy,
                      })
                    }
                  >
                    Override Health
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Dialog>
      <HealthWorkspaceButton
        onClick={toggleOpen}
        currentHealth={currentHealth}
      />
    </>
  );
}
