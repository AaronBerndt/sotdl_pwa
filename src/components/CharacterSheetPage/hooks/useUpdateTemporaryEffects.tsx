import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { UPDATE_TEMPORARYEFFECTS_URL } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";

type MutateProps = {
  temporaryEffect: string;
  action: string;
};

export default function useUpdateTemporaryEffects() {
  const queryClient = useQueryClient();
  const { _id } = useCharacterAttributes();

  return useMutation(
    (values) => axios.post(UPDATE_TEMPORARYEFFECTS_URL, { ...values, _id }),
    {
      onMutate: async ({ temporaryEffect, action }: MutateProps) => {
        const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, _id];

        await queryClient.cancelQueries(CHARACTER_QUERY_KEY);

        const previousCharacterState: any = queryClient.getQueryData(
          CHARACTER_QUERY_KEY
        );

        const {
          characterState: { temporaryEffects, ...characterStateRest },
          ...rest
        } = previousCharacterState.data;

        const newtemporaryEffectsList =
          action === "add"
            ? [...temporaryEffects, temporaryEffect]
            : temporaryEffects.filter(
                (name: string) => name === temporaryEffect
              );

        const newCharacterState = {
          ...rest,
          characterState: {
            temporaryEffects: newtemporaryEffectsList,
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
    }
  );
}
