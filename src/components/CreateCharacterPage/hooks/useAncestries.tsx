import { QueryClient, useQuery } from "react-query";
import axios from "axios";
import { ANCESTRIES_URL } from "../../../api.config";

export const KEY = "Fetch Ancestries";

export const preFetchAncestries = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchAncestries);

const fetchAncestries = () => axios.get(ANCESTRIES_URL);

export default function useAncestries() {
  return useQuery<any>(KEY, fetchAncestries, {
    select: ({ data }) => data,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
