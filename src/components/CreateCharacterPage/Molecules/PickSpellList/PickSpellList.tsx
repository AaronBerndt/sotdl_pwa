import { List } from "@material-ui/core";
import { orderBy } from "lodash";
import { Spell } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import PickSpellItem from "../../Atoms/PickSpellItem/PickSpellItem";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import useSpells from "../../hooks/useSpells";
export default function PickSpellList() {
  const { traditions } = useCharacterBuilderContext();
  const { data: spells, isLoading } = useSpells({ name: "", value: "" });

  if (isLoading) {
    return <div>"Is Loading"</div>;
  }

  return (
    <>
      <List>
        {orderBy(
          spells.filter(({ tradition }: Spell) =>
            traditions.includes(tradition)
          ),
          ["level"],
          ["asc"]
        ).map((spell: Spell, i: number) => (
          <PickSpellItem spell={spell} key={i} />
        ))}
      </List>
    </>
  );
}
