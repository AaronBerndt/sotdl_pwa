import { RequestHandler } from "msw";
import { default as CharacterSheetPageMocks } from "../components/CharacterSheetPage/CharacterSheetPageMocks";

import { default as CreateCharacterSheetPageMocks } from "../components/CreateCharacterPage/CreateCharacterPageMocks";

import { default as CombatTrackerPageMocks } from "../components/CombatTrackerPage/CombatTrackerPageMocks";

const mocks: RequestHandler[] = [
  ...CharacterSheetPageMocks,
  ...CreateCharacterSheetPageMocks,
  ...CombatTrackerPageMocks,
];

export default mocks;
