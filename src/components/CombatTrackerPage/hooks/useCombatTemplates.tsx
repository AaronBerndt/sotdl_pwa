import axios from "axios";
import { QueryClient, useQuery } from "react-query";
import { COMBAT_TEMPLATES_URL } from "../../../api.config";

export const KEY = "Fetch Combat Templates";

const fetchCombat = () => axios.get(COMBAT_TEMPLATES_URL);

export const preFetchCombatTemplates = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchCombat);

export default function useCombats() {
  return useQuery<any>(KEY, fetchCombat, {});
}


