import {
  Button as MuiButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ButtonGroup,
  SwipeableDrawer,
  Grid,
} from "@mui/material";
import React from "react";
import useLongPress from "../../../hooks/useLongPress";
import useToggle from "../../../hooks/useToggle";
import { Spell, Expend, Property } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import useUpdateExpendedList from "../../hooks/useUpdateExpendedList";
import createCastingObject from "../../Molecules/SpellsTable/castingObject";
import Button from "../../Shared/CustomButton";
import RollAttackButton from "../RollAttackButton/RollAttackButton";
import RollDamageButton from "../RollDamageButton/RollDamageButton";
import ReactMarkdown from "react-markdown";
import { find } from "lodash";
import CastHealingButton from "../CastHealingButton/CastHealingButton";
import CastChallengeButton from "../CastChallengeButton/CastChallengeButton";
import CastTemporaryEffectButton from "../CastTemporaryEffectButton/CastTemporaryEffectButton";
export type Props = {
  spell: Spell;
  style: any;
};

export default function SpellListItem({ spell, style }: Props): JSX.Element {
  const { open, toggleOpen } = useToggle();
  const { expended, power } = useCharacterAttributes();

  const castingObject = createCastingObject(power);

  const { mutate: updateExpendedList } = useUpdateExpendedList();

  const onCheckBoxChange = (whatToExpend: string, action: "add" | "remove") => {
    updateExpendedList({
      whatToExpend,
      action,
    });
  };

  const longPressEvent = useLongPress(
    () => {
      window.navigator.vibrate(50);
      onCheckBoxChange(spell.name, "remove");
    },

    () => onCheckBoxChange(spell.name, "add"),
    {
      shouldPreventDefault: true,
      delay: 500,
    }
  );

  const spellcasts = `
                ${Math.max(
                  0,
                  castingObject[spell.level] -
                    expended.filter(({ name }: Expend) => name === spell.name)
                      .length
                )}
                /${castingObject[spell.level]}`;

  return (
    <>
      <ListItem button onClick={() => toggleOpen()} style={style}>
        <ListItemText primary={spell.name} />
        <ListItemSecondaryAction>
          <ButtonGroup>
            {find(spell.properties, { name: "HealingFactor" }) ? (
              <CastHealingButton spell={spell} />
            ) : find(spell.properties, { name: "TemporaryEffect" }) ? (
              <CastTemporaryEffectButton spell={spell} />
            ) : find(spell.properties, { name: "Challenge" }) ? (
              <CastChallengeButton spell={spell} />
            ) : spell.description.includes("attack roll") ? (
              <RollAttackButton
                rollReason={spell.name}
                attackRoll={spell.attackRoll ? spell.attackRoll : ""}
                totalBB={spell.totalBB ? `${spell.totalBB}` : ""}
                attributeTarget="Defense"
              />
            ) : (
              <MuiButton disabled size="large">
                ----
              </MuiButton>
            )}

            {spell.damageRoll !== "null" ? (
              <RollDamageButton
                rollReason={spell.name}
                damage={spell.damageRoll}
              />
            ) : (
              <MuiButton disabled size="large">
                ----
              </MuiButton>
            )}
            <Button {...longPressEvent}> {spellcasts}</Button>
          </ButtonGroup>
        </ListItemSecondaryAction>
      </ListItem>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={() => toggleOpen()}
        onOpen={() => toggleOpen()}
        style={{ width: "240" }}
      >
        <Grid container alignItems="center" direction="column">
          <Grid item>{spell.name}</Grid>
          <Grid item>{`${spell.tradition} ${spell.level} ${spell.type}`}</Grid>
          {spell.properties
            .filter((property: Property) =>
              ["Range", "Area", "Duration", "Target"].includes(property.name)
            )
            .map((property: Property, i: number) => (
              <Grid
                key={i}
                item
                style={{ padding: 20 }}
              >{`${property.name}: ${property.description}`}</Grid>
            ))}

          <Grid item style={{ padding: 20 }}>
            <ReactMarkdown children={spell.description} />
          </Grid>
          {spell.properties
            .filter(
              (property: Property) =>
                !["Range", "Area", "Duration", "Target"].includes(property.name)
            )
            .map((property: Property, i: number) => (
              <Grid
                key={i}
                item
                style={{ padding: 20 }}
              >{`${property.name}: ${property.description}`}</Grid>
            ))}
        </Grid>
      </SwipeableDrawer>
    </>
  );
}

