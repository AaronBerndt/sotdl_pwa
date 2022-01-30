import { Collapse, Grid, List } from "@mui/material";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import useToggle from "../../../hooks/useToggle";
import { useCharacterAttributes } from "../../context/CharacterAttributesContext";
import WeaponTable from "../../Molecules/WeaponTable/WeaponTable";
import ActionListItem from "../../Atoms/ActionListItem/ActionListItem";
import React from "react";
import SpellListItem from "../../Atoms/SpellListItem/SpellListItem";
import { find } from "lodash";
export default function ActionsView(): JSX.Element {
  // const {
  //   open: attackActionsOpen,
  //   toggleOpen: toggleAttackActionsOpen,
  // } = useToggle();

  const {
    open: healingOrMoveActionsOpen,
    toggleOpen: toggleHealingOrMoveActionsOpen,
  } = useToggle();

  const {
    open: toggleActionsOpen,
    toggleOpen: toggleToggleActionsOpen,
  } = useToggle();

  const {
    open: triggeredActionsOpen,
    toggleOpen: toggleTriggeredActionsOpen,
  } = useToggle();

  const { talents, spells } = useCharacterAttributes();

  return (
    <Grid>
      <Grid item>Attacks</Grid>
      <WeaponTable />
      <List>
        {spells
          .filter(
            ({ type, attackRoll }: any) => type === "Attack" && attackRoll
          )
          .map((spell: any, i) => (
            <SpellListItem spell={spell} key={i} style={{}} />
          ))}
      </List>
      {talents.filter(({ type }: any) => type === "toggle").length !== 0 && (
        <>
          <Grid item onClick={() => toggleToggleActionsOpen()}>
            Toggles
            {healingOrMoveActionsOpen ? <ExpandLess /> : <ExpandMore />}
          </Grid>

          <Collapse in={!toggleActionsOpen} timeout="auto" unmountOnExit>
            <List>
              {talents
                .filter(({ type }: any) => type === "toggle")
                .map((action: any) => (
                  <ActionListItem action={action} />
                ))}
            </List>
          </Collapse>
        </>
      )}
      {talents.filter(({ type }: any) => type === "heal").length !== 0 && (
        <>
          <Grid item onClick={() => toggleHealingOrMoveActionsOpen()}>
            Healing Actions
            {healingOrMoveActionsOpen ? <ExpandLess /> : <ExpandMore />}
          </Grid>

          <Collapse in={!healingOrMoveActionsOpen} timeout="auto" unmountOnExit>
            <List>
              {talents
                .filter(({ type }: any) => type === "heal")
                .map((action: any) => (
                  <ActionListItem action={action} />
                ))}
            </List>{" "}
          </Collapse>
        </>
      )}
      {(talents.filter(({ description }: any) =>
        description.includes("triggered")
      ).length !== 0 ||
        spells.filter(({ properties }: any) =>
          find(properties, { name: "Triggered" })
        )) && (
        <>
          <Grid item onClick={() => toggleTriggeredActionsOpen()}>
            Triggered
            {triggeredActionsOpen ? <ExpandLess /> : <ExpandMore />}
          </Grid>
          <Collapse in={!triggeredActionsOpen} timeout="auto" unmountOnExit>
            <List>
              {talents
                .filter(({ description }: any) =>
                  description.includes("triggered")
                )
                .map((action: any) => (
                  <ActionListItem action={action} />
                ))}
            </List>
            <List>
              {spells
                .filter(({ properties }: any) =>
                  find(properties, { name: "Triggered" })
                )
                .map((spell: any, i) => (
                  <SpellListItem spell={spell} key={i} style={{}} />
                ))}
            </List>
          </Collapse>
        </>
      )}
    </Grid>
  );
}

