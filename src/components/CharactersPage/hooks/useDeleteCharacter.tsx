import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { DELETE_CHARACTER_URL } from "../../../api.config";
import { Character } from "../../CharacterSheetPage/CharacterSheetPageTypes";
import { KEY } from "../../CharacterSheetPage/hooks/useCharacters";

export default function useDeleteCharacter() {
  const queryClient = useQueryClient();
  return useMutation(
    (characterToDelete: Character) =>
      axios.delete(`${DELETE_CHARACTER_URL}?_id=${characterToDelete._id}`),
    {
      onMutate: async (characterToDelete: Character) => {
        console.log(characterToDelete);
        await queryClient.cancelQueries(KEY);

        const previousCharacters: any = queryClient.getQueryData(KEY);

        const newCharacterList = previousCharacters.data.filter(
          ({ _id: characterId }: Character) =>
            characterId !== characterToDelete._id
        );

        queryClient.setQueryData(KEY, {
          data: newCharacterList,
        });

        return {
          KEY,
          previousCharacters,
        };
      },
      onSettled: async () => {
        queryClient.invalidateQueries(KEY);
      },
    }
  );
}
