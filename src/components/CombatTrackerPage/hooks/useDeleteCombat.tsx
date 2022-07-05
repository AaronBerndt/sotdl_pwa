import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Combat } from "../CombatTrackerPageTypes";
import { DELETE_COMBAT_URL } from "../../../api.config";
import { KEY } from "./useCombats";

export default function useDeleteCombat() {
  const queryClient = useQueryClient();
  return useMutation(
    (combatId: string) => axios.delete(`${DELETE_COMBAT_URL}?_id=${combatId}`),
    {
      onMutate: async (combatId: string) => {
        console.log(combatId);
        await queryClient.cancelQueries(KEY);

        const previousCombats: any = queryClient.getQueryData(KEY);

        const newCombatList = previousCombats.data.filter(
          (combat: Combat) => combatId !== combat._id
        );

        queryClient.setQueryData(KEY, {
          data: newCombatList,
        });

        return {
          previousCombats,
        };
      },
      onSettled: async () => {
        queryClient.invalidateQueries(KEY);
      },
    }
  );
}
