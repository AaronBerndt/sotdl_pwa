import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { find, sum } from "lodash";
import React from "react";
import useMonsters from "../../../CombatTrackerPage/hooks/useMonsters";
export type Props = {
  monstersInCombat: string[];
  setMonstersInCombat: Function;
};
export default function DifficultyBox({
  monstersInCombat,
  setMonstersInCombat,
}: Props) {
  const { data: monstersData, isLoading } = useMonsters({
    name: "",
    value: { name: "" },
  });

  const difficultyTotal = sum(
    monstersInCombat.map((monsterId: string) => {
      const monster = find(monstersData, { _id: monsterId });
      return Number(monster.difficulty);
    })
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <List>
          <ListItem>
            <ListItemText primary={`Difficulty Total: ${difficultyTotal}`} />
            <ListItemSecondaryAction>
              <Button onClick={() => setMonstersInCombat([])}>Clear</Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}
