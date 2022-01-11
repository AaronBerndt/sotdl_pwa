import {
  Characteristics,
  Talents,
} from "../CharacterSheetPage/CharacterSheetPageTypes";

export type TurnType =
  | "Player Fast"
  | "Monster Fast"
  | "Player Slow"
  | "Monster Slow"
  | "Acted";

export type CombatantType = "Player" | "Monster" | "NPC";

export type Combat = {
  _id: string;
  combatants: Combatants;
  turnCount: number;
  currentRoundType: TurnType;
};

export type Combats = Combat[];
export type Combatant = {
  _id: string;
  name: string;
  type: "Player" | "Monster" | "NPC";
  turnType: TurnType;
  currentHealth: Number;
  health: Number;
};
export type Combatants = Combatant[];

export type Monsters = Monster[];
export type Monster = {
  _id: string;
  name: string;
  type: string;
  difficulty: string;
  book: string;
  description: string;
  terror_level: string;
  characteristics: {
    Health: number;
    HealingRate: number;
    Perception: number;
    Defense: number;
    Speed: number;
    Strength: number;
    Agility: number;
    Intellect: number;
    Will: number;
    Insanity: number;
    Corruption: number;
    Power: number;
    Size: number;
  };
  traits: Talents;
  actions: Actions;
};

export type Actions = Action[];
export type Action = {
  name: string;
  range: "melee" | "range";
  type: "Attack" | "Special";
  damage: string;
  extra_effects: string;
  boons: number;
  banes: number;
};
