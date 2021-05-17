import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  ButtonGroup,
  Collapse,
  List,
  IconButton,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, Info } from "@material-ui/icons";
import React from "react";
import useLongPress from "../../../hooks/useLongPress";
import useToggle from "../../../hooks/useToggle";
import { Spell, Expend } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import useUpdateExpendedList from "../../hooks/useUpdateExpendedList";
import createCastingObject from "../../Molecules/SpellsTable/castingObject";
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

  return (
    <>
      <ListItem button {...longPressEvent}>
        <ListItemIcon>{`${Math.max(
          0,
          castingObject[spell.level] -
            expended.filter(({ name }: Expend) => name === spell.name).length
        )}/${castingObject[spell.level]}`}</ListItemIcon>
        <ListItemText primary={spell.name} />
        <ListItemSecondaryAction>
          {spell.type === "Attack" ? (
            <ButtonGroup>
              <RollAttackButton
                rollReason={spell.name}
                attributeToUse={spell.attribute}
              />
              <RollDamageButton rollReason={spell.name} damage={spell.damage} />
              <IconButton onClick={() => toggleOpen()}>
                <Info />
              </IconButton>
            </ButtonGroup>
          ) : (
            <IconButton>
              <Info />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <ListItemText primary={spell.range} />
          </ListItem>

          <ListItem>
            <ListItemText primary={spell.duration} />
          </ListItem>

          <ListItem>
            <ListItemText primary={spell.description} />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}
