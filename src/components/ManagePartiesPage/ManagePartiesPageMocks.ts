import { RestHandler } from "msw";
import {
  CREATE_PARTY_URL,
  DELETE_PARTY_URL,
  EDIT_PARTY_URL,
  PARTIES_URL,
} from "../../api.config";
import {
  createDeleteMock,
  createGetMock,
  createPostMock,
  createPutMock,
} from "../../mocks/createHandlers";
import { Party } from "./ManagePartiesPageTypes";

export const mockParties: Party[] = [
  {
    _id: "12345",
    name: "Test Party",
    members: ["1", "2"],
  },
];
export const mocks: RestHandler[] = [
  createGetMock(`${PARTIES_URL}?_id=12345`, 200, mockParties),
  createPostMock(CREATE_PARTY_URL, 200, {
    message: "Created Party",
  }),

  createPutMock(EDIT_PARTY_URL, 200, {
    message: "Created Party",
  }),

  createDeleteMock(DELETE_PARTY_URL, 200, {
    message: "Deleted Party",
  }),
];

