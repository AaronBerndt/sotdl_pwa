import { act, renderHook } from "@testing-library/react-hooks";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider } from "react-query";
import mocks from "../../../mocks/mocks";
import { mockCharacter1 } from "../CharacterSheetPageMocks";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import useUpdateHealth from "./useUpdateHealth";

describe("useUpdateHealth test", () => {
  const server = setupServer(...mocks);
  const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, 1];

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  const createUseUpdateHealthTest = (
    label: string,
    healthChangeAmount: number,
    newTotal: number
  ) =>
    it(`${label}`, async () => {
      const queryClient = new QueryClient();
      const { result, waitFor } = renderHook(() => useUpdateHealth(), {
        wrapper: ({ children }: any) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      });

      const {
        characterState: { damage, ...characterStateRest },
        ...rest
      } = mockCharacter1;

      const damagedCharacterMock = {
        ...rest,

        characterState: {
          damage: 10,
          ...characterStateRest,
        },
      };

      queryClient.setQueryData([FETCH_CHARACTER_KEY, 1], damagedCharacterMock);

      act(() => {
        result.current.mutate({
          characterId: 1,
          healthChangeAmount,
        });
      });

      await waitFor(() => result.current.isSuccess);

      const { characterState }: any = queryClient.getQueryData(
        CHARACTER_QUERY_KEY
      );

      expect(characterState.damage).toBe(newTotal);
    });

  createUseUpdateHealthTest("It should Heal", 5, 5);
  createUseUpdateHealthTest("It should damage", -5, 15);
});
