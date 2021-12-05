import { QueryClient, useQuery } from "react-query";
import axios from "axios";
import { SPELLS_URL } from "../../../api.config";
import _, { chunk } from "lodash";

export const KEY = "Fetch Spells";

const fetchSpells = () => axios.get(SPELLS_URL);

export const preFetchSpells = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchSpells);

export default function useSpells(
  filterObject: { name: string; value: any },
  spellList?: string[]
) {
  return useQuery<any>(
    KEY,
    () =>
      axios.get(
        spellList
          ? `${SPELLS_URL}?spellList=${spellList.join(",")}`
          : SPELLS_URL
      ),
    {
      select: ({ data }) => {
        if (filterObject.name === "") {
          return chunk(data, 50)[0];
        }

        if (filterObject.name === "Filter") {
          const { name, description, ...rest } = filterObject.value;

          return description === ""
            ? _.filter(data, {
                ...rest,
              }).filter(({ name: spellName }: any) => spellName.includes(name))
            : _.filter(data, {
                ...rest,
              })
                .filter(({ name: spellName }: any) => spellName.includes(name))
                .filter(({ description: spellDescription }: any) =>
                  spellDescription.includes(description)
                );
        }
      },
    }
  );
}
