import { find, groupBy, mergeWith } from "lodash";
import { Characteristic } from "../../CharacterSheetPage/CharacterSheetPageTypes";
import { useCharacterBuilderContext } from "../context/CharacterBuilderContext";
import { Path } from "../CreateCharacterSheetPageTypes";
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

  const characteristicsList = [novicePath, expertPath, masterPath]
    .map((pathName: string) => {
      const path = find(paths, { name: pathName });

      return groupBy(
        path?.characteristics.filter(
          ({ level }: Characteristic) => level <= selectedLevel
        ),
        "name"
      );
    })
    .reduce((previousValue, currentValue, i) => {
      if (i === 0) {
        return { ...currentValue };
      }

      const previousValueKeys = Object.keys(previousValue);
      const currentValueKeys = Object.keys(currentValue);

      const newList = previousValueKeys.map((key) => {
        if (currentValueKeys.includes(key)) {
          return { ...currentValue[key], ...previousValue[key] };
        }

        return previousValue[key];
      });

      console.log(newList);
      return { ...previousValue, ...currentValue };
    }, {});

  return characteristicsList;
}
