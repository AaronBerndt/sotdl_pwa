import { createContext, useContext } from "react";
import {
  CurrentAfflictions,
  Details,
  Expend,
  Items,
  Overrides,
  Professions,
  Talents,
} from "../CharacterSheetPageTypes";

type CharacterAttributes = {
  _id: string;
  partyId: string;
  turnType: string;
  activeCombat: string;
  level: number;
  ancestry: string;
  novicePath: string;
  expertPath: string;
  masterPath: string;
  strength: number;
  health: number;
  healingRate: number;
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
  injured: boolean;
  items: Items;
  professions: Professions;
  languages: string[];
  details: Details;
  afflictions: CurrentAfflictions;
  equipedGear: any[];
  overrides: Overrides;
  temporaryEffects: string[];
  expended: Expend[];
  damage: number;
  [key: string]: any;
};

const CharacterAttributesContext = createContext<CharacterAttributes>({
  _id: "",
  activeCombat: "",
  turnType: "",
  level: 0,
  partyId: "",
  ancestry: "",
  novicePath: "",
  expertPath: "",
  masterPath: "",
  strength: 0,
  health: 0,
  healingRate: 0,
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
  equipedGear: [],
  temporaryEffects: [],
  professions: [],
  languages: [],
  details: [],
  injured: false,
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
  damage: 0,
});

export function CharacterAttributesProvider({ children, character }: any) {
  return (
    <CharacterAttributesContext.Provider
      value={{
        _id: character._id,
        partyId: character.partyId,
        activeCombat: character.activeCombat,
        turnType: character.turnType,
        level: character.level,
        ancestry: character.ancestry,
        novicePath: character.novicePath,
        expertPath: character.expertPath,
        masterPath: character.masterPath,
        health: character.characteristics.Health,
        healingRate: character.characteristics.HealingRate,
        perception: character.characteristics.Perception,
        defense: character.characteristics.Defense,
        speed: character.characteristics.Speed,
        strength: character.characteristics.Strength,
        agility: character.characteristics.Agility,
        intellect: character.characteristics.Intellect,
        will: character.characteristics.Will,
        insanity: character.characteristics.Insanity,
        corruption: character.characteristics.Corruption,
        power: character.characteristics.Power,
        injured: character.characterState.injured,
        talents: character.talents,
        spells: character.spells,
        expended: character.characterState.expended,
        languages: character.languages,
        afflictions: character.characterState.afflictions,
        equipedGear: character.characterState.equiped,
        temporaryEffects: character.characterState.temporaryEffects,
        overrides: character.characterState.overrides,
        details: character.details,
        professions: character.professions,
        items: character.items,
        damage: character.characterState.damage,
      }}
    >
      {children}
    </CharacterAttributesContext.Provider>
  );
}

export function useCharacterAttributes() {
  return useContext(CharacterAttributesContext);
}
