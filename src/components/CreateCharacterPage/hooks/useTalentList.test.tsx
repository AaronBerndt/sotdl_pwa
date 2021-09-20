import { act, renderHook } from "@testing-library/react-hooks";
import { setupServer } from "msw/node";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import mocks from "../../../mocks/mocks";
import { CharacterBuilderProvider } from "../context/CharacterBuilderContext";
import { ancestryList, pathsList } from "../CreateCharacterPageMocks";
import { KEY as ANCESTRY_KEY } from "./useAncestries";
import { KEY as PATH_KEY } from "./usePaths";
import useTalents from "./useTalentList";

const server = setupServer(...mocks);
const queryClient = new QueryClient();
beforeAll(() => server.listen());
afterAll(() => server.close());

it("useTalentList test", () => {
  queryClient.setQueryData(ANCESTRY_KEY, ancestryList);
  queryClient.setQueryData(PATH_KEY, pathsList);

  const { result } = renderHook(() => useTalents(), {
    wrapper: ({ children }: any) => (
      <CharacterBuilderProvider
        values={{
          name: "Test",
          setName: Function,
          level: 3,
          setLevel: Function,
          novicePath: "Warrior",
          expertPath: "",
          masterPath: "",
          setPath: Function,
          ancestry: "Ghost",
          setAncestry: Function,
          traditions: [],
          setTranditions: Function,
          spells: [],
          setSpells: "Function",
          pointsToSpend: 0,
          setPointsToSpend: Function,
          characteristics: [],
          setCharacteristics: Function,
          choices: [
            { name: "Path Life", value: "Dwarf", level: 0 },
            { name: "Discipline", value: "Spellguard", level: 1 },
          ],
          setChoices: Function,
          overrides: [],
          setOverrides: Function,
          setItems: Function,
          detailChoices: [],
          setDetailChoices: Function,
          details: [],
          setDetails: Function,
          currency: {
            bits: 0,
            copper: 0,
            silver: 0,
            gold: 0,
          },
          setCurrency: Function,
        }}
      >
        <QueryClientProvider client={queryClient}></QueryClientProvider>
      </CharacterBuilderProvider>
    ),
  });

  expect(result).toBe(true);
});
