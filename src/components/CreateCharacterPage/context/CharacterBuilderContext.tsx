import { createContext, useContext, useState } from "react";

type CharacterBuilderContextObject = {
  name: string;
  setName: Function;
  novicePath: string;
  setNovicePath: Function;
  expertPath: string;
  setExpertPath: Function;
  masterPath: string;
  setMasterPath: Function;
  ancestry: string;
  setAncestry: Function;
  spells: string[];
  setSpells: Function;
  /* items: Items; */
};

const CharacterBuilderContext = createContext<CharacterBuilderContextObject>({
  name: "",
  setName: Function,
  novicePath: "",
  setNovicePath: Function,
  expertPath: "",
  setExpertPath: Function,
  masterPath: "",
  setMasterPath: Function,
  ancestry: "",
  setAncestry: Function,
  spells: [],
  setSpells: Function,
  /* items: Items; */
});

export function GlobalModalProvider({ children }: any) {
  const [name, setName] = useState("");
  const [novicePath, setNovicePath] = useState("");
  const [expertPath, setExpertPath] = useState("");
  const [masterPath, setMasterPath] = useState("");
  const [ancestry, setAncestry] = useState("");
  const [spells, setSpells] = useState([]);

  return (
    <CharacterBuilderContext.Provider
      value={{
        name,
        setName,
        novicePath,
        setNovicePath,
        expertPath,
        setExpertPath,
        masterPath,
        setMasterPath,
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
