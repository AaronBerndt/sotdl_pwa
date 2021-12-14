import { QueryClient, useQuery } from "react-query";
import axios from "axios";
import { MONSTER_URL } from "../../../api.config";
import _, { uniq } from "lodash";
import { Monster } from "../CombatTrackerPageTypes";

export const KEY = "Fetch monsters";

const fetchmonsters = () => axios.get(MONSTER_URL);

export const preFetchMonsters = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(KEY, fetchmonsters);

export default function useMonsters(
  filterObject: { name: string; value: any },
  monsterList?: string[]
) {
  return useQuery<any>(
    KEY,
    () =>
      axios.get(
        monsterList
          ? `${MONSTER_URL}?monsterList=${monsterList.join(",")}`
          : MONSTER_URL
      ),
    {
      select: ({ data }: any) => {
        if (filterObject.name === "") {
          return data;
        }

        if (filterObject.name === "Filter") {
          const { name, description, ...rest } = filterObject.value;

          return !description
            ? _.filter(data, {
                ...rest,
              }).filter(({ name: monsterName }: any) =>
                monsterName.includes(name)
              )
            : _.filter(data, {
                ...rest,
              })
                .filter(({ name: monsterName }: any) =>
                  monsterName.includes(name)
                )
                .filter(({ description: monsterDescription }: any) =>
                  monsterDescription.includes(description)
                );
        }
      },
    }
  );
}

export function useMonsterTypes() {
  return useQuery<any>(KEY, () => axios.get(MONSTER_URL), {
    select: ({ data }: any) => uniq(data.map(({ type }: Monster) => type)),
  });
}

export function useMonsterDifficulty() {
  return useQuery<any>(KEY, () => axios.get(MONSTER_URL), {
    select: ({ data }: any) =>
      uniq(data.map(({ difficulty }: Monster) => difficulty)),
  });
}
