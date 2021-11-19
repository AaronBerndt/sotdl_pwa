import {
  ButtonGroup,
  ListItem,
  List,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  SwipeableDrawer,
  Grid,
} from "@material-ui/core";
import React from "react";
import useToggle from "../../../hooks/useToggle";
import RollAttackButton from "../../Atoms/RollAttackButton/RollAttackButton";
import RollDamageButton from "../../Atoms/RollDamageButton/RollDamageButton";
import { Weapon } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";

export default function WeaponTable() {
  const {
    items: { weapons },
  } = useCharacterAttributes();
  const { open, toggleOpen } = useToggle();

  return (
    <List>
      {weapons
        .filter(({ equiped }: any) => equiped)
        .map((weapon, i) => (
          <ListItem key={i}>
            <ListItemText primary={weapon.name} />
            <ListItemSecondaryAction>
              <ButtonGroup>
                <RollAttackButton
                  rollReason={weapon.name}
                  attributeToUse=""
                  attackRoll={weapon.attackRoll ? weapon.attackRoll : ""}
                  totalBB={weapon.totalBB ? weapon.totalBB : ""}
                />
                <RollDamageButton
                  rollReason={weapon.name}
                  damage={weapon.damageRoll}
                />
              </ButtonGroup>
            </ListItemSecondaryAction>
            <SwipeableDrawer
              anchor="left"
              open={open}
              onClose={() => toggleOpen()}
              onOpen={() => toggleOpen()}
              style={{ width: "240" }}
            >
              <Grid
                container
                alignItems="center"
                direction="column"
                style={{ padding: 20 }}
              >
                {weapon.name}
              </Grid>
            </SwipeableDrawer>
          </ListItem>
        ))}
    </List>
  );
}
