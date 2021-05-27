import { find, groupBy } from "lodash";
import { lengthIsZero } from "../../../utils/logic";
import { Characteristic } from "../../CharacterSheetPage/CharacterSheetPageTypes";
import { useCharacterBuilderContext } from "../context/CharacterBuilderContext";
import usePaths from "./usePaths";

export default function useCharacteristicList() {
  const { data: paths, isLoading } = usePaths();
  const {
    novicePath,
    expertPath,
    masterPath,
    level: selectedLevel,
  } = useCharacterBuilderContext();

  if (isLoading) {
    return {};
  }

  if (
    [novicePath, expertPath, masterPath].every((pathName) => pathName === "")
  ) {
    return {};
  }

  const characteristicsList = groupBy(
    [novicePath, expertPath, masterPath]
      .map((pathName: string) => {
        const path = find(paths, { name: pathName });

        return groupBy(
          path?.characteristics.filter(
            ({ level }: Characteristic) => level <= selectedLevel
          ),
          "name"
        );
      })
      .map((path) => Object.values(path).flat())
      .filter((list) => !lengthIsZero(list))
      .flat(),
    "name"
  );

  return characteristicsList;
}
