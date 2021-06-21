import axios from "axios";
import { useMutation } from "react-query";
import {
  EDIT_ANCESTRY_URL,
  EDIT_PATH_URL,
  EDIT_ITEM_URL,
  EDIT_SPELL_URL,
} from "../../../api.config";

export default function useEditContent(formType: string) {
  const editContentUrl: any = {
    ancestry: EDIT_ANCESTRY_URL,
    path: EDIT_PATH_URL,
    item: EDIT_ITEM_URL,
    spell: EDIT_SPELL_URL,
  };

  return useMutation((values: any) =>
    axios.get(editContentUrl[formType], { data: values })
  );
}
