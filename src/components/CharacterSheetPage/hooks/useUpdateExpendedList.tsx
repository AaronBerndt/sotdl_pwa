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
  const { _id } = useCharacterAttributes();

  return useMutation(
    ({ action, whatToExpend }) =>
      axios.post(UPDATE_CHARACTER_EXPENDED_LIST, { _id, action, whatToExpend }),
    {
      onMutate: async ({ whatToExpend, action }: MutateProps) => {
        const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, _id];

        await queryClient.cancelQueries(CHARACTER_QUERY_KEY);

        const previousCharacterState: any = queryClient.getQueryData(
          CHARACTER_QUERY_KEY
        );

        const {
          characterState: { expended, ...characterStateRest },
          ...rest
        } = previousCharacterState.data;

        const newExpendedList =
          action === "add"
            ? [...expended, { name: whatToExpend }]
            : expended.length === 1
            ? expended.filter(({ name }: Expend) => name !== whatToExpend)
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
            expended: newExpendedList,
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
