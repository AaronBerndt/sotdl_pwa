import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { DAMAGE_TARGET_URL } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";
import { Targets } from "../CharacterSheetPageTypes";
import { FETCH_PARTY_KEY } from "../../ManagePartiesPage/hooks/useParties";

type MutateProps = {
  targets: Targets;
  attackName: string;
  damageRoll: any;
};

export default function useDamageTargets() {
  const queryClient = useQueryClient();
  const { _id, partyId } = useCharacterAttributes();
  return useMutation(
    ({ targets, attackName, damageRoll }: MutateProps) =>
      axios.post(DAMAGE_TARGET_URL, {
        data: {
          attackerId: _id,
          attackName,
          targets,
          damageRoll,
        },
      }),
    {
      onSettled: () => {
        queryClient.invalidateQueries([FETCH_CHARACTER_KEY, _id]);
        queryClient.invalidateQueries([FETCH_PARTY_KEY, partyId]);
      },
    }
  );
}
