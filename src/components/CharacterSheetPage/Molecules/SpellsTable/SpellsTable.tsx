import {
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import RollAttackButton from "../../Atoms/RollAttackButton/RollAttackButton";
import RollDamageButton from "../../Atoms/RollDamageButton/RollDamageButton";
import { Spell } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import castingObject from "./castingObject";

export default function SpellsTable() {
  const { spells, expended, power } = useCharacterAttributes();

  const { [power]: castings } = castingObject;

  console.log(castings);
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
