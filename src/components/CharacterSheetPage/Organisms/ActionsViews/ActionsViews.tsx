import {
  Collapse,
  Grid,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { CheckBox, ExpandLess, ExpandMore } from "@material-ui/icons";
import React from "react";
import useToggle from "../../../hooks/useToggle";
import { Talent } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import WeaponTable from "../../Molecules/WeaponTable/WeaponTable";
import { actionObject } from "./ActionObject";
export default function ActionsView(): JSX.Element {
  const {
    open: attackActionsOpen,
    toggleOpen: toggleAttackActionsOpen,
  } = useToggle();

  const {
    open: healingOrMoveActionsOpen,
    toggleOpen: toggleHealingOrMoveActionsOpen,
  } = useToggle();

  const {
    open: triggeredActionsOpen,
    toggleOpen: toggleTriggeredActionsOpen,
  } = useToggle();

  const { talents, expended } = useCharacterAttributes();
  const talentActionList = [
    ...actionObject,
    ...talents.filter(({ description }: Talent) =>
      description.includes("action")
    ),
  ];

  return (
    <Grid>
      <Grid item>Weapon</Grid>
      <WeaponTable />

      <Grid item onClick={() => toggleAttackActionsOpen()}>
        Attack Action
        {attackActionsOpen ? <ExpandLess /> : <ExpandMore />}
      </Grid>

      <Collapse in={!attackActionsOpen} timeout="auto" unmountOnExit>
        {talentActionList
          .filter(({ description }: any) => description.includes("attack"))
          .filter(({ description }: any) => !description.includes("triggered"))
          .filter(({ description }: any) => description.includes("make"))
          .map((action: any) => (
            <ListItem>
              <ListItemText
                primary={action.name}
                secondary={action.description}
              />
            </ListItem>
          ))}
      </Collapse>

      <Grid item onClick={() => toggleHealingOrMoveActionsOpen()}>
        Movement/Healing Action
        {healingOrMoveActionsOpen ? <ExpandLess /> : <ExpandMore />}
      </Grid>

      <Collapse in={!healingOrMoveActionsOpen} timeout="auto" unmountOnExit>
        {talentActionList
          .filter(({ description }: any) => !description.includes("make"))
          .map((action: any) => (
            <ListItem>
              <ListItemText
                primary={action.name}
                secondary={action.description}
              />
            </ListItem>
          ))}
      </Collapse>

      <Grid item onClick={() => toggleTriggeredActionsOpen()}>
        Triggered
        {triggeredActionsOpen ? <ExpandLess /> : <ExpandMore />}
      </Grid>

      <Collapse in={!triggeredActionsOpen} timeout="auto" unmountOnExit>
        {talentActionList
          .filter(({ description }: any) => description.includes("triggered"))
          .map((action: any) => (
            <ListItem>
              <ListItemText
                primary={action.name}
                secondary={action.description}
              />
              {action.description.includes("complete a rest") && (
                <ListItemSecondaryAction>
                  <CheckBox
                    checked={
                      find(expended, { name: action.name }) ? true : false
                    }
                  />
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
      </Collapse>
    </Grid>
  );
}
