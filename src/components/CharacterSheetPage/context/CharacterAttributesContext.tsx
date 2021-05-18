import { createContext, useContext } from "react";
import { filterAndSumValue } from "../../../utils/arrayUtils";
import { lengthIsZero } from "../../../utils/logic";
import {
  Armor,
  CurrentAffliction,
  Expend,
  Items,
  Spells,
  Talents,
  Weapon,
} from "../CharacterSheetPageTypes";
import createConditinalList from "../conditional";

type CharacterAttributes = {
  id: number;
  strength: number;
  health: number;
  agility: number;
  will: number;
  intellect: number;
  defense: number;
  speed: number;
  corruption: number;
  power: number;
  insanity: number;
  perception: number;
  talents: Talents;
  spells: Spells;
  items: Items;
  afflictions: CurrentAffliction[];
  expended: Expend[];
  [key: string]: any;
};

const CharacterAttributesContext = createContext<CharacterAttributes>({
  id: 0,
  strength: 0,
  health: 0,
  agility: 0,
  will: 0,
  intellect: 0,
  defense: 0,
  corruption: 0,
  speed: 0,
  power: 0,
  insanity: 0,
  perception: 0,
  talents: [],
  spells: [],
  afflictions: [],
  expended: [],
  items: {
    weapons: [],
    armor: [],
    otherItems: [],
    currency: {
      bits: 0,
      copper: 0,
      silver: 0,
      gold: 0,
    },
  },
});

export function CharacterAttributesProvider({ children, character }: any) {
  const conditionalList = createConditinalList(character);
  console.log(conditionalList);
  const health = filterAndSumValue(
    [...character?.characteristics, ...character.characterState.override],
    "Health",
    "name"
  );
  const strength = filterAndSumValue(
    [...character?.characteristics, ...character.characterState.override],
    "Strength",
    "name"
  );
  const agility = filterAndSumValue(
    [...character?.characteristics, ...character.characterState.override],
    "Agility",
    "name"
  );

  const will = filterAndSumValue(
    [...character?.characteristics, ...character.characterState.override],
    "Will",
    "name"
  );

  const intellect = filterAndSumValue(
    [...character?.characteristics, ...character.characterState.override],
    "Intellect",
    "name"
  );

  let defense = filterAndSumValue(
    [
      ...character?.characteristics,
      ...character.characterState.override,
      ...conditionalList,
    ],
    "Defense",
    "name"
  );

  const speed = filterAndSumValue(
    [...character?.characteristics, ...character.characterState.override],
    "Speed",
    "name"
  );

  const corruption = filterAndSumValue(
    [...character?.characteristics, ...character.characterState.override],
    "Corruption",
    "name"
  );

  const power = filterAndSumValue(
    [...character?.characteristics, ...character.characterState.override],
    "Power",
    "name"
  );

  const insanity = filterAndSumValue(
    [...character?.characteristics, ...character.characterState.override],
    "Insanity",
    "name"
  );

  const perception = filterAndSumValue(
    [...character?.characteristics, ...character.characterState.override],
    "Perception",
    "name"
  );

  const equipedWithArmor = character?.items.armor.filter(
    ({ equiped }: Armor) => equiped
  );

  const equipedDefensiveWeapons = character?.items.weapons.filter(
    ({ properties, equiped }: Weapon) =>
      properties.some((property) => property.match(/Defensive/)) && equiped
  );

  return (
    <CharacterAttributesContext.Provider
      value={{
        id: character.id,
        strength,
        health: strength + health,
        agility,
        will,
        intellect,
        defense: lengthIsZero(equipedWithArmor)
          ? defense + agility
          : defense +
            equipedWithArmor[0].value +
            (equipedWithArmor[0].properties.includes("Agility") ? agility : 0) +
            (!lengthIsZero(equipedDefensiveWeapons)
              ? Math.max(
                  ...equipedDefensiveWeapons.map(({ properties }: Weapon) => {
                    const [defensive] = properties.filter((property: string) =>
                      property.includes("Defensive")
                    );

                    const defenseValue = defensive.match(/\d+/);

                    return defenseValue;
                  })
                )
              : 0),
        speed:
          speed +
          (!lengthIsZero(equipedWithArmor)
            ? (strength < equipedWithArmor[0].requirement ? -2 : 0) +
              (equipedWithArmor[0].type === "heavy" ? -2 : 0)
            : 0),

        corruption,
        power,
        insanity,
        perception: perception + intellect,
        talents: character.talents,
        spells: character.spells,
        expended: character.characterState.expended,
        afflictions: character.characterState.afflictions,
        items: character.items,
      }}
    >
      {children}
    </CharacterAttributesContext.Provider>
  );
}

export function useCharacterAttributes() {
  return useContext(CharacterAttributesContext);
}
