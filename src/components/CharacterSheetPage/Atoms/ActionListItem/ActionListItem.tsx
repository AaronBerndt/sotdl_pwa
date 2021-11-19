import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  SwipeableDrawer,
  Switch,
  Button as MuiButton,
  Grid,
} from "@material-ui/core";
import { find } from "lodash";
import React from "react";
import ReactMarkdown from "react-markdown";
import useLongPress from "../../../hooks/useLongPress";
import useToggle from "../../../hooks/useToggle";
import { Expend, Talent } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import useUpdateExpendedList from "../../hooks/useUpdateExpendedList";
import useUpdateTemporaryEffects from "../../hooks/useUpdateTemporaryEffects";
import Button from "../../Shared/CustomButton";
export type Props = {
  action: Talent;
};
export default function ActionListItem({ action }: Props): JSX.Element {
  const { expended, temporaryEffects } = useCharacterAttributes();
  const { open, toggleOpen } = useToggle();
  const checked = find(expended, { name: action.name }) ? true : false;
  const toggleCheck = find(temporaryEffects, { name: action.name })
    ? true
    : false;
  const { mutate: updateExpendedList } = useUpdateExpendedList();
  const { mutate: updateTemporaryEffects } = useUpdateTemporaryEffects();

  const onCheckBoxChange = (whatToExpend: string, action: "add" | "remove") => {
    updateExpendedList({
      whatToExpend,
      action,
    });
  };

  const onToggle = (temporaryEffect: string, action: "add" | "remove") => {
    updateTemporaryEffects({
      temporaryEffect,
      action,
    });
  };

  const talentUses = `
                ${Math.max(
                  0,
                  action.uses -
                    expended.filter(({ name }: Expend) => name === action.name)
                      .length
                )}
                /${action.uses}`;

  const longPressEvent = useLongPress(
    () => {
      window.navigator.vibrate(50);
      onCheckBoxChange(action.name, "remove");
    },

    () => onCheckBoxChange(action.name, "add"),
    {
      shouldPreventDefault: true,
      delay: 500,
    }
  );

  return (
    <>
      <ListItem button onClick={() => toggleOpen()}>
        <ListItemText primary={action.name} />
        <ListItemSecondaryAction>
          {action.type === "heal" && <MuiButton> Heal</MuiButton>}
          {action.uses && <Button {...longPressEvent}> {talentUses}</Button>}
          {action.type === "toggle" && (
            <Switch
              checked={toggleCheck}
              onClick={() =>
                onToggle(action.name, toggleCheck ? "remove" : "add")
              }
            />
          )}
        </ListItemSecondaryAction>
      </ListItem>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={() => toggleOpen()}
        onOpen={() => toggleOpen()}
        style={{ width: "240" }}
      >
        <Grid
          container
          alignItems="center"
          direction="column"
          style={{ padding: 20 }}
        >
          <Grid item style={{ padding: 20 }}>
            {action.name}
          </Grid>
          <Grid item style={{ padding: 20 }}>
            <ReactMarkdown children={action.description} />
          </Grid>
        </Grid>
      </SwipeableDrawer>
    </>
  );
}
