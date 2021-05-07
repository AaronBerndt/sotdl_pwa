import { RestHandler } from "msw";
import { CHARACTER_URL } from "../../api.config";
import { createGetMock } from "../../mocks/createHandlers";
import { Character } from "./CharacterSheetPageTypes";

const mockCharacter: Character = {
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

const mocks: RestHandler[] = [createGetMock(CHARACTER_URL, 200, mockCharacter)];

export default mocks;
