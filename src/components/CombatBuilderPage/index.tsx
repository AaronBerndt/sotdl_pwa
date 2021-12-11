import { Card, CardHeader, Grid } from "@material-ui/core";
import React, { useState } from "react";
import useMonsters from "../CombatTrackerPage/hooks/useMonsters";
import CurrentCombatList from "./Molecules/CurrentCombatList/CurrentCombatList";
import DifficultyBox from "./Molecules/DifficultyBox/DifficultyBox";
import MonsterList from "./Molecules/MonsterList/MonsterList";

export default function CreateCombatPAge() {
  const [combatName, setCombatName] = useState("");
  const [monstersInCombat, setMonstersInCombat] = useState<string[]>([]);
  const { data: monstersData, isLoading } = useMonsters({
    name: "",
    value: { name: "" },
  });

  if (isLoading) {
    return <p>...Loading</p>;
  }

  const addMonsterButtonClick = (id: string) => {
    console.log(id);
    setMonstersInCombat((prev) => [...prev, id]);
  };

  return (
    <Grid>
      <Grid container>
        <Grid item xs={6}>
          <MonsterList addMonsterButtonClick={addMonsterButtonClick} />
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardHeader title="Combat Summary" />
            <DifficultyBox
              monstersInCombat={monstersInCombat}
              setMonstersInCombat={setMonstersInCombat}
            />
            <CurrentCombatList
              monstersInCombat={monstersInCombat}
              setMonstersInCombat={setMonstersInCombat}
            />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
