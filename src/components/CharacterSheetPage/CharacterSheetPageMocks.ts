import { RestHandler } from "msw";
import { CHARACTER_URL } from "../../api.config";
import { createGetMock } from "../../mocks/createHandlers";
import { Character } from "./CharacterSheetPageTypes";

export const mockCharacter1: Character = {
  id: 1,
  name: "Ordo",
  description: "",
  level: 1,
  novicePath: "Warrior",
  expertPath: "Fighter",
  masterPath: "",
  ancestry: "Dwarf",
  characteristics: [
    { name: "Strength", value: 10, level: 0 },
    { name: "Agility", value: 9, level: 0 },
    { name: "Intellect", value: 10, level: 0 },
    { name: "Will", value: 10, level: 0 },
    { name: "Perception", value: 1, level: 0 },
    { name: "Health", value: 4, level: 0 },
    { name: "Size", value: 0.5, level: 0 },
    { name: "Speed", value: 8, level: 0 },
    {
      name: "Health",
      value: 6,
      level: 4,
    },
    {
      name: "Health",
      value: 5,
      level: 1,
    },
    {
      name: "Health",
      value: 5,
      level: 2,
    },

    {
      name: "Health",
      value: 6,
      level: 3,
    },
    {
      name: "Power",
      value: 2,
      level: 3,
    },

    { name: "Strength", value: 1, level: 1 },
    { name: "Will", value: 1, level: 1 },
    { name: "Strength", value: 1, level: 3 },
    { name: "Will", value: 1, level: 3 },
    { name: "Health", value: 6, level: 5 },
    { name: "Defense", value: 1, level: 5 },
    { name: "Health", value: 6, level: 6 },
    { name: "Strength", value: 1, level: 7 },
    { name: "Agility", value: 1, level: 7 },
    { name: "Health", value: 6, level: 7 },
    { name: "Health", value: 6, level: 8 },
    { name: "Health", value: 6, level: 9 },
    { name: "Health", value: 6, level: 10 },
  ],
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
    damage: 0,
    expended: [],
  },
};

const mockCharacter2: Character = {
  id: 2,
  name: "John Doe",
  description: "",
  level: 0,
  ancestry: "Human",
  novicePath: "",
  expertPath: "",
  masterPath: "",
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
    damage: 0,
    expended: [],
  },
};

const mockCharacters = [mockCharacter1, mockCharacter2];

const mocks: RestHandler[] = [
  createGetMock(CHARACTER_URL, 200, mockCharacters),

  createGetMock(`${CHARACTER_URL}/1`, 200, mockCharacter1),
];

export default mocks;
