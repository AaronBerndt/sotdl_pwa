import { find } from "lodash";
import { Talent } from "../../CharacterSheetPage/CharacterSheetPageTypes";
import { useCharacterBuilderContext } from "../context/CharacterBuilderContext";
import useAncestries from "./useAncestries";
import usePaths from "./usePaths";

export default function useTalents() {
  const { data: paths, isLoading: pathsIsLoading } = usePaths();
  const { data: ancestrys, isLoading: ancestrysIsLoading } = useAncestries();

  const {
    ancestry,
    novicePath,
    expertPath,
    masterPath,
    level: selectedLevel,
  } = useCharacterBuilderContext();

  console.log(ancestry, novicePath, selectedLevel);
  if (pathsIsLoading || ancestrysIsLoading) {
    return { talentList: [], futureLevels: [] };
  }

  if (
    [ancestry, novicePath, expertPath, masterPath].every(
      (pathName) => pathName === ""
    )
  ) {
    return { talentList: [], futureLevels: [] };
  }

  const talentList = (futureLevels: boolean) =>
    [
      { name: ancestry, type: "ancestry" },
      { name: novicePath, type: "path" },
      { name: expertPath, type: "path" },
      { name: masterPath, type: "path" },
    ]
      .filter((talentObject) => talentObject.name !== "")
      .map(({ name, type }) => {
        const object = find(type === "ancestry" ? ancestrys : paths, { name });

        const talents = object?.talents.filter(({ level }: Talent) =>
          futureLevels ? level > selectedLevel : level <= selectedLevel
        );
        return talents;
      })
      .flat()
      .filter((talent) => talent !== undefined);

  return { talentList: talentList(false), futureLevels: talentList(true) };
}
