import { createContext, useContext, useState } from "react";
import { Spell } from "../../CharacterSheetPage/CharacterSheetPageTypes";

const CharacterBuilderContext = createContext<any>({
  name: "",
  party: "",
  setParty: Function,
  activeCombat: "",
  level: 0,
  turnType: "Fast",
  setTurnType: Function,
  setName: Function,
  setLevel: Function,
  novicePath: "",
  expertPath: "",
  masterPath: "",
  ancestry: "",
  setAncestry: Function,
  setPath: Function,
  traditions: [],
  setTranditions: Function,
  spells: [],
  setSpells: Function,
  choice: [],
  setChoices: Function,
  characteristics: [],
  setCharacteristics: Function,
  items: [],
  setItems: Function,
  overrides: [],
  setOverrides: Function,
  detailChoices: [],
  setDetailChoices: Function,
  professions: [],
  setProfessions: Function,
  languages: [],
  setLanguages: Function,
  pointsToSpend: 0,
  setPointsToSpend: Function,
  currency: {
    bits: 0,
    copper: 0,
    silver: 0,
    gold: 0,
  },
});

export function CharacterBuilderProvider({ children, values }: any) {
  const [name, setName] = useState(values?.name ? values.name : "");
  const [party, setParty] = useState(values?.partyId ? values.partyId : "");
  const [turnType, setTurnType] = useState(
    values?.turnType ? values.turnType : "Fast"
  );

  const [activeCombat, setActiveCombat] = useState(
    values?.activeCombat ? values.activeCombat : ""
  );

  const [level, setLevel] = useState(values?.level ? values.level : 0);
  const [novicePath, setNovicePath] = useState(
    values?.novicePath ? values.novicePath : ""
  );
  const [expertPath, setExpertPath] = useState(
    values?.expertPath ? values.expertPath : ""
  );
  const [masterPath, setMasterPath] = useState(
    values?.masterPath ? values.masterPath : ""
  );
  const [ancestry, setAncestry] = useState(
    values?.ancestry ? values.ancestry : ""
  );
  const [spells, setSpells] = useState(
    values?.spells ? values.spells.map(({ name }: Spell) => name) : []
  );
  const [traditions, setTranditions] = useState(
    values?.traditions ? values.traditions : []
  );
  const [characteristics, setCharacteristics] = useState(
    values?.allCharacteristics ? values.allCharacteristics : []
  );

  const [professions, setProfessions] = useState(
    values?.professions ? values.professions : []
  );
  const [languages, setLanguages] = useState(
    values?.languages ? values.languages : []
  );
  const [choices, setChoices] = useState(values?.choices ? values.choices : []);
  const [items, setItems] = useState(
    values?.items ? [...values.items.weapons] : []
  );

  const [currency, setCurrency] = useState({
    bits: 0,
    copper: 0,
    silver: 0,
    gold: 0,
  });

  const [overrides, setOverrides] = useState(
    values?.characterState?.overrides ? values?.characterState?.overrides : []
  );

  const [detailChoices, setDetailChoices] = useState(
    values?.detailChoices ? values.detailChoices : []
  );

  const [details, setDetails] = useState(values?.details ? values.details : []);
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
        party,
        setParty,
        turnType,
        setTurnType,
        activeCombat,
        setActiveCombat,
        setName,
        level,
        setLevel,
        novicePath,
        expertPath,
        masterPath,
        setPath,
        ancestry,
        setAncestry,
        traditions,
        setTranditions,
        spells,
        setSpells,
        pointsToSpend,
        setPointsToSpend,
        characteristics,
        setCharacteristics,
        choices,
        setChoices,
        overrides,
        setOverrides,
        items,
        setItems,
        detailChoices,
        setDetailChoices,
        details,
        setDetails,
        currency,
        setCurrency,
        professions,
        setProfessions,
        languages,
        setLanguages,
      }}
    >
      {children}
    </CharacterBuilderContext.Provider>
  );
}

export function useCharacterBuilderContext() {
  return useContext(CharacterBuilderContext);
}

