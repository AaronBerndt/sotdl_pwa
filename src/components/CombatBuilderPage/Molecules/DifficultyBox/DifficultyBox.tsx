import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  NativeSelect,
} from "@mui/material";
import { max, min, range, sum, upperCase } from "lodash";
import React, { useState } from "react";
import { MonsterInCombat } from "../..";
export type Props = {
  monstersInCombat: MonsterInCombat[];
  setMonstersInCombat: Function;
};
export default function DifficultyBox({
  monstersInCombat,
  setMonstersInCombat,
}: Props) {
  const [level, setLevel] = useState(0);
  const difficultyTotal = sum(
    monstersInCombat.map(
      (monster: MonsterInCombat) => Number(monster.difficulty) * monster.amount
    )
  );

  const createDangerObject = (
    easy: number[],
    average: number[],
    challenging: number[],
    hard: number[]
  ) => ({
    easy,
    average,
    challenging,
    hard,
  });

  const levelGroup =
    level < 1
      ? "Starting"
      : level < 3
      ? "Novice"
      : level < 7
      ? "Expert"
      : "Master";

  const createDifficultyObject: any = {
    Starting: createDangerObject(
      range(1, 4),
      range(4, 16),
      range(16, 31),
      range(31, 51)
    ),
    Novice: createDangerObject(
      range(1, 11),
      range(12, 31),
      range(31, 52),
      range(52)
    ),
    Expert: createDangerObject(
      range(1, 31),
      range(31, 51),
      range(51, 126),
      range(126)
    ),
    Master: createDangerObject(
      range(1, 51),
      range(51, 126),
      range(126, 202),
      range(202)
    ),
  };

  const difficultyObject = createDifficultyObject[levelGroup];

  const inDifficultyRange = (total: number, levelType: string) =>
    difficultyObject[levelType].includes(total);

  const difficultyLevel = inDifficultyRange(difficultyTotal, "easy")
    ? "Easy"
    : inDifficultyRange(difficultyTotal, "average")
    ? "Average"
    : inDifficultyRange(difficultyTotal, "challenging")
    ? "Challenging"
    : difficultyTotal === 0
    ? "None"
    : "Hard";

  return (
    <Grid container>
      <Grid item xs={12}>
        <List>
          <ListItem>
            <ListItemText primary={`Party Level`} />
            <ListItemSecondaryAction>
              <NativeSelect
                value={level}
                onChange={(e: any) => {
                  setLevel(e.target.value);
                }}
              >
                {[...Array(11).keys()].map(
                  (number, key): JSX.Element => (
                    <option value={number} key={key}>
                      {key}
                    </option>
                  )
                )}
              </NativeSelect>
            </ListItemSecondaryAction>
          </ListItem>
          {Object.entries(difficultyObject).map(([NAME, VALUE]: any) => (
            <ListItem>
              <ListItemSecondaryAction>{`${upperCase(NAME)}: ${min(
                VALUE
              )} - ${max(VALUE)}`}</ListItemSecondaryAction>
            </ListItem>
          ))}

          <ListItem>
            <ListItemText
              primary={`Difficulty Total: ${difficultyTotal}`}
              secondary={difficultyLevel}
            />
            <ListItemSecondaryAction>
              <Button onClick={() => setMonstersInCombat([])}>Clear</Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}


