import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { EDIT_CHARACTER_URL } from "../../../api.config";
import { KEY } from "../../CharacterSheetPage/hooks/useCharacters";
import { useCharacterBuilderContext } from "../context/CharacterBuilderContext";
import { useParams } from "react-router-dom";

export default function useEditCharacter() {
  const { characterId } = useParams<any>();
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
      axios.put(EDIT_CHARACTER_URL, {
        data: { documents: characterData, _id: characterId },
      }),
    {
      onMutate: async (values) => {
        await queryClient.cancelQueries(KEY);
      },
      onSettled: (values) => {
        queryClient.invalidateQueries(KEY);
      },
    }
  );
}
