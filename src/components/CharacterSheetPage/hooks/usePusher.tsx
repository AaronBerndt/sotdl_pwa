import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { usePusherContext } from "../../../context/PusherProivder";
import { useCharacter } from "./useCharacters";

export default function usePusher(characterId: string) {
  const { refetch } = useCharacter(characterId);
  const { enqueueSnackbar }: any = useSnackbar();

  const { channel } = usePusherContext();

  useEffect(() => {
    channel.bind(`Targeted with attack ${characterId}`, (data: any) => {
      enqueueSnackbar({
        ...data,
        rollType: "Attacked",
      });

      refetch();
    });

    channel.bind(`Targeted with damage ${characterId}`, (data: any) => {
      enqueueSnackbar({
        ...data,
        rollType: "Damaged",
      });
      refetch();
    });
    channel.bind(`Targeted with healing ${characterId}`, (data: any) => {
      enqueueSnackbar({
        rollType: "Healed",
        ...data,
      });
      refetch();
    });
    channel.bind(`Targeted with effect ${characterId}`, (data: any) => {
      enqueueSnackbar({
        ...data,
        rollType: "Effected",
      });
      refetch();
    });
  }, [channel, characterId, enqueueSnackbar, refetch]);
}
