import Grid from "@material-ui/core/Grid";
import CharacterNameTag from "./Atoms/CharacterNameTag/CharacterNameTag";
import ViewMenu from "./Atoms/ViewMenu/ViewMenu";
import { CharacterAttributesProvider } from "./context/CharacterAttributesContext";
import { useCharacter } from "./hooks/useCharacters";
import HealthWorkspaceModal from "./Molecules/HealthWorkspaceModal/HealthWorkspaceModal";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import Routes from "./CharacterSheetPageRoutes";
import AttributeBox from "./Atoms/AttributeBox/AttributeBox";
import DiceResultSnackbar from "./Atoms/DiceResultSnackbar/DiceResultSnackbar";
import { DiceRollerProvider } from "./context/DiceRollerContext";
import { SnackbarProvider } from "notistack";
import { GlobalModalProvider } from "./context/GlobalModal";
import { useDrag } from "react-use-gesture";
import { useSpring, animated } from "@react-spring/web";
import AfflictionsModal from "./Molecules/AfflictionsList/AfflictionModal";
import { useState } from "react";
import OverrideModal from "./Molecules/OverrideModal/OverrideModal";

export default function CharacterSheetPage(): JSX.Element {
  let { url } = useRouteMatch();
  const history = useHistory();
  const { characterId } = useParams<any>();
  const { data: characterData, isLoading } = useCharacter(characterId);

  const V_THRESHOLD = 0.3;

  const menu = ["Attributes", "Actions", "Magic", "Talents", "Equipment"];

  const [currentState, setCurrentState] = useState(0);
  const xPos = 0;
  const yPos = 0;
  const { x, y } = useSpring({ x: xPos * 300, y: yPos * 300 });
  const bind = useDrag(({ last, vxvy: [vx, vy] }) => {
    if (last) {
      // getting the swipe direction
      if (Math.abs(vx) > Math.abs(vy)) {
        let newState = 0;
        if (vx > V_THRESHOLD && xPos < 1) {
          if (currentState === 0) {
            setCurrentState(menu.length - 1);
            newState = menu.length - 1;
          } else {
            setCurrentState((prev) => prev - 1);
            newState = currentState - 1;
          }
        } else if (vx < -V_THRESHOLD && xPos > -1) {
          if (currentState === menu.length - 1) {
            setCurrentState(0);
          } else {
            setCurrentState((prev) => prev + 1);
            newState = currentState + 1;
          }
        }
        history.push(`${url}/${menu[newState].toLowerCase()}`);
      }
    }
  });

  return (
    <>
      {isLoading ? (
        <p>Is Loading....</p>
      ) : (
        <GlobalModalProvider>
          <SnackbarProvider maxSnack={3}>
            <DiceRollerProvider>
              <CharacterAttributesProvider character={characterData?.data}>
                <Grid container>
                  <Grid container>
                    <Grid item xs={9}>
                      <CharacterNameTag {...characterData?.data} />
                    </Grid>
                    <Grid item xs={3}>
                      <HealthWorkspaceModal character={characterData?.data} />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={9}>
                      <AfflictionsModal />
                      <OverrideModal />
                    </Grid>
                    <Grid item xs={3}>
                      <AttributeBox label="Defense" />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <ViewMenu
                      currentState={currentState}
                      menu={menu}
                      updateCurrentChoice={setCurrentState}
                    />
                  </Grid>
                </Grid>
                <Grid style={{ textAlign: "center" }}>
                  <animated.div {...bind()} style={{ x, y }}>
                    <Routes />
                  </animated.div>
                </Grid>
              </CharacterAttributesProvider>
              <DiceResultSnackbar />
            </DiceRollerProvider>
          </SnackbarProvider>
        </GlobalModalProvider>
      )}
    </>
  );
}
