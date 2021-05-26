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

export type PathType = "Novice" | "Expert" | "Master";

export type Path = {
  id: number;
  name: string;
  type: PathType;
  description: string;
  characteristics: Characteristics;
  talents: Talents;
};

export type Ancestries = Ancestry[];
export type Paths = Path[];