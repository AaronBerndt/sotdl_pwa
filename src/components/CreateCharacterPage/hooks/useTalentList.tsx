import { find } from "lodash";
import { Talent } from "../../CharacterSheetPage/CharacterSheetPageTypes";
import { useCharacterBuilderContext } from "../context/CharacterBuilderContext";
import usePaths from "./usePaths";

export default function useTalents() {
  const { data: paths, isLoading } = usePaths();
  const {
    novicePath,
    expertPath,
    masterPath,
    level: selectedLevel,
  } = useCharacterBuilderContext();

  if (isLoading) {
    return [];
  }

  if (
    [novicePath, expertPath, masterPath].every((pathName) => pathName === "")
  ) {
    return [];
  }

  const talentList = [novicePath, expertPath, masterPath]
    .filter((pathName) => pathName !== "")
    .map((pathName: string) => {
      const path = find(paths, { name: pathName });
      console.log(path);

      const talents = path?.talents.filter(
        ({ level }: Talent) => level <= selectedLevel
      );
      return talents;
    })
    .flat();

  return talentList;
}
