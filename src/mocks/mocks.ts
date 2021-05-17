import { RequestHandler } from "msw";
import { default as CharacterSheetPageMocks } from "../components/CharacterSheetPage/CharacterSheetPageMocks";

const mocks: RequestHandler[] = [...CharacterSheetPageMocks];

export default mocks;
