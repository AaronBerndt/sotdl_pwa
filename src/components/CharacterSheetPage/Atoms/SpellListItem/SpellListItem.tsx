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

  const onCheckBoxChange = (e: any, whatToExpend: string) => {
    const action = e.target.checked ? "add" : "remove";
    updateExpendedList({
      whatToExpend,
      action,
    });
  };

  return (
    <>
      <ListItem button onClick={() => toggleOpen()}>
        <ListItemIcon>{`${
          castingObject[spell.level] -
          expended.filter(({ name }: Expend) => name === spell.name).length
        }/${castingObject[spell.level]}`}</ListItemIcon>
        <ListItemText primary={spell.name} />
        <ListItemSecondaryAction>
          {spell.type === "Attack" ? (
            <ButtonGroup>
              <RollAttackButton
                rollReason={spell.name}
                attributeToUse={spell.attribute}
              />
              <RollDamageButton rollReason={spell.name} damage={spell.damage} />
            </ButtonGroup>
          ) : (
            "-----"
          )}

          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button>
            <ListItemText primary={spell.description} />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}
