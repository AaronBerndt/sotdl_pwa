import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { UPDATE_OVERRIDE_URL } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";
import { Override } from "../CharacterSheetPageTypes";

type MutateProps = {
  overrideToDelete: Override;
};

export default function useDeleteOverride() {
  const queryClient = useQueryClient();
  const { _id } = useCharacterAttributes();
  return useMutation(
    ({ overrideToDelete }) =>
      axios.post(UPDATE_OVERRIDE_URL, {
        data: {
          overrideToDelete,
          overrideType: overrideToDelete.name,
          overrideValue: overrideToDelete.value,
          action: "delete",
          _id,
        },
      }),
    {
      onMutate: async ({ overrideToDelete }: MutateProps) => {
        const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, _id];

        await queryClient.cancelQueries(CHARACTER_QUERY_KEY);

        const previousCharacterState: any = queryClient.getQueryData(
          CHARACTER_QUERY_KEY
        );

        console.log(previousCharacterState, CHARACTER_QUERY_KEY);

        const {
          characterState: { overrides, ...characterStateRest },
          ...rest
        } = previousCharacterState.data;

        const newCharacterState = {
          ...rest,
          characterState: {
            overrides: overrides.filter(
              ({ id }: Override) => id !== overrideToDelete.id
            ),

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

      onSettled: () => {
        queryClient.invalidateQueries([FETCH_CHARACTER_KEY, _id]);
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


