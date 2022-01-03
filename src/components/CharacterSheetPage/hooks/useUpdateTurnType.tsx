import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { UPDATE_COMBATANT_TURN_TYPE_URL } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";

export default function useUpdateTurnType() {
  const queryClient = useQueryClient();
  const { _id, activeCombat } = useCharacterAttributes();

  return useMutation(
    () =>
      axios.post(UPDATE_COMBATANT_TURN_TYPE_URL, {
        data: { _id, type: "player", combatId: activeCombat },
      }),
    {
      onMutate: async () => {
        const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, _id];

        await queryClient.cancelQueries(CHARACTER_QUERY_KEY);

        const previousCharacterState: any =
          queryClient.getQueryData(CHARACTER_QUERY_KEY);

        const { turnType, ...rest } = previousCharacterState.data;

        const newCharacterState = {
          ...rest,
          turnType: turnType === "Fast" ? "Slow" : "Fast",
        };

        queryClient.setQueryData(CHARACTER_QUERY_KEY, {
          data: newCharacterState,
        });

        return {
          CHARACTER_QUERY_KEY,
          previousCharacterState,
          newCharacterState,
        };
      },

      onSettled: (data, error, variables, context) => {
        queryClient.invalidateQueries(context?.CHARACTER_QUERY_KEY);
      },
    }
  );
}
