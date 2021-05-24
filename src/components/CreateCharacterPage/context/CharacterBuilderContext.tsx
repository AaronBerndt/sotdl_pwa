import { createContext, useContext, useState } from "react";

type CharacterBuilderContextObject = {
  name: string;
  level: number;
  setLevel: Function;
  setName: Function;
  novicePath: string;
  expertPath: string;
  masterPath: string;
  ancestry: string;
  setPath: Function;
  setAncestry: Function;
  spells: string[];
  setSpells: Function;
  /* items: Items; */
};

const CharacterBuilderContext = createContext<CharacterBuilderContextObject>({
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
  /* items: Items; */
});

export function CharacterBuilderProvider({ children }: any) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState(0);
  const [novicePath, setNovicePath] = useState("");
  const [expertPath, setExpertPath] = useState("");
  const [masterPath, setMasterPath] = useState("");
  const [ancestry, setAncestry] = useState("");
  const [spells, setSpells] = useState([]);

  const setPath = (pathName: string, pathType: string) => {
    const setPathObject: any = {
      novice: () => setNovicePath(pathName),
      expert: () => setExpertPath(pathName),
      master: () => setMasterPath(pathName),
    };

    setPathObject[pathType]();
  };

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
      }}
    >
      {children}
    </CharacterBuilderContext.Provider>
  );
}

export function useCharacterBuilderContext() {
  return useContext(CharacterBuilderContext);
}
