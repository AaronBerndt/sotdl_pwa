import axios from "axios";
import { useMutation } from "react-query";
import {
  CREATE_ANCESTRY_URL,
  CREATE_ITEM_URL,
  CREATE_PATH_URL,
  CREATE_SPELL_URL,
} from "../../../api.config";

export default function useAddContent(formType: string) {
  const createContentUrl: any = {
    ancestry: CREATE_ANCESTRY_URL,
    path: CREATE_PATH_URL,
    item: CREATE_ITEM_URL,
    spell: CREATE_SPELL_URL,
  };

  return useMutation((values) =>
    axios.get(createContentUrl[formType], { data: values })
  );
}
