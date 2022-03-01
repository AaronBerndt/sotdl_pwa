import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import {
  CREATE_COMBAT_TEMPLATE_URL,
  CREATE_COMBAT_URL,
} from "../../../api.config";
import { KEY } from "../../CombatTrackerPage/hooks/useCombats";

export default function useCreateCombat() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ partyId, combatTemplateId }: any) =>
      axios.post(CREATE_COMBAT_URL, {
        data: {
          partyId,
          combatTemplateId,
        },
      }),
    {
      onSettled: () => {
        queryClient.invalidateQueries(KEY);
      },
    }
  );
}
