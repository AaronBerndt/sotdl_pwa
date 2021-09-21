export type TurnType =
  | "Player Fast"
  | "Monster Fast"
  | "Player Slow"
  | "Monster Slow";

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
  maxHealth: Number;
};
export type Combatants = Combatant[];
