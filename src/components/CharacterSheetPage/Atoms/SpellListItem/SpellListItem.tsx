import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  ButtonGroup,
  Collapse,
  List,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React from "react";
import useLongPress from "../../../hooks/useLongPress";
import useToggle from "../../../hooks/useToggle";
import { Spell, Expend } from "../../CharacterSheetPageTypes";
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
        <ListItemIcon>{open ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
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
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <ListItemText primary={spell.type} />
          </ListItem>
          <ListItem>
            <ListItemText primary={spell.tradition} />
          </ListItem>
          <ListItem>
            <ListItemText primary={spell.description} />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}
