import {
  Button,
  ButtonGroup,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { find } from "lodash";
import React from "react";
import { MonsterInCombat } from "../..";
export type Props = {
  monstersInCombat: MonsterInCombat[];
  setMonstersInCombat: Function;
};
export default function CurrentCombatList({
  monstersInCombat,
  setMonstersInCombat,
}: Props) {
  const removeMonsterInCombat = (_id: string) => {
    const monsterToRemove: any = find(monstersInCombat, { _id });

    if (monsterToRemove.amount - 1 === 0) {
      setMonstersInCombat((prev: MonsterInCombat[]) =>
        prev.filter(({ _id: monsterId }) => monsterId !== _id)
      );
    } else {
      setMonstersInCombat((prev: MonsterInCombat[]) =>
        prev.map((monster) => {
          if (monster._id === _id) {
            const { amount, ...rest } = monster;

            return { ...rest, amount: amount - 1 };
          }
          return monster;
        })
      );
    }
  };
  const addMonsterInCombat = (_id: string) => {
    setMonstersInCombat((prev: MonsterInCombat[]) =>
      prev.map((monster) => {
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
      <List>
        {monstersInCombat.map((monster, i) => {
          return (
            <ListItem key={i}>
              <ListItemText primary={`${monster.name}: ${monster.amount}`} />
              <ListItemSecondaryAction>
                <ButtonGroup>
                  <Button onClick={() => addMonsterInCombat(monster._id)}>
                    +
                  </Button>
                  <Button onClick={() => removeMonsterInCombat(monster._id)}>
                    -
                  </Button>
                </ButtonGroup>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
}

