import { QueryClient, useQuery } from "react-query";
import axios from "axios";
import { PATH_URL } from "../../../api.config";

export const KEY = "Fetch Equipment";

const fetchEquipment = () => axios.get(PATH_URL);

export const preFetchEquipment = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchEquipment);

export default function useEquipment() {
  return useQuery<any>(KEY, fetchEquipment, {
    select: ({ data }) => data,
  });
}
