import { act, renderHook } from "@testing-library/react-hooks";
import useCharacteristicsList from "./useCharacteristicsList";

describe("useCharacteristicList test", () => {
  const { result, waitFor } = renderHook(() => useCharacteristicList(), {
    wrapper: ({ children }: any) => (
      <QueryClientProvider client={queryClient}></QueryClientProvider>
    ),
  });
});
