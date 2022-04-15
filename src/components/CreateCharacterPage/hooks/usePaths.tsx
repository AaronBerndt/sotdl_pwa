import { QueryClient, useQuery } from "react-query";
import axios from "axios";
import { PATH_URL } from "../../../api.config";
import { Path } from "../CreateCharacterSheetPageTypes";

export const KEY = "Fetch Paths";

const fetchPaths = () => axios.get(PATH_URL);

export const preFetchPaths = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchPaths);

export default function usePaths(filterObject?: { name: string; value: any }) {
  return useQuery<any>(KEY, fetchPaths, {
    select: ({ data }) => {
      if (filterObject) {
        if (filterObject?.name === "") {
          return data;
        }

        if (filterObject?.name === "Filter") {
          const { keyWordSearch } = filterObject?.value;

          return !keyWordSearch
            ? data
            : data.filter(
                ({ description, talents }: Path) =>
                  description
                    .toLowerCase()
                    .includes(keyWordSearch.toLowerCase()) ||
                  talents
                    .map(({ name, description: talentDescription }) => [
                      name.toLowerCase(),
                      talentDescription.toLowerCase(),
                    ])
                    .flat()
                    .includes(keyWordSearch.toLowerCase())
              );
        }
      }
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
