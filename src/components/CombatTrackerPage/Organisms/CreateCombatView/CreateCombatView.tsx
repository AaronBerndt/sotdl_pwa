import { Grid, List, ListItem, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Monster } from "../../CombatTrackerPageTypes";
import useMonsters from "../../hooks/useMonsters";
export type Props = {
  sample: string;
};
export default function CreateCombatView({ sample }: Props) {
  const [combatName, setCombatName] = useState("");
  const [monstersInCombat, setMonstersInCombat] = useState<string[]>([]);
  const { data: monstersData, isLoading } = useMonsters({
    name: "",
    value: { name: "" },
  });

  if (isLoading) {
    return <p>...Loading</p>;
  }
  return (
    <Grid>
      <Grid item>
        <TextField
          label="Combat Name"
          variant="outlined"
          onChange={(e) => setCombatName(e.target.value)}
        />
      </Grid>
      <Grid item>
        <List>
          {monstersData.map((monster: Monster) => (
            <ListItem key={monster._id}>{monster.name}</ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
