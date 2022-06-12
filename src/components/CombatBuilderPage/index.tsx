import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Grid,
  TextField,
} from "@material-ui/core";
import { find } from "lodash";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { Monster } from "../CombatTrackerPage/CombatTrackerPageTypes";
import useCreateCombatTemplate from "./hooks/useCreateCombatTemplate";
import CurrentCombatList from "./Molecules/CurrentCombatList/CurrentCombatList";
import DifficultyBox from "./Molecules/DifficultyBox/DifficultyBox";
import MonsterList from "./Molecules/MonsterList/MonsterList";
import MonsterViewer from "./Molecules/MonsterViewer/MonsterViewer";

export type MonsterInCombat = Monster & {
  amount: number;
};

const MonsterListView = ({ addMonsterButtonClick, setCurrentMonster }: any) => (
  <Grid container alignContent="center">
    <MonsterList
      addMonsterButtonClick={addMonsterButtonClick}
      selectMonster={setCurrentMonster}
    />
  </Grid>
);

const CombatSummaryView = ({
  setCombatName,
  combatName,
  createCombatTemplate,
  monstersInCombat,
  setMonstersInCombat,
}: any) => (
  <Grid container alignContent="center">
    <Grid item xs={12}>
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
    <Grid item xs={12}>
      <TextField
        onChange={(e: any) => setCombatName(e.target.value)}
        value={combatName}
      />
    </Grid>

    <Grid item xs={12}>
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
    </Grid>
  </Grid>
);

export default function CreateCombatPAge() {
  const [combatName, setCombatName] = useState("");
  const [currentMonster, setCurrentMonster] = useState(null);
  const [currentState, setCurrentState] = useState(0);
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
    <Grid container alignContent="center">
      <SwipeableViews
        index={currentState}
        enableMouseEvents
        onChangeIndex={(index) => {
          setCurrentState(index);
          window.scrollTo(0, 0);
        }}
      >
        <MonsterListView
          addMonsterButtonClick={addMonsterButtonClick}
          setCurrentMonster={setCurrentMonster}
        />
        <CombatSummaryView
          setCombatName={setCombatName}
          combatName={combatName}
          createCombatTemplate={createCombatTemplate}
          monstersInCombat={monstersInCombat}
          setMonstersInCombat={setMonstersInCombat}
        />
      </SwipeableViews>
    </Grid>
  );
}
