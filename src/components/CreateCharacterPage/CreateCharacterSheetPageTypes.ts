import {
  Characteristics,
  Talents,
} from "../CharacterSheetPage/CharacterSheetPageTypes";

export type Ancestry = {
  name: string;
  _id: number;
  description: string;
  characteristics: Characteristics;
  talents: Talents;
  detailChoices: DetailChoices;
  book: string;
};

export type PathType = "Novice" | "Expert" | "Master";

export type Path = {
  _id: number;
  name: string;
  type: PathType;
  description: string;
  characteristics: Characteristics;
  talents: Talents;
  detailChoices: DetailChoices;
  book: string;
};

export type Item = {
  id: number;
  name: string;
  description: string;
  itemType: string;
  price: string;
  availability: string;
  damage?: string;
  hands?: number;
  properties?: string[];
  equiped?: boolean;
  requirement?: number;
  value?: number;
};
export type Ancestries = Ancestry[];
export type Paths = Path[];
export type Equipment = Item[];
export type DetailChoices = DetailChoice[];
export type DetailChoice = {
  name: string;
  dice: string;
  origin: string;
  choices: string[];
};
