import { RestHandler } from "msw";
import {
  CHARACTER_URL,
  UPDATE_CHARACTER_AFFLICTIONS,
  UPDATE_CHARACTER_EXPENDED_LIST,
  UPDATE_CHARACTER_HEALTH_URL,
  UPDATE_GEAR_STATUS_URL,
} from "../../api.config";
import { createGetMock, createPostMock } from "../../mocks/createHandlers";
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
  talents: [
    {
      name: "Darksight",
      description:
        "You can see in areas obscured by shadows or darkness within medium range as if those areas were lit. Beyond this distance, you treat darkness as shadows and shadows as lit.",
      level: 0,
    },
    {
      name: "Hated Creature",
      description:
        "Choose a creature from the Hatred table. Your hatred grants 1 boon on attack rolls made against creatures you hate.",
      level: 0,
    },
    {
      name: "Robust Constitution",
      description:
        "You take half damage from poison. You make challenge rolls with 1 boon to avoid or remove the poisoned affliction.",
      level: 0,
    },
    {
      name: "Shake it Off",
      description:
        "You can use an action to heal damage equal to your healing rate and remove one of the following afflictions: fatigued, impaired, or poisoned. Once you use this talent, you cannot use it again until after you complete a rest.",
      level: 4,
    },
    {
      name: "Determined",
      description:
        "When you roll a 1 on the die from a boon, you can reroll the die and choose to use the new number.",
      level: 1,
    },
    {
      name: "Catch Your Breath",
      description:
        "You can use an action or a triggered action on your turn to heal damage equal to your healing rate. Once you use this talent, you cannot use it again until after you complete a rest.",
      level: 1,
    },
    {
      name: "Weapon Training",
      description:
        "When attacking with a weapon, you make the attack roll with 1 boon.",
      level: 1,
    },
    {
      name: "Combat Prowess",
      description: "Your attacks with weapons deal 1d6 extra damage.",
      level: 2,
    },
    {
      name: "Forceful Strike",
      description:
        "When the total of your attack roll is 20 or higher and exceeds the target number by at least 5, the attack deals 1d6 extra damage.",
      level: 2,
    },

    {
      name: "Fury Unleashed",
      description:
        "If gaining Insanity would cause you to go mad, you go berserk instead, even if you are fatigued. While you are berserk in this way, the GM controls your character. At the end of each round, the GM rolls a d6. On a 5 or higher, you stop being berserk and reduce your Insanity total by 1d6 + your Will modifier (minimum 0). You then become fatigued for 1 minute. If you were already fatigued, you instead take 1d6 damage.",
      level: 3,
    },
    {
      name: "Iron Hide",
      description:
        " You have a +1 bonus to Defense if you are not wearing medium or heavy armor.",
      level: 3,
    },
  ],
  spells: [
    {
      name: "Flense",
      tradition: "Air",
      attribute: "Will",
      type: "Attack",
      level: 1,
      damage: "2d6 + 3",
      range: "One creature or object within short range",
      duration: "0",
      description:
        "Windborne grit scours your target. Make a Will attack roll against the target’s Strength. On a success, the target takes 2d6 + 3 damage. A living creature that becomes incapacitated by this damage dies instantly, its flesh (if any) stripped from its bones.",
      // extra_effects: [
      //   {
      //     name: "Attack Roll 20+",
      //     description: "The target takes 2d6 extra damage.",
      //   },
      // ],
    },
  ],
  items: {
    weapons: [
      {
        id: 123468,
        name: "Axe",
        description: "",
        itemType: "weapon",
        damage: "1d6 +1",
        hands: 1,
        properties: [],
        type: "Basic",
        price: "1 ss",
        availability: "C",
        equiped: true,
      },
      {
        id: 1234687,
        name: "Axe",
        description: "",
        itemType: "weapon",
        damage: "1d6 +1",
        hands: 1,
        properties: [],
        type: "Basic",
        price: "1 ss",
        availability: "C",
        equiped: true,
      },

      {
        id: 1,
        name: "Crossbow",
        description: "",
        itemType: "weapon",
        damage: "1d6",
        hands: 2,
        properties: ["Range"],
        type: "Basic",
        price: "1 ss",
        availability: "C",
        equiped: true,
      },
    ],
    armor: [
      {
        id: 12346,
        name: "Light Armor",
        description:
          "Scale is a woven mesh of small metal scales. It covers the torso, arms, and lower body. The suit also includes a helmet",
        itemType: "armor",
        value: 2,
        type: "Light",
        price: "100",
        availability: "on",
        equiped: false,
        properties: ["Agility"],
      },
      {
        id: 123467,
        name: "Scale",
        description:
          "Scale is a woven mesh of small metal scales. It covers the torso, arms, and lower body. The suit also includes a helmet",
        itemType: "armor",
        value: 16,
        type: "Heavy",
        price: "100",
        availability: "on",
        equiped: true,
        properties: [],
      },
    ],
    otherItems: [
      {
        id: 123,
        name: "Adventurer’s pack",
        description: "Pack",
        itemType: "basic",
        price: "1 ss",
        availability: "common",
      },
      {
        id: 1234,
        name: "Candle",
        description: "candle",
        itemType: "basic",
        price: "1 ss",
        availability: "uncommon",
      },
    ],
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
    expended: [{ name: "Flense" }],
    override: [],
    afflictions: [],
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
  talents: [],
  spells: [],
  items: {
    weapons: [],
    armor: [],
    otherItems: [],

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
    override: [],
    afflictions: [],
  },
};

const mockCharacters = [mockCharacter1, mockCharacter2];

const mocks: RestHandler[] = [
  createGetMock(CHARACTER_URL, 200, mockCharacters),

  createGetMock(`${CHARACTER_URL}/1`, 200, mockCharacter1),
  createPostMock(UPDATE_CHARACTER_HEALTH_URL, 200, {
    message: "Updated Character Health",
  }),

  createPostMock(UPDATE_GEAR_STATUS_URL, 200, {
    message: "Updated Gear Status",
  }),

  createPostMock(UPDATE_CHARACTER_EXPENDED_LIST, 200, {
    message: "Updated expended list",
  }),

  createPostMock(UPDATE_CHARACTER_AFFLICTIONS, 200, {
    message: "Updated afflictions list",
  }),
];

export default mocks;
