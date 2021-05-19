import { act, renderHook } from "@testing-library/react-hooks";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider } from "react-query";
import mocks from "../../../mocks/mocks";
import { mockCharacter1 } from "../CharacterSheetPageMocks";
import { Override } from "../CharacterSheetPageTypes";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import useDeleteOverride from "./useDeleteOverride";

describe("useUpdateAfflictions test", () => {
  const server = setupServer(...mocks);
  const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, 1];

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it("should delete override", async () => {
    const queryClient = new QueryClient();
    const { result, waitFor } = renderHook(() => useDeleteOverride(), {
      wrapper: ({ children }: any) => (
        <QueryClientProvider client={queryClient}></QueryClientProvider>
      ),
    });

    const {
      characterState: { overrides, ...characterStateRest },
      ...rest
    } = mockCharacter1;

    const newCharacterState = {
      ...rest,
      characterState: {
        overrides: [
          { name: "Will", value: 1 },
          { name: "Will", value: 1 },
        ],
        ...characterStateRest,
      },
    };

    queryClient.setQueryData([FETCH_CHARACTER_KEY, 1], newCharacterState);

    act(() => {
      result.current.mutate({
        overrideToDeleteName: "Will",
      });
    });

    await waitFor(() => result.current.isSuccess);

    const { characterState }: any = queryClient.getQueryData(
      CHARACTER_QUERY_KEY
    );

    expect(characterState.overrides).toHaveLength(2);
    expect(
      characterState.overrides.filter(({ name }: Override) => name === "Will")
    ).toHaveLength(1);
  });
});
