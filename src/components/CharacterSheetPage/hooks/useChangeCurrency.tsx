import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { UPDATE_CURRENCY_URL } from "../../../api.config";
import { FETCH_CHARACTER_KEY } from "./useCharacters";
import { Currency } from "../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../context/CharacterAttributesContext";

type MutateProps = {
  currencyChangeObject: Currency;

  action: "add" | "remove";
};

export default function useChangeCurrency() {
  const queryClient = useQueryClient();
  const { _id } = useCharacterAttributes();

  return useMutation((values) => axios.post(UPDATE_CURRENCY_URL, values), {
    onMutate: async ({ currencyChangeObject, action }: MutateProps) => {
      const CHARACTER_QUERY_KEY = [FETCH_CHARACTER_KEY, _id];

      await queryClient.cancelQueries(CHARACTER_QUERY_KEY);

      const previousCharacterState: any = queryClient.getQueryData(
        CHARACTER_QUERY_KEY
      );

      const {
        items: { currency: oldCurrencyObject, ...itemsRest },
        ...rest
      } = previousCharacterState.data;

      console.log(oldCurrencyObject, currencyChangeObject);
      const newCurrencyObject: Currency = {
        bits: Math.max(
          0,
          oldCurrencyObject.bits +
            (action === "add"
              ? currencyChangeObject.bits
              : -currencyChangeObject.bits)
        ),

        copper: Math.max(
          0,
          oldCurrencyObject.copper +
            (action === "add"
              ? currencyChangeObject.copper
              : -currencyChangeObject.copper)
        ),
        silver: Math.max(
          0,
          oldCurrencyObject.silver +
            (action === "add"
              ? currencyChangeObject.silver
              : -currencyChangeObject.silver)
        ),
        gold: Math.max(
          0,
          oldCurrencyObject.gold +
            (action === "add"
              ? currencyChangeObject.gold
              : -currencyChangeObject.gold)
        ),
      };

      const newCharacterState = {
        ...rest,

        items: {
          currency: newCurrencyObject,
          ...itemsRest,
        },
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
    /* onSuccess: async (data, _, context: any) => { */
    /*   queryClient.setQueryData( */
    /*     context?.CHARACTER_QUERY_KEY, */
    /*     context?.newCharacterState */
    /*   ); */
    /* }, */
    /* onError: async (data, _, context: any) => { */
    /*   if (context?.previousCharacterState) { */
    /*     queryClient.setQueryData( */
    /*       context?.CHARACTER_QUERY_KEY, */
    /*       context?.newCharacterState */
    /*     ); */
    /*   } */
    /* }, */
  });
}
