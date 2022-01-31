export type Spells = Spell[];
export type Spell = {
  _id: string;
  name: string;
  tradition: Trandition;
  level: number;
  attribute: "Will" | "Intellect";
  damage?: string;
  type: "Attack" | "Utility";
  range: string;
  duration: string;
  description: string;
};

export type Trandition =
  | "Air"
  | "Alchemy"
  | "Alteration"
  | "Arcana"
  | "Battle"
  | "Celestial"
  | "Chaos"
  | "Conjuration"
  | "Curse"
  | "Death"
  | "Demonology"
  | "Destruction"
  | "Divination"
  | "Earth"
  | "Enchantment"
  | "Fey"
  | "Fire"
  | "Forbidden"
  | "Illusion"
  | "Invocation"
  | "Life"
  | "Metal"
  | "Nature"
  | "Necromancy"
  | "Order"
  | "Primal"
  | "Protection"
  | "Rune"
  | "Shadow"
  | "Soul"
  | "Spiritualism"
  | "Storm"
  | "Technomancy"
  | "Telekinesis"
  | "Telepathy"
  | "Teleportation"
  | "Theurgy"
  | "Time"
  | "Transformation"
  | "Water";

export type Tranditions = Trandition[];


