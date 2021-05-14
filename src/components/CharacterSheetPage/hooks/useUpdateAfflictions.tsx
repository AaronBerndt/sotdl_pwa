import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import {
  UPDATE_CHARACTER_AFFLICTIONS,
  UPDATE_CHARACTER_HEALTH_URL,
} from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";
import { CurrentAffliction } from "../CharacterSheetPageTypes";

type MutateProps = {
  afflictionName: string;
  action: "remove" | "add";
};

export default function useUpdateAfflications() {
  const queryClient = useQueryClient();
  const { id } = useCharacterAttributes();

  return useMutation(
    (values) => axios.post(UPDATE_CHARACTER_AFFLICTIONS, values),
    {
      onMutate: async ({ afflictionName: affliction, action }: MutateProps) => {
        const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, id];

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
            ? [...afflictions, { name: affliction }]
            : afflictions.splice(
                afflictions.indexOf(
                  ({ name }: CurrentAffliction) => name === affliction
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
