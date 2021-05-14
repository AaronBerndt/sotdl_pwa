import { act, renderHook } from "@testing-library/react-hooks";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider } from "react-query";
import mocks from "../../../mocks/mocks";
import { mockCharacter1 } from "../CharacterSheetPageMocks";
import { CurrentAffliction } from "../CharacterSheetPageTypes";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import useUpdateAfflications from "./useUpdateAfflictions";

describe("useUpdateAfflictions test", () => {
  const server = setupServer(...mocks);
  const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, 1];

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  const createUseUpdateAfflictionsTest = (label: string, action: string) =>
    it(`${label}`, async () => {
      const queryClient = new QueryClient();
      const { result, waitFor } = renderHook(() => useUpdateAfflications(), {
        wrapper: ({ children }: any) => (
          <QueryClientProvider client={queryClient}></QueryClientProvider>
        ),
      });

      const {
        characterState: { afflictions, ...characterStateRest },
        ...rest
      } = mockCharacter1;

      const damagedCharacterMock = {
        ...rest,
        characterState: {
          afflictions: [...afflictions, { name: "Asleep" }, { name: "Asleep" }],
          ...characterStateRest,
        },
      };

      queryClient.setQueryData([FETCH_CHARACTER_KEY, 1], damagedCharacterMock);

      act(() => {
        result.current.mutate({
          afflictionName: "Asleep",
          action: action,
        });
      });

      await waitFor(() => result.current.isSuccess);

      const { characterState }: any = queryClient.getQueryData(
        CHARACTER_QUERY_KEY
      );

      expect(characterState.afflictions).toHaveLength(
        action === "remove" ? 1 : 3
      );
      expect(
        characterState.afflictions.filter(
          ({ name }: CurrentAffliction) => name === "Asleep"
        )
      ).toHaveLength(action === "remove" ? 1 : 3);
    });

  createUseUpdateAfflictionsTest("It should remove one affliction", "remove");
  createUseUpdateAfflictionsTest("It should add one affliction", "add");
});
