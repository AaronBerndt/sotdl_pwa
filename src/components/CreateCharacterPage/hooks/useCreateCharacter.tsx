import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { CREATE_CHARACTER_URL } from "../../../api.config";
import { KEY } from "../../CharacterSheetPage/hooks/useCharacters";
import { useCharacterBuilderContext } from "../context/CharacterBuilderContext";

export default function useCreateChracter() {
  const queryClient = useQueryClient();
  const {
    name,
    level,
    novicePath,
    expertPath,
    masterPath,
    ancestry,
    traditions,
    spells,
    characteristics,
    choices,
    overrides,
    items,
    details,
    currency,
  } = useCharacterBuilderContext();

  const characterData = {
    name,
    level,
    novicePath,
    expertPath,
    masterPath,
    ancestry,
    traditions,
    spells,
    characteristics,
    choices,
    overrides,
    items,
    details,
    currency,
  };
  return useMutation(
    () =>
      axios.put(CREATE_CHARACTER_URL, {
        data: { documents: characterData },
      }),
    {
      onMutate: async (values) => {
        await queryClient.cancelQueries(KEY);
        console.log(characterData);
        /* const previousCharacterList: any = queryClient.getQueryData(KEY); */
      },
      onSettled: (values) => {
        queryClient.invalidateQueries(KEY);
      },
    }
  );
}
