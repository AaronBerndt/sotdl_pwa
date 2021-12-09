import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { HEAL_TARGET_URL } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";

type MutateProps = {
  targets: string[];
  healingFactor: any;
};

export default function useHealTargets() {
  const queryClient = useQueryClient();
  const { _id } = useCharacterAttributes();
  return useMutation(
    ({ targets, healingFactor }: MutateProps) =>
      axios.post(HEAL_TARGET_URL, {
        data: {
          targets,
          healerId: _id,
          healingFactor,
        },
      }),
    {
      onSettled: () => {
        queryClient.invalidateQueries([FETCH_CHARACTER_KEY, _id]);
      },
    }
  );
}
