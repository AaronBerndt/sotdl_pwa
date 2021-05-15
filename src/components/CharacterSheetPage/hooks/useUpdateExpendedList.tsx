import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { UPDATE_CHARACTER_EXPENDED_LIST } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";
import { Expend } from "../CharacterSheetPageTypes";

type MutateProps = {
  whatToExpend: string;
  action: string;
};

export default function useUpdateExpendedList() {
  const queryClient = useQueryClient();
  const { id } = useCharacterAttributes();

  return useMutation(
    (values) => axios.post(UPDATE_CHARACTER_EXPENDED_LIST, values),
    {
      onMutate: async ({ whatToExpend, action }: MutateProps) => {
        const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, id];

        await queryClient.cancelQueries(CHARACTER_QUERY_KEY);

        const previousCharacterState: any = queryClient.getQueryData(
          CHARACTER_QUERY_KEY
        );

        const {
          characterState: { expended, ...characterStateRest },
          ...rest
        } = previousCharacterState.data;

        const newAfflictionsList =
          action === "add"
            ? [...expended, { name: whatToExpend }]
            : expended.splice(
                expended.indexOf(
                  (expendedObject: Expend) =>
                    expendedObject.name === whatToExpend
                ),
                1
              );

        const newCharacterState = {
          ...rest,
          characterState: {
            afflictions: newAfflictionsList,
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
