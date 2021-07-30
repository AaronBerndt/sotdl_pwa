import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ButtonGroup,
  SwipeableDrawer,
  Grid,
  styled,
} from "@material-ui/core";
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
export type Props = {
  spell: Spell;
};

export default function SpellListItem({ spell }: Props): JSX.Element {
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
    () => onCheckBoxChange(spell.name, "remove"),

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
      <ListItem button onClick={() => toggleOpen()}>
        <ListItemText primary={spell.name} />
        <ListItemSecondaryAction>
          {spell.type === "Attack" ? (
            <ButtonGroup>
              <RollAttackButton
                rollReason={spell.name}
                attributeToUse={spell.attribute}
              />
              <RollDamageButton rollReason={spell.name} damage={spell.damage} />
              <Button {...longPressEvent}> {spellcasts}</Button>
            </ButtonGroup>
          ) : (
            "-----"
          )}
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
          <Grid item>{`${spell.tradition} ${spell.level} ${spell.type}`}</Grid>
          <Grid item>{spell.name}</Grid>
          {spell.properties
            .filter((property: Property) =>
              ["Range", "Area", "Duration", "Target"].includes(property.name)
            )
            .map((property: Property, i) => (
              <Grid
                item
                style={{ padding: 20 }}
              >{`${property.name}: ${property.description}`}</Grid>
            ))}

          <Grid item style={{ padding: 20 }}>
            {spell.description}
          </Grid>
          {spell.properties
            .filter(
              (property: Property) =>
                !["Range", "Area", "Duration", "Target"].includes(property.name)
            )
            .map((property: Property, i) => (
              <Grid
                item
                style={{ padding: 20 }}
              >{`${property.name}: ${property.description}`}</Grid>
            ))}
        </Grid>
      </SwipeableDrawer>
    </>
  );
}
