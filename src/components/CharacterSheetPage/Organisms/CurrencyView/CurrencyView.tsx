import {
  Button,
  ButtonGroup,
  Dialog,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import useToggle from "../../../hooks/useToggle";
import { Currency } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import useChangeCurrency from "../../hooks/useChangeCurrency";
export type Props = {
  sample: string;
};
export default function CurrencyView(): JSX.Element {
  const {
    items: { currency },
  } = useCharacterAttributes();

  const { open, toggleOpen } = useToggle();
  const [bitsAmount, setBitsAmount] = useState(0);
  const [copperAmount, setCopperAmount] = useState(0);
  const [silverAmount, setSilverAmount] = useState(0);
  const [goldAmount, setGoldAmount] = useState(0);

  const currencyArray = ["bits", "copper", "silver", "gold"];
  const { bits, copper, silver, gold } = currency;

  const createCurrencyObject = (
    abbreviation: string,
    currentValue: number,
    stateValue: number,
    onChangeFunction: Function
  ) => ({
    abbreviation,
    currentValue,
    stateValue,
    onChangeFunction,
  });
  const currencyObject: any = {
    bits: createCurrencyObject("b", bits, bitsAmount, setBitsAmount),
    copper: createCurrencyObject("cp", copper, copperAmount, setCopperAmount),
    silver: createCurrencyObject("ss", silver, silverAmount, setSilverAmount),
    gold: createCurrencyObject("gc", gold, goldAmount, setGoldAmount),
  };

  const currencyStateObject: Currency = {
    bits: bitsAmount,
    copper: copperAmount,
    silver: silverAmount,
    gold: goldAmount,
  };

  const totalSilver = bits / 10 / 10 + copper / 10 + silver + gold * 10;

  const { mutate: changeCurrency } = useChangeCurrency();

  const addCurrencyButtonClick = () => {
    changeCurrency({
      currencyChangeObject: currencyStateObject,
      action: "add",
    });
  };
  const removeCurrencyButtonClick = () => {
    changeCurrency({
      currencyChangeObject: currencyStateObject,
      action: "remove",
    });
  };

  return (
    <>
      <Dialog open={open} onClose={() => toggleOpen()}>
        <Grid>
          <List>
            <ListItemText primary={`Total Silver: ${totalSilver}`} />
            {currencyArray.map((currency, i) => (
              <ListItem key={i}>
                <ListItemText primary={currency} />
                <ListItemSecondaryAction>
                  {currencyObject[currency].currentValue}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Grid container justify="center">
            {currencyArray.map((currency, i) => (
              <Grid item>
                <TextField
                  label={currency}
                  id="standard-start-adornment"
                  size="small"
                  type="number"
                  value={currencyObject[currency].stateValue}
                  onChange={(e) => {
                    currencyObject[currency].onChangeFunction(
                      parseInt(e.target.value)
                    );
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {currencyObject[currency].abbreviation}
                      </InputAdornment>
                    ),
                  }}
                  key={i}
                />
              </Grid>
            ))}
            <ButtonGroup>
              <Button onClick={addCurrencyButtonClick}>Add</Button>
              <Button onClick={removeCurrencyButtonClick}>Remove</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Dialog>
      <Button
        variant="outlined"
        onClick={() => toggleOpen()}
      >{`b:${bits} cp:${copper} ss:${silver} gc:${gold}`}</Button>
    </>
  );
}

