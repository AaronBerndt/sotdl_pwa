import { act, renderHook } from "@testing-library/react-hooks";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider } from "react-query";
import mocks from "../../../mocks/mocks";
import {
  mockCharacter2,
  mockCharacters,
} from "../../CharacterSheetPage/CharacterSheetPageMocks";
import { KEY } from "../../CharacterSheetPage/hooks/useCharacters";
import useDeleteCharacter from "./useDeleteCharacter";

describe("useDeleteCharacter test", () => {
  const server = setupServer(...mocks);

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it("should delete character", async () => {
    const queryClient = new QueryClient();
    const { result, waitFor } = renderHook(() => useDeleteCharacter(), {
      wrapper: ({ children }: any) => (
        <QueryClientProvider client={queryClient}></QueryClientProvider>
      ),
    });

    queryClient.setQueryData(KEY, mockCharacters);

    act(() => {
      result.current.mutate(mockCharacter2);
    });

    await waitFor(() => result.current.isSuccess);

    const { data }: any = queryClient.getQueryData(KEY);

    expect(data).toHaveLength(1);
    expect(data[1]).toBeUndefined();
  });
});
