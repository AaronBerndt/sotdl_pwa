import { createContext, useContext, useState } from "react";

const CharacterBuilderContext = createContext<any>({
  name: "",
  level: 0,
  setName: Function,
  setLevel: Function,
  novicePath: "",
  expertPath: "",
  masterPath: "",
  ancestry: "",
  setAncestry: Function,
  setPath: Function,
  spells: [],
  setSpells: Function,
  characteristics: [],
  setCharacteristics: Function,
  overides: [],
  setOverides: Function,
  pointsToSpend: 0,
  setPointsToSpend: Function,
  /* items: Items; */
});

export function CharacterBuilderProvider({ children, values }: any) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState(values?.level ? values.level : 0);
  const [novicePath, setNovicePath] = useState(
    values?.novicePath ? values.novicePath : ""
  );
  const [expertPath, setExpertPath] = useState(
    values?.expertPath ? values.expertPath : ""
  );
  const [masterPath, setMasterPath] = useState(
    values?.masterPath ? values.masterPath : 0
  );
  const [ancestry, setAncestry] = useState(
    values?.ancestry ? values.ancestry : 0
  );
  const [spells, setSpells] = useState([]);

  const setPath = (pathName: string, pathType: string) => {
    const setPathObject: any = {
      novice: () => setNovicePath(pathName),
      expert: () => setExpertPath(pathName),
      master: () => setMasterPath(pathName),
    };

    setPathObject[pathType.toLowerCase()]();
  };

  const [pointsToSpend, setPointsToSpend] = useState(
    level === 0 ? 0 : level >= 1 ? 2 : level >= 3 && level < 7 ? 4 : 7
  );

  return (
    <CharacterBuilderContext.Provider
      value={{
        name,
        setName,
        level,
        setLevel,
        novicePath,
        expertPath,
        masterPath,
        setPath,
        ancestry,
        setAncestry,
        spells,
        setSpells,
        pointsToSpend,
        setPointsToSpend,
      }}
    >
      {children}
    </CharacterBuilderContext.Provider>
  );
}

export function useCharacterBuilderContext() {
  return useContext(CharacterBuilderContext);
}
