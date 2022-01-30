import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { UPDATE_CHARACTER_HEALTH_URL } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";

type MutateProps = {
  healthChangeAmount: number;
};

export default function useUpdateHealth() {
  const queryClient = useQueryClient();
  const { health, _id } = useCharacterAttributes();

  return useMutation(
    ({ healthChangeAmount }) =>
      axios.post(UPDATE_CHARACTER_HEALTH_URL, {
        data: { healthChangeAmount, _id },
      }),
    {
      onMutate: async ({ healthChangeAmount }: MutateProps) => {
        const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, _id];

        await queryClient.cancelQueries(CHARACTER_QUERY_KEY);

        const previousCharacterState: any = queryClient.getQueryData(
          CHARACTER_QUERY_KEY
        );

        const {
          characterState: { damage, ...characterStateRest },
          ...rest
        } = previousCharacterState.data;

        const newDamage =
          damage + healthChangeAmount > health
            ? health
            : damage + healthChangeAmount < 0
            ? 0
            : damage + healthChangeAmount;

        const newCharacterState = {
          ...rest,

          characterState: {
            damage: newDamage,
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

      onSettled: (data, error, variables, context) => {
        queryClient.invalidateQueries(context?.CHARACTER_QUERY_KEY);
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

