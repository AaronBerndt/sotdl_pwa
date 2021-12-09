import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { ATTACK_TARGET_URL } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";

type MutateProps = {
  targets: string[];
  temporaryEffectName: string;
};

export default function useeTemporaryEffectTarget() {
  const queryClient = useQueryClient();
  const { _id } = useCharacterAttributes();

  return useMutation(
    ({ temporaryEffectName, targets }: MutateProps) =>
      axios.post(ATTACK_TARGET_URL, {
        data: {
          temporaryEffectGiverId: _id,
          targets,
          temporaryEffectName,
        },
      }),
    {
      onSettled: () => {
        queryClient.invalidateQueries([FETCH_CHARACTER_KEY, _id]);
      },
    }
  );
}
