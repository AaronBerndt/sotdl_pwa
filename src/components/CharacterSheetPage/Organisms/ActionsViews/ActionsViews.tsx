import {
  Collapse,
  Grid,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React from "react";
import useToggle from "../../../hooks/useToggle";
import { Talent } from "../../CharacterSheetPageTypes";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import WeaponTable from "../../Molecules/WeaponTable/WeaponTable";
import { actionObject } from "./ActionObject";
import { find } from "lodash";
import ActionListItem from "../../Atoms/ActionListItem/ActionListItem";
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
            <ActionListItem action={action} />
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
            <ActionListItem action={action} />
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
            <ActionListItem action={action} />
          ))}
      </Collapse>
    </Grid>
  );
}
