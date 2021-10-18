import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { UPDATE_OVERRIDE_URL } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";
import { Override } from "../CharacterSheetPageTypes";
import { max } from "lodash";
import { lengthIsZero } from "../../../utils/logic";

type MutateProps = {
  overrides: [
    {
      overrideType: string;
      overrideValue: number;
      overridesId?: string;
    }
  ];
};

export default function useAddOverride() {
  const queryClient = useQueryClient();
  const { _id } = useCharacterAttributes();
  return useMutation(
    ({ overrides }) =>
      axios.post(UPDATE_OVERRIDE_URL, {
        data: {
          overrides,
          action: "add",
          _id,
        },
      }),
    {
      onMutate: async ({ overrides: overridesToAdd }: MutateProps) => {
        const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, _id];

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
              ...overridesToAdd.map(
                ({ overrideType, overrideValue, overridesId }) => ({
                  id: overridesId
                    ? overridesId
                    : lengthIsZero(overrides)
                    ? 1
                    : maxId + 1,
                  name: overrideType,
                  value: overrideValue,
                })
              ),
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
