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
  afflictions: CurrentAffliction[];
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

export type Item = {
  id: number;
  name: string;
  description: string;
  itemType: "basic" | "weapon" | "armor";
  price: string;
  availability: string;
};
export type Items = {
  weapons: Weapons;
  armor: Armor[];
  otherItems: Item[];
  currency: Currency;
};

export type Weapons = Weapon[];

export type Weapon = Item & {
  damage: string;
  hands: 1 | 2;
  properties: string[];
  type: string;
  requirement: number;
  equiped: boolean;
};

export type Armor = Item & {
  value: number;
  type: string;
  equiped: boolean;
  requirement: number;
  properties: string[];
};

export type Currency = {
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

export type CurrentAffliction = {
  name: string;
};

export type Affliction = {
  name: string;
  description: string;
};

export type CurrentAfflictions = CurrentAffliction[];
export type Afflictions = Affliction[];
