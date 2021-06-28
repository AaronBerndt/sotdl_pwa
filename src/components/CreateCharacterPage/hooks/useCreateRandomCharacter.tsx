import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { CREATE_RANDOM_CHARACTER_URL } from "../../../api.config";
import { KEY } from "../../CharacterSheetPage/hooks/useCharacters";
import { useCharacterBuilderContext } from "../context/CharacterBuilderContext";

export default function useCreateChracter() {
  const queryClient = useQueryClient();
  const { level } = useCharacterBuilderContext();

  return useMutation(
    () =>
      axios.put(CREATE_RANDOM_CHARACTER_URL, {
        data: { level },
      }),
    {
      onSettled: (values) => {
        queryClient.invalidateQueries(KEY);
      },
    }
  );
}
