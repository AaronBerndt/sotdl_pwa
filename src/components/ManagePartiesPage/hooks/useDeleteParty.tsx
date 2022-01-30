import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { CREATE_PARTY_URL } from "../../../api.config";
import { Party } from "../ManagePartiesPageTypes";
import { KEY } from "./useParties";

export default function useDeleteParty() {
  const queryClient = useQueryClient();

  return useMutation(
    (party: Party) =>
      axios.post(CREATE_PARTY_URL, {
        data: { _id: party._id },
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

