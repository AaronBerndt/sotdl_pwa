import { useMutation, useQueryClient } from "react-query";
import { FULL_REST_URL } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";
import axios from "axios";

type MutationProps = {
  days: number;
};

export default function useFullRest() {
  const queryClient = useQueryClient();
  const { _id, health, damage, healingRate } = useCharacterAttributes();

  return useMutation(
    ({ days }: MutationProps) =>
      axios.post(FULL_REST_URL, {
        data: { days, _id, health, healingRate },
      }),
    {
      onMutate: async ({ days }: MutationProps) => {
        const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, _id];

        await queryClient.cancelQueries(CHARACTER_QUERY_KEY);

        const previousCharacterState: any = queryClient.getQueryData(
          CHARACTER_QUERY_KEY
        );

        const healingAmount = healingRate * days;

        const newDamage =
          damage + healingAmount > health
            ? health
            : damage + healingAmount < 0
            ? 0
            : damage + healingAmount;

        const {
          characterState: { overrides, ...characterStateRest },
          ...rest
        } = previousCharacterState.data;

        const newCharacterState = {
          ...rest,
          characterState: {
            afflictions: [],
            damage: newDamage,
            injured: (health - newDamage) / health <= 0.5,
            expended: [],
            temporaryEffects: [],
            overrides,
            ...characterStateRest,
          },
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
      /* onSuccess: async (data, _, context: any) => { */
      /*   queryClient.setQueryData( */
      /*     context?.CHARACTER_QUERY_KEY, */
      /*     context?.newCharacterState */
      /*   ); */
      /* }, */
      /* onError: async (data, _, context: any) => { */
      /*   if (context?.previousCharacterState) { */
      /*     queryClient.setQueryData( */
      /*       context?.CHARACTER_QUERY_KEY, */
      /*       context?.newCharacterState */
      /*     ); */
      /*   } */
      /* }, */
    }
  );
}
