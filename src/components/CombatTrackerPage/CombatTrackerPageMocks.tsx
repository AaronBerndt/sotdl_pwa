import { RestHandler } from "msw";
import {
  COMBAT_URL,
  CREATE_COMBAT_URL,
  DELETE_COMBAT_URL,
  EDIT_COMBAT_URL,
} from "../../api.config";
import {
  createDeleteMock,
  createGetMock,
  createPostMock,
  createPutMock,
} from "../../mocks/createHandlers";
import { Combats } from "./CombatTrackerPageTypes";

export const mockCombats: Combats = [
  {
    _id: "1",
    combatants: [],
    currentRoundType: "Player Fast",
    turnCount: 0,
  },
];

const mocks: RestHandler[] = [
  createGetMock(COMBAT_URL, 200, mockCombats),

  createPostMock(CREATE_COMBAT_URL, 200, {
    message: "Created Combat",
  }),
  createDeleteMock(DELETE_COMBAT_URL, 200, {
    message: "Delete Combat",
  }),

  createPutMock(EDIT_COMBAT_URL, 200, {
    message: "Edit Combat",
  }),
];

export default mocks;
