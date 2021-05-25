import {
  Characteristics,
  Talents,
} from "../CharacterSheetPage/CharacterSheetPageTypes";

export type Ancestry = {
  name: string;
  id: number;
  description: string;
  characteristics: Characteristics;
  talents: Talents;
  book: string;
};

export type Path = {
  id: number;
  name: string;
  type: "novice" | "expert" | "master";
  description: string;
  characteristics: Characteristics;
  talents: Talents;
};

export type Ancestries = Ancestry[];
export type Paths = Path[];
