import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { EDIT_CHARACTER_URL } from "../../../api.config";
import {
  FETCH_CHARACTER_KEY,
  KEY,
} from "../../CharacterSheetPage/hooks/useCharacters";
import { useCharacterBuilderContext } from "../context/CharacterBuilderContext";
import { useParams } from "react-router-dom";

export default function useEditCharacter() {
  const { characterId } = useParams<any>();
  const queryClient = useQueryClient();
  const {
    name,
    party,
    turnType,
    activeCombat,
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
    languages,
    professions,
  } = useCharacterBuilderContext();

  const characterData = {
    name,
    partyId: party,
    turnType,
    activeCombat,
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
    languages,
    professions,
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
        queryClient.invalidateQueries([FETCH_CHARACTER_KEY, characterId]);
      },
    }
  );
}
