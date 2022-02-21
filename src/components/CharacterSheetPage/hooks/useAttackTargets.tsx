import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { ATTACK_TARGET_URL } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";
import { Targets } from "../CharacterSheetPageTypes";
import { useSnackbar } from "notistack";

type MutateProps = {
  targets: Targets;
  attackType: string;
  attackName: string;
  attackRoll: any;
  attributeTarget: string;
  totalBB?: number;
};

export default function useAttackTargets() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { _id } = useCharacterAttributes();
  return useMutation(
    ({
      targets,
      attackType,
      attackName,
      attackRoll,
      attributeTarget,
      totalBB,
    }: MutateProps) => {
      let alteredRoll = attackRoll;
      if (attackRoll.includes("B")) {
        const regex = /(.*)([+|-])(.*)B/;

        const regexResult: any = regex.exec(attackRoll);
        const modifier = Number(regexResult[1]);
        const isBoon = regexResult[2] === "+";

        alteredRoll = `${modifier}  ${isBoon ? "-" : "+"}${Number(totalBB)}B`;
      } else {
        alteredRoll =
          (totalBB ? totalBB : 0) > 0
            ? `${attackRoll}  ${
                Math.sign(totalBB ? totalBB : 0) === -1 ? "-" : "+"
              }${Number(totalBB)}B`
            : alteredRoll;
      }

      return axios.post(ATTACK_TARGET_URL, {
        data: {
          attackerId: _id,
          attackName,
          targets,
          attackType,
          attackRoll: alteredRoll,
          attributeTarget,
        },
      });
    },
    {
      onSuccess: ({ data }) => {
        const { attackName, attackDiceResult, d20Result, modifier, bbResult } =
          data[0];
        enqueueSnackbar({
          rollReason: attackName,
          rollType: "Attack",
          d20Result,
          modifier,
          bbResult,
          total: attackDiceResult,
          targets: data,
        });
      },

      onSettled: (data) => {
        queryClient.invalidateQueries([FETCH_CHARACTER_KEY, _id]);
      },
    }
  );
}
