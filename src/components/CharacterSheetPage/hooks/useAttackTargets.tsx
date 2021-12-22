import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { ATTACK_TARGET_URL } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";
import { Targets } from "../CharacterSheetPageTypes";

type MutateProps = {
  targets: Targets;
  attackType: string;
  attackName: string;
  attackRoll: any;
  attributeTarget: string;
};

export default function useAttackTargets() {
  const queryClient = useQueryClient();
  const { _id } = useCharacterAttributes();
  return useMutation(
    ({
      targets,
      attackType,
      attackName,
      attackRoll,
      attributeTarget,
    }: MutateProps) =>
      axios.post(ATTACK_TARGET_URL, {
        data: {
          attackerId: _id,
          attackName,
          targets,
          attackType,
          attackRoll,
          attributeTarget,
        },
      }),
    {
      onSettled: () => {
        queryClient.invalidateQueries([FETCH_CHARACTER_KEY, _id]);
      },
    }
  );
}
