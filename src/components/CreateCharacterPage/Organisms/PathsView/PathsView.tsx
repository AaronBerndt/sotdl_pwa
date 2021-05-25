import LevelSelector from "../../Atoms/LevelSelector/LevelSelector";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import usePaths from "../../hooks/usePaths";

export default function PathsView() {
  const { data: paths } = usePaths();
  const {
    novicePath,
    expertPath,
    masterPath,
    level,
  } = useCharacterBuilderContext();

  return (
    <>
      <LevelSelector />
      {level <= 1 && novicePath === "" ? "Please Select Novice" : <p></p>}
      {level <= 3 && expertPath === "" ? "Please Select Expert" : <p></p>}
      {level <= 7 && masterPath === "" ? "Please Select Master" : <p></p>}
    </>
  );
}
