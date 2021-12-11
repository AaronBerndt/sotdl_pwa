import { Card, CardHeader, Grid } from "@material-ui/core";
import { find } from "lodash";
import React, { useState } from "react";
import { Monster } from "../CombatTrackerPage/CombatTrackerPageTypes";
import useMonsters from "../CombatTrackerPage/hooks/useMonsters";
import CurrentCombatList from "./Molecules/CurrentCombatList/CurrentCombatList";
import DifficultyBox from "./Molecules/DifficultyBox/DifficultyBox";
import MonsterList from "./Molecules/MonsterList/MonsterList";

export type MonsterInCombat = Monster & {
  amount: number;
};
export default function CreateCombatPAge() {
  const [combatName, setCombatName] = useState("");
  const [monstersInCombat, setMonstersInCombat] = useState<MonsterInCombat[]>(
    []
  );

  const addMonsterButtonClick = (_id: string, monsterList: Monster[]) => {
    const monsterToAdd = find(monsterList, { _id });

    setMonstersInCombat((prev: any) =>
      prev.length === 0
        ? [{ ...monsterToAdd, amount: 1 }]
        : prev.map((monster: any) => {
            if (monster._id === _id) {
              const { amount, ...rest } = monster;

              return { ...rest, amount: amount + 1 };
            }
            return monster;
          })
    );
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
