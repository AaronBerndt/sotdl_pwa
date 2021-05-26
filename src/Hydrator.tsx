import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { preFetchCharacters } from "./components/CharacterSheetPage/hooks/useCharacters";
import { preFetchAncestries } from "./components/CreateCharacterPage/hooks/useAncestries";
import { preFetchPaths } from "./components/CreateCharacterPage/hooks/usePaths";

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export default function Hydrator({ children }: Props) {
  const queryClient = useQueryClient();

  const hydrate = async () => {
    await Promise.all([
      preFetchPaths(queryClient),
      preFetchCharacters(queryClient),
      /* preFetchAncestries(queryClient), */
    ]);
  };

  useEffect(() => {
    hydrate();
  });

  return <div>{children}</div>;
}