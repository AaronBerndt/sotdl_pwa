import { find, groupBy } from "lodash";
import { useRouteMatch } from "react-router-dom";
import { lengthIsZero } from "../../../utils/logic";
import { Characteristic } from "../../CharacterSheetPage/CharacterSheetPageTypes";
import { useCharacterBuilderContext } from "../context/CharacterBuilderContext";
import useAncestries from "./useAncestries";
import usePaths from "./usePaths";

export default function useCharacteristicList() {
  const { url } = useRouteMatch();
  const { data: paths, isLoading: pathsIsLoading } = usePaths();
  const { data: ancestrys, isLoading: ancestrysIsLoading } = useAncestries();

  const {
    ancestry,
    novicePath,
    expertPath,
    masterPath,
    level: selectedLevel,
    characteristics,
  } = useCharacterBuilderContext();

  if (pathsIsLoading || ancestrysIsLoading) {
    return {};
  }

  if (
    [ancestry, novicePath, expertPath, masterPath].every(
      (pathName) => pathName === ""
    )
  ) {
    return {};
  }

  const characteristicsList = groupBy(
    [
      { name: ancestry, type: "ancestry" },
      { name: novicePath, type: "path" },
      { name: expertPath, type: "path" },
      { name: masterPath, type: "path" },
    ]
      .map(({ name, type }: any) => {
        const object = find(type === "ancestry" ? ancestrys : paths, {
          name,
        });

        return groupBy(
          object?.characteristics.filter(
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
