import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  SwipeableDrawer,
  Switch,
  Grid,
} from "@material-ui/core";
import React from "react";
import ReactMarkdown from "react-markdown";
import useLongPress from "../../../hooks/useLongPress";
import useToggle from "../../../hooks/useToggle";
import { Expend, Talent } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import useUpdateExpendedList from "../../hooks/useUpdateExpendedList";
import useUpdateTemporaryEffects from "../../hooks/useUpdateTemporaryEffects";
import Button from "../../Shared/CustomButton";
import styled from "styled-components";
import { filter } from "lodash";
import useUpdateHealth from "../../hooks/useUpdateHealth";
import { useSnackbar } from "notistack";

export type Props = {
  action: Talent;
};

const HealButton = styled(Button)`
  background-color: green;
  color: white;
`;

export default function ActionListItem({ action }: Props): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();
  const { expended, temporaryEffects, healingRate } = useCharacterAttributes();
  const { open, toggleOpen } = useToggle();
  const toggleCheck = temporaryEffects.includes(action.name);

  const { mutate: updateExpendedList } = useUpdateExpendedList();
  const { mutate: updateTemporaryEffects } = useUpdateTemporaryEffects();
  const { mutate: updateHealth } = useUpdateHealth();

  const currentUses =
    action.uses - filter(expended, { name: action.name }).length;

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

  const onHealingButtonClick = (whatToExpend: string) => {
    if (currentUses !== 0) {
      updateHealth({ healthChangeAmount: -healingRate });
      updateExpendedList({
        whatToExpend,
        action: "add",
      });
    } else {
      enqueueSnackbar(
        {
          type: "error",
          errorMessage: `No ${action.name} uses left`,
        },
        { variant: "error" }
      );
    }
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

    () =>
      currentUses !== action.uses
        ? onCheckBoxChange(action.name, "add")
        : enqueueSnackbar(
            {
              type: "error",
              errorMessage: `No ${action.name} uses left`,
            },

            { variant: "error" }
          ),
    {
      shouldPreventDefault: true,
      delay: 500,
    }
  );

  const healingButtonLongPressEvent = useLongPress(
    () =>
      currentUses !== action.uses
        ? updateExpendedList({ whatToExpend: action.name, action: "remove" })
        : enqueueSnackbar(
            {
              type: "error",
              errorMessage: "Already at max uses!",
            },

            { variant: "error" }
          ),

    () => {
      window.navigator.vibrate(50);
      onHealingButtonClick(action.name);
    },
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
          {action.type === "heal" && (
            <HealButton {...healingButtonLongPressEvent}>
              Heal {healingRate}
              <span style={{ color: currentUses === 0 ? "red" : "" }}>
                ({currentUses})
              </span>
            </HealButton>
          )}
          {action.uses && action.uses !== 0 && action.type !== "heal" && (
            <Button {...longPressEvent}> {talentUses}</Button>
          )}
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
