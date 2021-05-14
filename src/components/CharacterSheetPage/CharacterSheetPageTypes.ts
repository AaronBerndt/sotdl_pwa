export type Character = {
  id: number;
  name: string;
  description: string;
  level: number;
  ancestry: string;
  novicePath: string;
  expertPath: string;
  masterPath: string;
  characteristics: Characteristics;
  talents: Talents;
  spells: Spells;
  items: Items;
  languages: string[];
  professions: Professions;
  characterState: CharacterState;
};

export type Characters = Character[];
export type CharacterState = {
  damage: number;
  expended: Expend[];
  override: Override[];
  afflictions: string[];
};
export type Profession = {
  name: string;
  type:
    | "Martial"
    | "Academic"
    | "Common"
    | "Criminal"
    | "Religious"
    | "Wilderness";
};

export type Professions = Profession[];
export type Expend = {
  name: string;
  uses: number;
};
export type Override = {
  name: string;
  value: number;
};

export type Characteristics = Characteristic[];
export type Characteristic = {
  name: string;
  value: number;
  level: number;
};

export type Talents = Talent[];
export type Talent = {
  name: string;
  description: string;
  level: number;
};

export type Spells = Spell[];
export type Spell = {
  name: string;

  tradition: Trandition;
  attribute: "Will" | "Intellect";
  type: "Attack" | "Utility";
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
  | "Eath"
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

export type Items = {
  weapons: Weapons;
  armor: Armor[];
  money: Money;
};

export type Weapons = Weapon[];
export type Weapon = {
  name: string;
  damage: string;
  hands: string;
  properties: string[];
  type: string;
  price: string;
  availability: string;
  equiped: boolean;
};

export type Armor = {
  name: string;
  value: number;
  type: string;
  price: string;
  availability: string;
  equiped: boolean;
  properties: string[];
};

export type Money = {
  bits: number;
  copper: number;
  silver: number;
  gold: number;
};

export type DiceRoll = {
  reason: string;
  type: "Damage" | "Challenge" | "Attack";
  result: string;
  withBoon?: boolean;
  witthBane?: boolean;
};

export type DiceRolls = DiceRoll[];
