import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { CREATE_CHARACTER_URL } from "../../../api.config";
import { KEY } from "../../CharacterSheetPage/hooks/useCharacters";

export default function useCreateChracter() {
  const queryClient = useQueryClient();
  return useMutation((values) => axios.put(CREATE_CHARACTER_URL, values), {
    onMutate: async (values) => {
      await queryClient.cancelQueries(KEY);
      /* const previousCharacterList: any = queryClient.getQueryData(KEY); */
    },
    onSettled: (values) => {},
  });
}
