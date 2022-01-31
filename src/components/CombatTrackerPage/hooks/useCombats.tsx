import axios from "axios";
import { QueryClient, useQuery } from "react-query";
import { COMBAT_URL } from "../../../api.config";

export const KEY = "Fetch Combats";
export const FETCH_COMBAT_KEY = "Fetch Combat";

const fetchCombat = () => axios.get(COMBAT_URL);

export const preFetchCombat = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchCombat);

export default function useCombats() {
  return useQuery<any>(KEY, fetchCombat, {
    select: ({ data }: any) => data,
  });
}

export function useCombat(combatId: string) {
  return useQuery(
    [FETCH_COMBAT_KEY, combatId],
    () => axios.get(`${COMBAT_URL}?_id=${combatId}`),
    combatId === ""
      ? {
          enabled: false,
        }
      : {
          select: ({ data }: any) => data,
        }
  );
}


