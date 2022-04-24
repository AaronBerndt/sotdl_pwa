import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { DELETE_CHARACTER_URL } from "../../../api.config";
import { Character } from "../../CharacterSheetPage/CharacterSheetPageTypes";
import { KEY } from "../../CharacterSheetPage/hooks/useCharacters";

export default function useDeleteCharacter(playerId: string) {
  const queryClient = useQueryClient();
  return useMutation(
    (characterToDelete: Character) =>
      axios.delete(`${DELETE_CHARACTER_URL}?_id=${characterToDelete._id}`),
    {
      onMutate: async (characterToDelete: Character) => {
        const queryKey = [KEY, playerId];
        console.log(characterToDelete);
        await queryClient.cancelQueries(queryKey);

        const previousCharacters: any = queryClient.getQueryData(queryKey);

        const newCharacterList = previousCharacters.data.filter(
          ({ _id: characterId }: Character) =>
            characterId !== characterToDelete._id
        );

        queryClient.setQueryData(queryKey, {
          data: newCharacterList,
        });

        return {
          queryKey,
          previousCharacters,
        };
      },
      onSettled: async (_1, _2, _3, context) => {
        queryClient.invalidateQueries(context?.queryKey);
      },
    }
  );
}
