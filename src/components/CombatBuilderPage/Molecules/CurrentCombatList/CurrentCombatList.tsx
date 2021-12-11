import {
  Button,
  ButtonGroup,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { find } from "lodash";
import React from "react";
import useMonsters from "../../../CombatTrackerPage/hooks/useMonsters";
export type Props = {
  monstersInCombat: string[];
  setMonstersInCombat: Function;
};
export default function CurrentCombatList({
  monstersInCombat,
  setMonstersInCombat,
}: Props) {
  const { data: monstersData, isLoading } = useMonsters({
    name: "",
    value: { name: "" },
  });

  return (
    <Grid>
      <List>
        {monstersInCombat.map((monsterKey, i) => {
          const monster = find(monstersData, { _id: monsterKey });
          return (
            <ListItem key={i}>
              <ListItemText primary={monster.name} />
              <ListItemSecondaryAction>
                <ButtonGroup>
                  <Button>Remove</Button>
                </ButtonGroup>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
}
