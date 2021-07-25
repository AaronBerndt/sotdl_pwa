import { createContext, useContext } from "react";
import { filterAndSumValue, filterByLevel } from "../../../utils/arrayUtils";
import { lengthIsZero } from "../../../utils/logic";
import {
  Armor,
  CurrentAfflictions,
  Details,
  Expend,
  Items,
  Overrides,
  Professions,
  Talents,
  Weapon,
} from "../CharacterSheetPageTypes";
import createConditinalList from "../conditional";

type CharacterAttributes = {
  _id: string;
  level: number;
  ancestry: string;
  novicePath: string;
  expertPath: string;
  masterPath: string;
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
  spells: string[];
  items: Items;
  professions: Professions;
  details: Details;
  afflictions: CurrentAfflictions;
  overrides: Overrides;
  expended: Expend[];
  [key: string]: any;
};

const CharacterAttributesContext = createContext<CharacterAttributes>({
  _id: "",
  level: 0,
  ancestry: "",
  novicePath: "",
  expertPath: "",
  masterPath: "",
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
  overrides: [],
  professions: [],
  details: [],
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
  const level = character.level;
  const health = filterAndSumValue(
    [
      ...filterByLevel(character?.characteristics, level),
      ...character.characterState.overrides,
    ],
    "Health",
    "name"
  );
  const strength = filterAndSumValue(
    [
      ...filterByLevel(character?.characteristics, level),
      ...character.characterState.overrides,
    ],
    "Strength",
    "name"
  );
  const agility = filterAndSumValue(
    [
      ...filterByLevel(character?.characteristics, level),
      ...character.characterState.overrides,
    ],
    "Agility",
    "name"
  );

  const will = filterAndSumValue(
    [
      ...filterByLevel(character?.characteristics, level),
      ...character.characterState.overrides,
    ],
    "Will",
    "name"
  );

  const intellect = filterAndSumValue(
    [
      ...filterByLevel(character?.characteristics, level),
      ...character.characterState.overrides,
    ],
    "Intellect",
    "name"
  );

  let defense = filterAndSumValue(
    [
      ...filterByLevel(character?.characteristics, level),
      ...character.characterState.overrides,
      ...conditionalList,
    ],
    "Defense",
    "name"
  );

  const speed = filterAndSumValue(
    [
      ...filterByLevel(character?.characteristics, level),
      ...character.characterState.overrides,
    ],
    "Speed",
    "name"
  );

  const corruption = filterAndSumValue(
    [...character?.characteristics, ...character.characterState.overrides],
    "Corruption",
    "name"
  );

  const power = filterAndSumValue(
    [
      ...filterByLevel(character?.characteristics, level),
      ...character.characterState.overrides,
    ],
    "Power",
    "name"
  );

  const insanity = filterAndSumValue(
    [...character?.characteristics, ...character.characterState.overrides],
    "Insanity",
    "name"
  );

  const perception = filterAndSumValue(
    [
      ...filterByLevel(character?.characteristics, level),
      ...character.characterState.overrides,
    ],
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
        _id: character._id,
        level: character.level,
        ancestry: character.ancestry,
        novicePath: character.novicePath,
        expertPath: character.expertPath,
        masterPath: character.masterPath,
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
        overrides: character.characterState.overrides,
        details: character.details,
        professions: character.professions,
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
