import { RequestHandler } from "msw";
import { default as CharacterSheetPageMocks } from "../components/CharacterSheetPage/CharacterSheetPageMocks";

import { default as CreateCharacterSheetPageMocks } from "../components/CreateCharacterPage/CreateCharacterPageMocks";

const mocks: RequestHandler[] = [
  ...CharacterSheetPageMocks,
  ...CreateCharacterSheetPageMocks,
];

export default mocks;
