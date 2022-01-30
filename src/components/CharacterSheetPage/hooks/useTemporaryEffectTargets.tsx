import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { TEMPORARYEFFECTS_TARGET_URL } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";

type MutateProps = {
  targets: string[];
  temporaryEffectName: string;
  duration: string;
};

export default function useTemporaryEffectTarget() {
  const queryClient = useQueryClient();
  const { _id } = useCharacterAttributes();

  return useMutation(
    ({ temporaryEffectName, targets, duration }: MutateProps) =>
      axios.post(TEMPORARYEFFECTS_TARGET_URL, {
        data: {
          temporaryEffectGiverId: _id,
          targets,
          temporaryEffectName,
          duration,
        },
      }),
    {
      onSettled: () => {
        queryClient.invalidateQueries([FETCH_CHARACTER_KEY, _id]);
      },
    }
  );
}

