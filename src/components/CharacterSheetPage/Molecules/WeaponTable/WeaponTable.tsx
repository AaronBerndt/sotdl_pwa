import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ButtonGroup,
} from "@material-ui/core";
import React from "react";
import RollAttackButton from "../../Atoms/RollAttackButton/RollAttackButton";
import RollDamageButton from "../../Atoms/RollDamageButton/RollDamageButton";
import { Weapon } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";

export default function WeaponTable() {
  const {
    items: { weapons },
  } = useCharacterAttributes();

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {["Name", "Attack/Damage", "Properties"].map((header, i) => (
            <TableCell key={i}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {weapons
          .filter(({ equiped }: Weapon) => equiped)
          .map((weapon: Weapon, i) => {
            const attributeToUse = weapon.properties.includes(
              "Range" || "Finesse"
            )
              ? "Agility"
              : "Strength";
            return (
              <TableRow key={i}>
                <TableCell>{weapon.name}</TableCell>
                <TableCell>
                  <ButtonGroup>
                    <RollAttackButton
                      rollReason={weapon.name}
                      attributeToUse={attributeToUse}
                    />
                    <RollDamageButton
                      rollReason={weapon.name}
                      damage={weapon.damage}
                    />
                  </ButtonGroup>
                </TableCell>

                <TableCell>{weapon.properties.join(",")}</TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
