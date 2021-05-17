import { lengthIsZero } from "../../utils/logic";
import { Armor, Character, Talent } from "./CharacterSheetPageTypes";

export default function createConditinalList(character: Character) {
  const createConditinalObject = (
    name: string,
    whatToEdit: string,
    value: number,
    condition: Function
  ) => ({
    name,
    whatToEdit,
    value,
    condition,
  });

  const conditionals = [
    createConditinalObject(
      "Iron Hide",
      "Defense",
      1,
      (character: Character) => {
        const equipedArmorList = character.items.armor.filter(
          ({ equiped, type }: Armor) => equiped
        );

        const armorIsLight = equipedArmorList.filter(
          ({ type }: Armor) => type === "light"
        );

        return lengthIsZero(equipedArmorList) || armorIsLight.length !== 0;
      }
    ),
  ];

  return conditionals
    .filter(({ name }) =>
      character.talents.map(({ name }: Talent) => name).includes(name)
    )
    .filter((conditional) => {
      const conditionIsMet = conditional.condition(character);
      return conditionIsMet === true;
    })
    .map(({ whatToEdit, value }) => ({ name: whatToEdit, value }));
}
