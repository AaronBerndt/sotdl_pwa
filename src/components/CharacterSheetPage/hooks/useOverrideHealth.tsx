import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { UPDATE_CHARACTER_HEALTH_URL } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { lengthIsZero } from "../../../utils/logic";
import { max } from "lodash";
import { Override } from "../CharacterSheetPageTypes";

type MutateProps = {
  characterId: string;
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
          characterState: { overrides, ...characterStateRest },
          ...rest
        } = previousCharacterState.data;

        const idArray: any = overrides.map(({ id }: Override) => id);
        const maxId: any = max(idArray);

        const newCharacterState = {
          ...rest,

          characterState: {
            overrides: [
              ...overrides,
              {
                id: lengthIsZero(overrides) ? 1 : maxId + 1,
                name: "Health",
                value: healthOveride,
              },
            ],
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
