import { find } from "lodash";
import { Talent } from "../../CharacterSheetPage/CharacterSheetPageTypes";
import { useCharacterBuilderContext } from "../context/CharacterBuilderContext";
import useAncestries from "./useAncestries";
import usePaths from "./usePaths";

const keyObject: any = {
  Warrior: "disciplines",
  Magician: "focuses",
  Priest: "faiths",
  Rogue: "knacks",
};

const talentName: any = {
  Warrior: "Discipline",
  Magician: "Tradition Focus",
  Priest: "Faith",
  Rogue: "Knack",
};

export default function useTalents() {
  const { data: paths, isLoading: pathsIsLoading } = usePaths();
  const { data: ancestrys, isLoading: ancestrysIsLoading } = useAncestries();

  const {
    ancestry,
    novicePath,
    expertPath,
    masterPath,
    choices,
    level: selectedLevel,
  } = useCharacterBuilderContext();

  if (pathsIsLoading || ancestrysIsLoading) {
    return { talentList: [], futureLevels: [] };
  }

  const isPastLife = find(choices, { name: "Past Life" });

  if (
    [ancestry, novicePath, expertPath, masterPath].every(
      (pathName) => pathName === ""
    )
  ) {
    return { talentList: [], futureLevels: [] };
  }

  const normalTalentList = [
    { name: ancestry, type: "ancestry" },
    { name: novicePath, type: "path" },
    { name: expertPath, type: "path" },
    { name: masterPath, type: "path" },
  ];

  const talentList = (futureLevels: boolean) =>
    [
      ...(isPastLife
        ? [...normalTalentList, { name: isPastLife.value, type: "ancestry" }]
        : normalTalentList),
    ]
      .filter((talentObject) => talentObject.name !== "")
      .map(({ name, type }) => {
        let object = find(type === "ancestry" ? ancestrys : paths, { name });

        if (
          name === novicePath &&
          novicePath !== "" &&
          choices.map(({ name }: any) => name).includes(talentName[novicePath])
        ) {
          const choiceObject = find(choices, {
            name: talentName[novicePath],
          });

          const subPathKey = keyObject[novicePath];

          const subPathData = find(object[subPathKey], {
            name: choiceObject.value,
          });

          object = subPathData;
        }

        const talents = object?.talents.filter(({ level }: Talent) =>
          futureLevels ? level > selectedLevel : level <= selectedLevel
        );
        return talents;
      })
      .flat()
      .filter((talent) => talent !== undefined);

  return { talentList: talentList(false), futureLevels: talentList(true) };
}
