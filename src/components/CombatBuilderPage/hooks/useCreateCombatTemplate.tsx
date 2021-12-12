import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { CREATE_COMBAT_TEMPLATE_URL } from "../../../api.config";
import { KEY } from "../../CombatTrackerPage/hooks/useCombatTemplates";

export default function useCreateCombatTemplate() {
  const queryClient = useQueryClient();
  return useMutation(
    (values: any) => axios.post(CREATE_COMBAT_TEMPLATE_URL, values),
    {
      onSettled: () => {
        queryClient.invalidateQueries(KEY);
      },
    }
  );
}
