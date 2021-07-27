export type Combat = {
  _id: string;
  combatants: Combatants;
  turnCount: number;
  currentRoundType:
    | "Player Fast"
    | "Monster Fast"
    | "Player Slow"
    | "Monster Slow";
};

export type Combats = Combat[];
export type Combatant = {
  _id: string;
  name: string;
  type: "Player" | "Monster" | "NPC";
};
export type Combatants = Combatant[];
