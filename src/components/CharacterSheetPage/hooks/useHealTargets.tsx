import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { HEAL_TARGET_URL } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";
import { FETCH_PARTY_KEY } from "../../ManagePartiesPage/hooks/useParties";
import { Targets } from "../CharacterSheetPageTypes";
import { useSnackbar } from "notistack";

type MutateProps = {
  targets: Targets;
  healingFactor: any;
};

export default function useHealTargets() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { _id, partyId } = useCharacterAttributes();
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
        queryClient.invalidateQueries([FETCH_PARTY_KEY, partyId]);

        enqueueSnackbar({
          rollType: "Healing",
        });
      },
    }
  );
}
