import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { CREATE_CHARACTER_URL, CREATE_COMBAT_URL } from "../../../api.config";
import { KEY } from "../../CharacterSheetPage/hooks/useCharacters";
import { useAuth0 } from "@auth0/auth0-react";

export default function useCreateCombat() {
  const { user } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation(
    (combatToCreate) =>
      axios.put(CREATE_COMBAT_URL, {
        data: { documents: combatToCreate },
      }),
    {
      onSettled: (values) => {
        queryClient.invalidateQueries(KEY);
      },
    }
  );
}
