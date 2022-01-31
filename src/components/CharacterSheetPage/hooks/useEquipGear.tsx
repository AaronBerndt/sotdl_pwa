import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { UPDATE_GEAR_STATUS_URL } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";
import { Armor, Weapon } from "../CharacterSheetPageTypes";

type MutateProps = {
  itemToEdit: Weapon | Armor;
};

export default function useEquipGear() {
  const queryClient = useQueryClient();
  const { _id } = useCharacterAttributes();

  return useMutation(
    ({ itemToEdit }) => axios.post(UPDATE_GEAR_STATUS_URL, { _id, itemToEdit }),
    {
      onMutate: async ({ itemToEdit }: MutateProps) => {
        const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, _id];

        await queryClient.cancelQueries(CHARACTER_QUERY_KEY);

        const previousCharacterState: any = queryClient.getQueryData(
          CHARACTER_QUERY_KEY
        );

        const { items, ...rest } = previousCharacterState.data;

        const itemType = itemToEdit.itemType === "armor" ? "armor" : "weapons";

        const { [itemType]: itemList, ...itemRest } = items;
        const newItemArray = itemList.map((oldItem: Weapon | Armor) => {
          if (oldItem.id === itemToEdit.id) {
            const { equiped, ...rest } = oldItem;
            return { ...rest, equiped: !equiped };
          } else {
            if (itemType === "armor" && oldItem.equiped) {
              const { equiped, ...rest } = oldItem;
              return { ...rest, equiped: false };
            }
            return oldItem;
          }
        });

        const newCharacterState = {
          items: {
            [itemType]: newItemArray,
            ...itemRest,
          },
          ...rest,
        };

        queryClient.setQueryData(CHARACTER_QUERY_KEY, {
          data: newCharacterState,
        });

        return {
          CHARACTER_QUERY_KEY,
          previousCharacterState,
          newCharacterState,
        };
      },
      // onError: (context: any) => {
      //   queryClient.setQueryData(
      //     context?.CHARACTER_QUERY_KEY,
      //     context.previousCharacterState
      //   );
      // },
      onSettled: (data, error, variables, context) => {
        queryClient.invalidateQueries(context?.CHARACTER_QUERY_KEY);
      },
    }
  );
}


