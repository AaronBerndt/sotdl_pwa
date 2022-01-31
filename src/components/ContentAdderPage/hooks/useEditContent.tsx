import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import {
  EDIT_ANCESTRY_URL,
  EDIT_PATH_URL,
  EDIT_ITEM_URL,
  EDIT_SPELL_URL,
} from "../../../api.config";
import { KEY as ANCESTRIES_KEY } from "../../CreateCharacterPage/hooks/useAncestries";
import { KEY as SPELLS_KEY } from "../../CreateCharacterPage/hooks/useSpells";
import { KEY as EQUIPMENT_KEY } from "../../CreateCharacterPage/hooks/useEquipment";
import { KEY as PATHS_KEY } from "../../CreateCharacterPage/hooks/usePaths";

export default function useEditContent(formType: string) {
  const queryClient = useQueryClient();
  const editContentUrl: any = {
    ancestry: EDIT_ANCESTRY_URL,
    path: EDIT_PATH_URL,
    item: EDIT_ITEM_URL,
    spell: EDIT_SPELL_URL,
  };

  return useMutation(
    (values: any) =>
      axios.post(editContentUrl[formType], {
        data: { documents: values },
      }),
    {
      onSettled: () => {
        const keys: any = {
          ancestry: ANCESTRIES_KEY,
          path: PATHS_KEY,
          item: EQUIPMENT_KEY,
          spell: SPELLS_KEY,
        };

        queryClient.invalidateQueries(keys[formType]);
      },
    }
  );
}


