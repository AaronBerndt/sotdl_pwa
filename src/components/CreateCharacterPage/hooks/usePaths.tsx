import { useQuery } from "react-query";
import axios from "axios";
import { PATH_URL } from "../../../api.config";

export const KEY = "Fetch Paths";

const fetchPaths = () => axios.get(PATH_URL);

export default function usePaths() {
  return useQuery<any>(KEY, fetchPaths, {
    select: ({ data }) => data,
  });
}
