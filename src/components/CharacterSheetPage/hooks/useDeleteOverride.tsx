import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { UPDATE_OVERRIDE_URL } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";
import { Override } from "../CharacterSheetPageTypes";

type MutateProps = {
  overrides: [
    {
      name: string;
      value: number;
      id: string;
    }
  ];
};

export default function useDeleteOverride() {
  const queryClient = useQueryClient();
  const { id } = useCharacterAttributes();
  return useMutation(
    ({ overrides }) =>
      axios.post(UPDATE_OVERRIDE_URL, {
        data: {
          overrides,
          action: "delete",
        },
      }),
    {
      onMutate: async ({ overrides: overridesToDelete }: MutateProps) => {
        const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, id];

        await queryClient.cancelQueries(CHARACTER_QUERY_KEY);

        const previousCharacterState: any = queryClient.getQueryData(
          CHARACTER_QUERY_KEY
        );

        const {
          characterState: { overrides, ...characterStateRest },
          ...rest
        } = previousCharacterState.data;

        const newCharacterState = {
          ...rest,
          characterState: {
            overrides: overrides.filter(
              ({ id }: Override) =>
                !overridesToDelete.map(({ id }: Override) => id).includes(id)
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
