import axios from "axios";
import { QueryClient, useQuery } from "react-query";
import { COMBAT_TEMPLATES_URL } from "../../../api.config";

export const KEY = "Fetch Combat Templates";

const fetchCombatTemplates = () => axios.get(COMBAT_TEMPLATES_URL);

export const preFetchCombatTemplates = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchCombatTemplates);

export default function useFetchCombatTemplates() {
  return useQuery<any>(KEY, fetchCombatTemplates, {
    select: ({ data }) => data,
  });
}
