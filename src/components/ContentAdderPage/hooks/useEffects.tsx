import { QueryClient, useQuery } from "react-query";
import axios from "axios";
import { EFFECTS_URL, EQUIPMENT_URL } from "../../../api.config";

export const KEY = "Fetch Effects";

const fetchEffects = () => axios.get(EFFECTS_URL);

export const preFetchEquipment = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchEffects);

export default function useEffects() {
  return useQuery<any>(KEY, fetchEffects, {
    select: ({ data }) => data,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
