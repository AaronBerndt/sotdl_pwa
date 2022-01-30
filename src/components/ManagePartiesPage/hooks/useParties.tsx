import { QueryClient, useQuery } from "react-query";
import axios from "axios";
import { PARTIES_URL } from "../../../api.config";

export const KEY = "Fetch Parties";
export const FETCH_PARTY_KEY = "Fetch Party";

const fetchParties = () => axios.get(PARTIES_URL);

export const preFetchParties = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchParties);

export default function useParties() {
  return useQuery<any>(KEY, fetchParties, {
    select: ({ data }) => data,
  });
}

export function useParty(partyId: string) {
  return useQuery(
    [FETCH_PARTY_KEY, partyId],
    () => axios.get(`${PARTIES_URL}?_id=${partyId}`),
    {
      select: ({ data }) => data,
    }
  );
}

