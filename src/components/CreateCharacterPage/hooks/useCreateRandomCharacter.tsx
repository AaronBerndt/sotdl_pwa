import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { CREATE_RANDOM_CHARACTER_URL } from "../../../api.config";
import { KEY } from "../../CharacterSheetPage/hooks/useCharacters";

export default function useCreateChracter() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ level }: any) =>
      axios.put(CREATE_RANDOM_CHARACTER_URL, { data: { level } }),
    {
      onSettled: (values) => {
        queryClient.invalidateQueries(KEY);
      },
    }
  );
}


