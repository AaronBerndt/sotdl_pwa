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
    return { talentList: [], futureLevels: [] };
  }

  if (
    [novicePath, expertPath, masterPath].every((pathName) => pathName === "")
  ) {
    return { talentList: [], futureLevels: [] };
  }

  const talentList = (futureLevels: boolean) =>
    [novicePath, expertPath, masterPath]
      .filter((pathName) => pathName !== "")
      .map((pathName: string) => {
        const path = find(paths, { name: pathName });

        const talents = path?.talents.filter(({ level }: Talent) =>
          futureLevels ? level > selectedLevel : level <= selectedLevel
        );
        return talents;
      })
      .flat();

  return { talentList: talentList(false), futureLevels: talentList(true) };
}
