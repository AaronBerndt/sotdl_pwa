import CharacterNameTag from "./Atoms/CharacterNameTag/CharacterNameTag";
import ViewMenu from "./Atoms/ViewMenu/ViewMenu";
import { CharacterAttributesProvider } from "./context/CharacterAttributesContext";
import { useCharacter } from "./hooks/useCharacters";
import HealthWorkspaceModal from "./Molecules/HealthWorkspaceModal/HealthWorkspaceModal";
import { useHistory, useParams } from "react-router-dom";
import AttributeBox from "./Atoms/AttributeBox/AttributeBox";
import { DiceRollerProvider } from "./context/DiceRollerContext";
import { SnackbarProvider } from "notistack";
import { GlobalModalProvider } from "./context/GlobalModal";
import AfflictionsModal from "./Molecules/AfflictionsList/AfflictionModal";
import { useState } from "react";
import OverrideModal from "./Molecules/OverrideModal/OverrideModal";
import { Avatar, Button, Grid } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SnackbarContent from "./Atoms/SnackbarContent/SnackbarContent";
import SwipeableViews from "react-swipeable-views";
import ActionsView from "./Organisms/ActionsViews/ActionsViews";
import AttributesView from "./Organisms/AttributesView/AttributesView";
import DetailsView from "./Organisms/DetailsView/DetailsView";
import EquipmentView from "./Organisms/EquipmentView/EquipmentView";
import MagicView from "./Organisms/MagicView/MagicView";
import TalentsView from "./Organisms/TalentsView/TalentsView";

export default function CharacterSheetPage(): JSX.Element {
  const history = useHistory();
  const { characterId } = useParams<any>();

  const { data: characterData, isLoading } = useCharacter(characterId);

  const menu = [
    "Attributes",
    "Actions",
    "Magic",
    "Talents",
    "Equipment",
    "Details",
  ];

  const [currentState, setCurrentState] = useState(0);

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
                    <SwipeableViews
                      index={currentState}
                      enableMouseEvents
                      onChangeIndex={(index) => {
                        setCurrentState(index);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <AttributesView />
                      <ActionsView />
                      <MagicView />
                      <TalentsView />
                      <EquipmentView />
                      <DetailsView />
                    </SwipeableViews>
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
