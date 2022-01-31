import { RestHandler } from "msw";
import {
  COMBAT_URL,
  CREATE_COMBAT_URL,
  DELETE_COMBAT_URL,
  EDIT_COMBAT_URL,
  MONSTER_URL,
} from "../../api.config";
import {
  createDeleteMock,
  createGetMock,
  createPostMock,
  createPutMock,
} from "../../mocks/createHandlers";
import {
  CombatantType,
  Combats,
  Monster,
  TurnType,
} from "./CombatTrackerPageTypes";

export const createCombatant = (
  _id: string,
  name: string,
  type: CombatantType,
  health: number,
  currentHealth: number,
  turnType: TurnType
) => ({
  _id,
  health,
  currentHealth,
  name,
  type,
  turnType,
});

export const combatants = [
  createCombatant("123abc", "Ordo", "Player", 20, 10, "Player Fast"),
  createCombatant("123abc4", "Tim", "Player", 10, 10, "Player Slow"),
  createCombatant("123abc3", "Goblin", "Monster", 10, 7, "Monster Slow"),
  createCombatant("123abc2", "Goblin", "Monster", 10, 1, "Monster Fast"),
];

export const Goblin: Monster = {
  _id: "613e6f2d0232f909dd875d76",
  name: "Goblin",
  type: "Faerie",
  difficulty: "1",
  book: "Shadow of the Demon Lord",
  description: "",
  terror_level: "",
  characteristics: {
    Health: 18,
    HealingRate: 5,
    Perception: 13,
    Defense: 12,
    Speed: 10,
    Strength: 10,
    Agility: 11,
    Intellect: 12,
    Will: 8,
    Insanity: 3,
    Corruption: 2,
    Power: 2,
    Size: 1,
  },

  traits: [],
  actions: [
    {
      name: "Claws",
      type: "Attack",
      range: "melee",
      damage: "2d6",
      extra_effects: "",
      boons: 0,
      banes: 0,
    },
  ],
};

export const mockCombats: Combats = [
  {
    _id: "1",
    combatants,
    currentRoundType: "Player Fast",
    turnCount: 0,
  },
];

const mocks: RestHandler[] = [
  createGetMock(COMBAT_URL, 200, mockCombats),
  createGetMock(MONSTER_URL, 200, [Goblin]),

  createPostMock(CREATE_COMBAT_URL, 200, {
    message: "Created Combat",
  }),
  createDeleteMock(DELETE_COMBAT_URL, 200, {
    message: "Delete Combat",
  }),

  createPutMock(EDIT_COMBAT_URL, 200, {
    message: "Edit Combat",
  }),

  createGetMock(`${COMBAT_URL}?_id=1`, 200, mockCombats[0]),
];

export default mocks;


