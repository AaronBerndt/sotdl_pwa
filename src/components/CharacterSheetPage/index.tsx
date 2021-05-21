import CharacterNameTag from "./Atoms/CharacterNameTag/CharacterNameTag";
import ViewMenu from "./Atoms/ViewMenu/ViewMenu";
import { CharacterAttributesProvider } from "./context/CharacterAttributesContext";
import { useCharacter } from "./hooks/useCharacters";
import HealthWorkspaceModal from "./Molecules/HealthWorkspaceModal/HealthWorkspaceModal";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import Routes from "./CharacterSheetPageRoutes";
import AttributeBox from "./Atoms/AttributeBox/AttributeBox";
import { DiceRollerProvider } from "./context/DiceRollerContext";
import { SnackbarProvider } from "notistack";
import { GlobalModalProvider } from "./context/GlobalModal";
import { useDrag } from "react-use-gesture";
import { useSpring, animated } from "@react-spring/web";
import AfflictionsModal from "./Molecules/AfflictionsList/AfflictionModal";
import React, { useState } from "react";
import OverrideModal from "./Molecules/OverrideModal/OverrideModal";
import { Avatar, Button, Grid } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SnackbarContent from "./Atoms/SnackbarContent/SnackbarContent";

export default function CharacterSheetPage(): JSX.Element {
  let { url } = useRouteMatch();
  const history = useHistory();
  const { characterId } = useParams<any>();
  const { data: characterData, isLoading } = useCharacter(characterId);

  const V_THRESHOLD = 0.3;

  const menu = [
    "Attributes",
    "Actions",
    "Magic",
    "Talents",
    "Equipment",
    "Details",
  ];

  const [currentState, setCurrentState] = useState(0);
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const { x, y } = useSpring({ x: xPos * 300, y: yPos * 300 });
  const bind = useDrag(({ last, vxvy: [vx, vy] }) => {
    if (last) {
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
          <SnackbarProvider
            maxSnack={3}
            content={(key, message) => {
              return <SnackbarContent message={message} key={key} />;
            }}
          >
            <DiceRollerProvider>
              <CharacterAttributesProvider character={characterData?.data}>
                <Grid container>
                  <Grid container item xs={8}>
                    <Grid item>
                      <Button onClick={() => history.push("/")}>
                        <ArrowBackIcon />
                      </Button>
                    </Grid>
                    <Grid item>
                      <CharacterNameTag {...characterData?.data} />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="column"
                    alignItems="flex-end"
                    xs={4}
                  >
                    <Grid item>
                      <HealthWorkspaceModal character={characterData?.data} />
                    </Grid>
                    <Grid item>
                      <AttributeBox label="Defense" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid container direction="column">
                    <Grid container justify="center" alignItems="center">
                      <Grid item>
                        <AfflictionsModal />
                      </Grid>
                      <Grid item>
                        <Avatar></Avatar>
                      </Grid>
                      <Grid item>
                        <OverrideModal />
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
                  <Grid style={{ textAlign: "center" }} alignItems="stretch">
                    <animated.div {...bind()} style={{ x, y }}>
                      <Routes />
                    </animated.div>
                  </Grid>
                </Grid>
              </CharacterAttributesProvider>
            </DiceRollerProvider>
          </SnackbarProvider>
        </GlobalModalProvider>
      )}
    </>
  );
}
