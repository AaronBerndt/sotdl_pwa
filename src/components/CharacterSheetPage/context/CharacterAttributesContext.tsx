import { createContext, useContext } from "react";
import { filterAndSum } from "../../../utils/arrayUtils";
import { lengthIsZero } from "../../../utils/logic";
import { Armor } from "../CharacterSheetPageTypes";

type CharacterAttributes = {
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
  [key: string]: any;
};

const CharacterAttributesContext = createContext<CharacterAttributes>({
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
});

export function CharacterAttributesProvider({ children, character }: any) {
  const health = filterAndSum(
    [...character?.characteristics, ...character.characterState.override],
    "Health",
    "name"
  );
  const strength = filterAndSum(
    [...character?.characteristics, ...character.characterState.override],
    "Strength",
    "name"
  );
  const agility = filterAndSum(
    [...character?.characteristics, ...character.characterState.override],
    "Agility",
    "name"
  );

  const will = filterAndSum(
    [...character?.characteristics, ...character.characterState.override],
    "Will",
    "name"
  );

  const intellect = filterAndSum(
    [...character?.characteristics, ...character.characterState.override],
    "Intellect",
    "name"
  );

  let defense = filterAndSum(
    [...character?.characteristics, ...character.characterState.override],
    "Defense",
    "name"
  );

  const speed = filterAndSum(
    [...character?.characteristics, ...character.characterState.override],
    "Speed",
    "name"
  );

  const corruption = filterAndSum(
    [...character?.characteristics, ...character.characterState.override],
    "Corruption",
    "name"
  );

  const power = filterAndSum(
    [...character?.characteristics, ...character.characterState.override],
    "Power",
    "name"
  );

  const insanity = filterAndSum(
    [...character?.characteristics, ...character.characterState.override],
    "Insanity",
    "name"
  );

  const perception = filterAndSum(
    [...character?.characteristics, ...character.characterState.override],
    "Perception",
    "name"
  );

  const equipedWithArmor = character?.items.armor.filter(
    ({ equiped }: Armor) => equiped
  );

  return (
    <CharacterAttributesContext.Provider
      value={{
        strength,
        health: strength + health,
        agility,
        will,
        intellect,
        defense: lengthIsZero(equipedWithArmor)
          ? defense + agility
          : defense +
            equipedWithArmor[0].value +
            (equipedWithArmor[0].properties.includes("Agility") ? agility : 0),
        speed,
        corruption,
        power,
        insanity,
        perception: perception + intellect,
      }}
    >
      {children}
    </CharacterAttributesContext.Provider>
  );
}

export function useCharacterAttributes() {
  return useContext(CharacterAttributesContext);
}
