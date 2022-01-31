import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { CREATE_PARTY_URL } from "../../../api.config";
import { KEY } from "./useParties";

export default function useCreateParty() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ name, members }: { name: string; members: string[] }) =>
      axios.post(CREATE_PARTY_URL, {
        data: { documents: { name, members } },
      }),
    {
      onSettled: (values) => {
        queryClient.invalidateQueries(KEY);
      },
    }
  );
}


