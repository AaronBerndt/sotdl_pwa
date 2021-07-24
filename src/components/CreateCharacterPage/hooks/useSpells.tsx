import { QueryClient, useQuery } from "react-query";
import axios from "axios";
import { SPELLS_URL } from "../../../api.config";

export const KEY = "Fetch Spells";

const fetchSpells = () => axios.get(SPELLS_URL);

export const preFetchSpells = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchSpells);

export default function useSpells(spellList?: string[]) {
  return useQuery<any>(
    KEY,
    () =>
      axios.get(
        spellList
          ? `${SPELLS_URL}?spellList=${spellList.join(",")}`
          : SPELLS_URL
      ),
    {
      select: ({ data }) => data,
    }
  );
}
