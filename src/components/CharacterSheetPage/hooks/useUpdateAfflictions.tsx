import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { UPDATE_CHARACTER_AFFLICTIONS } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";
import { CurrentAffliction } from "../CharacterSheetPageTypes";

type MutateProps = {
  afflictionName: string;
  action: string;
};

export default function useUpdateAfflications() {
  const queryClient = useQueryClient();
  const { _id } = useCharacterAttributes();

  return useMutation(
    (values) => axios.post(UPDATE_CHARACTER_AFFLICTIONS, { ...values, _id }),
    {
      onMutate: async ({ afflictionName, action }: MutateProps) => {
        const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, _id];

        await queryClient.cancelQueries(CHARACTER_QUERY_KEY);

        const previousCharacterState: any = queryClient.getQueryData(
          CHARACTER_QUERY_KEY
        );

        const {
          characterState: { afflictions, ...characterStateRest },
          ...rest
        } = previousCharacterState.data;

        const newAfflictionsList =
          action === "add"
            ? [...afflictions, { name: afflictionName }]
            : afflictions.length === 1 || afflictionName === "Fate Success"
            ? afflictions.filter(
                ({ name }: CurrentAffliction) => name !== afflictionName
              )
            : afflictions.splice(
                afflictions.indexOf(
                  (currentAffliction: CurrentAffliction) =>
                    currentAffliction.name === afflictionName
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
