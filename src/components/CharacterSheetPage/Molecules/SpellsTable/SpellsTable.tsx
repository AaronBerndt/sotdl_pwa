import {
  ButtonGroup,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import RollAttackButton from "../../Atoms/RollAttackButton/RollAttackButton";
import RollDamageButton from "../../Atoms/RollDamageButton/RollDamageButton";
import { Expend, Spell } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import useUpdateExpendedList from "../../hooks/useUpdateExpendedList";
import createCastingObject from "./castingObject";

export default function SpellsTable() {
  const { spells, expended, power } = useCharacterAttributes();

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
    <Table>
      <TableHead>
        <TableRow>
          {["Name", "Type", "Attack/Damage", "Casting"].map((header, i) => (
            <TableCell key={i}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {spells.map((spell: Spell, i) => (
          <TableRow key={i}>
            <TableCell>{spell.name}</TableCell>
            <TableCell>{spell.type}</TableCell>
            <TableCell>
              {spell.type === "Attack" ? (
                <ButtonGroup>
                  <RollAttackButton
                    rollReason={spell.name}
                    attributeToUse={spell.attribute}
                  />
                  <RollDamageButton
                    rollReason={spell.name}
                    damage={spell.damage ? spell.damage : ""}
                  />
                </ButtonGroup>
              ) : (
                "----"
              )}
            </TableCell>
            <TableCell>
              {[...Array(castingObject[spell.level])].map((_, i) => {
                const isExpendArray = expended.filter(
                  ({ name }: Expend) => name === spell.name
                );

                return (
                  <Checkbox
                    key={i}
                    checked={isExpendArray[i] !== undefined}
                    onChange={(e) => onCheckBoxChange(e, spell.name)}
                  />
                );
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
