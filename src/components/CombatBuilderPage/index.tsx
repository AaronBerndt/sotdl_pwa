import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import { find } from "lodash";
import React, { useState } from "react";
import { Monster } from "../CombatTrackerPage/CombatTrackerPageTypes";
import useCreateCombatTemplate from "./hooks/useCreateCombatTemplate";
import CurrentCombatList from "./Molecules/CurrentCombatList/CurrentCombatList";
import DifficultyBox from "./Molecules/DifficultyBox/DifficultyBox";
import MonsterList from "./Molecules/MonsterList/MonsterList";
import MonsterViewer from "./Molecules/MonsterViewer/MonsterViewer";

export type MonsterInCombat = Monster & {
  amount: number;
};
export default function CreateCombatPAge() {
  const [combatName, setCombatName] = useState("");
  const [currentMonster, setCurrentMonster] = useState(null);
  const [monstersInCombat, setMonstersInCombat] = useState<MonsterInCombat[]>(
    []
  );
  const { mutate: createCombatTemplate } = useCreateCombatTemplate();

  const addMonsterButtonClick = (_id: string, monsterList: Monster[]) => {
    const monsterToAdd = find(monsterList, { _id });

    setMonstersInCombat((prev: any) =>
      prev.length === 0
        ? [{ ...monsterToAdd, amount: 1 }]
        : find(prev, { _id }) === undefined
        ? [...prev, { ...monsterToAdd, amount: 1 }]
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
          <MonsterList
            addMonsterButtonClick={addMonsterButtonClick}
            selectMonster={setCurrentMonster}
          />
        </Grid>

        <Grid container item xs={6} direction="column" spacing={2}>
          <Grid item>
            <Card>
              <CardActions>
                <TextField
                  onChange={(e: any) => setCombatName(e.target.value)}
                  value={combatName}
                />
                <Button
                  onClick={() =>
                    createCombatTemplate({
                      combatName,
                      monstersInCombat,
                    })
                  }
                >
                  Create Combat Template
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item>
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
          {currentMonster !== null && (
            <Grid item>
              <Card>
                <MonsterViewer selectMonster={currentMonster} />
              </Card>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

