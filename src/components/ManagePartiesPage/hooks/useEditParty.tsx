import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { CREATE_PARTY_URL } from "../../../api.config";
import { Party } from "../ManagePartiesPageTypes";
import { KEY } from "./useParties";

export default function useEditParty() {
  const queryClient = useQueryClient();

  return useMutation(
    (party: any) =>
      axios.put(CREATE_PARTY_URL, {
        data: { documents: party, _id: party._id },
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

