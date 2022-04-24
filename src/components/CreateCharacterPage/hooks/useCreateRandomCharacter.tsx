import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { CREATE_RANDOM_CHARACTER_URL } from "../../../api.config";
import { KEY } from "../../CharacterSheetPage/hooks/useCharacters";
import { useAuth0 } from "@auth0/auth0-react";

export default function useCreateChracter() {
  const { user } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation(
    ({ level }: any) =>
      axios.put(CREATE_RANDOM_CHARACTER_URL, {
        data: { level, playerId: user?.sub },
      }),
    {
      onSettled: (values) => {
        queryClient.invalidateQueries(KEY);
      },
    }
  );
}
