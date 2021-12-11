import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { sum } from "lodash";
import React from "react";
import { MonsterInCombat } from "../..";
export type Props = {
  monstersInCombat: MonsterInCombat[];
  setMonstersInCombat: Function;
};
export default function DifficultyBox({
  monstersInCombat,
  setMonstersInCombat,
}: Props) {
  const difficultyTotal = sum(
    monstersInCombat.map(
      (monster: MonsterInCombat) => Number(monster.difficulty) * monster.amount
    )
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
