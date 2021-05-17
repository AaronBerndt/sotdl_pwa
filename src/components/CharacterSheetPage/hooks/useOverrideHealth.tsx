import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { UPDATE_CHARACTER_HEALTH_URL } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";

type MutateProps = {
  characterId: number;
  healthOveride: number;
};

export default function useUpdateHealth() {
  const queryClient = useQueryClient();
  return useMutation(
    (values) => axios.post(UPDATE_CHARACTER_HEALTH_URL, values),
    {
      onMutate: async ({ characterId, healthOveride }: MutateProps) => {
        const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, characterId];

        await queryClient.cancelQueries(CHARACTER_QUERY_KEY);

        const previousCharacterState: any = queryClient.getQueryData(
          CHARACTER_QUERY_KEY
        );

        const {
          characterState: { override, ...characterStateRest },
          ...rest
        } = previousCharacterState.data;

        const newCharacterState = {
          ...rest,

          characterState: {
            override: [...override, { name: "Health", value: healthOveride }],
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
