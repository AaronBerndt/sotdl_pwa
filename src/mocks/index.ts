import { setupWorker } from "msw";
import mocks from "./mocks";

export const worker = setupWorker(...mocks);
