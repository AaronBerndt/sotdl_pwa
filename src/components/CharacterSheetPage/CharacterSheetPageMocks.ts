import { RestHandler } from "msw";
import { CHARACTER_URL } from "../../api.config";
import { createGetMock } from "../../mocks/createHandlers";
import { Character } from "./CharacterSheetPageTypes";

const mockCharacter1: Character = {
  name: "Ordo",
  description: "",
  level: 0,
  ancestry: "Dwarf",
  characteristics: [],
  features: [],
  spells: [],
  items: {
    weapons: [],
    armor: [],

    money: {
      bits: 0,
      copper: 0,
      silver: 0,
      gold: 0,
    },
  },
  languages: [],
  professions: [],
  characterState: {
    currentDamage: 0,
    expended: [],
  },
};

const mockCharacter2: Character = {
  name: "John Doe",
  description: "",
  level: 0,
  ancestry: "Human",
  characteristics: [],
  features: [],
  spells: [],
  items: {
    weapons: [],
    armor: [],

    money: {
      bits: 0,
      copper: 0,
      silver: 0,
      gold: 0,
    },
  },
  languages: [],
  professions: [],
  characterState: {
    currentDamage: 0,
    expended: [],
  },
};

const mockCharacters = [mockCharacter1, mockCharacter2];

const mocks: RestHandler[] = [
  createGetMock(CHARACTER_URL, 200, mockCharacters),

  createGetMock(`${CHARACTER_URL}/1`, 200, mockCharacter1),
];

export default mocks;
