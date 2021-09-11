import { Button, Collapse, Grid, Typography } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useState } from "react";
import { Talent } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import useToggle from "../../../hooks/useToggle";
import AttributeAccordion from "../../Atoms/AttributeAccordion/AttributeAccordion";
import ChoiceAccordion from "../../Atoms/ChoiceAccordion/ChoiceAccordion";
import ContentAccordion from "../../Atoms/ContentAccordion/ContentAccordion";
import LevelSelector from "../../Atoms/LevelSelector/LevelSelector";
import { PathType } from "../../CreateCharacterSheetPageTypes";
import useTalentList from "../../hooks/useTalentList";
import AncestryList from "../../Molecules/AncestryList/AncestryList";
import PathsList from "../../Molecules/PathsList/PathsList";
import AncestryView from "../AncestryView/AncestryView";
import PathsView from "../PathsView/PathsView";
export type Props = {
  sample: string;
};

export default function ChoiceView() {
  const {
    open: ancestryListOpen,
    toggleOpen: toggleAncestryListOpen,
  } = useToggle();

  const { open: pathListOpen, toggleOpen: togglePathListOpen } = useToggle();

  const [currentPathType, setCurrentPathType] = useState<PathType>("Novice");

  const { talentList, futureLevels } = useTalentList();

  const { open: talentsOpen, toggleOpen: toggleTalentsOpen } = useToggle();
  const { open: todoOpen, toggleOpen: toggleTodoOpen } = useToggle();
  const {
    open: futureTalentsOpen,
    toggleOpen: toggleFutureTalentsOpen,
  } = useToggle();

  const choicesList = talentList.filter(
    ({ name, description, level }: Talent) =>
      name === "Attributes Increase" ||
      description.includes("Choose") ||
      description.includes("Pick") ||
      level === 4
  );

  const others = talentList.filter(
    ({ name, description, level }: Talent) =>
      !(
        name === "Attributes Increase" ||
        description.includes("Choose") ||
        level === 4
      )
  );

  return (
    <Grid>
      <Grid>
        <LevelSelector />
      </Grid>
      {ancestryListOpen ? (
        <Grid container direction="column" alignItems="center">
          <Typography variant="h6">{`Select Ancestry`}</Typography>
          <AncestryList toggleClose={toggleAncestryListOpen} />
        </Grid>
      ) : pathListOpen ? (
        <Grid container direction="column" alignItems="center">
          <Typography variant="h6">{`${currentPathType} Path`}</Typography>
          <PathsList
            pathType={currentPathType}
            toggleClose={() => togglePathListOpen()}
          />
        </Grid>
      ) : (
        <Grid>
          <AncestryView toggleOpen={toggleAncestryListOpen} />
          <PathsView
            toggleOpen={togglePathListOpen}
            currentPathType={currentPathType}
            updateCurrentPathType={setCurrentPathType}
          />
        </Grid>
      )}
      {!ancestryListOpen && !pathListOpen && (
        <>
          <Typography variant="h6">Characteristics</Typography>
          <Button onClick={() => toggleTodoOpen()}>
            <Typography variant="h6">{`Todos(${choicesList.length})`}</Typography>
            {todoOpen ? <ExpandLess /> : <ExpandMore />}
          </Button>
          <Collapse in={!todoOpen} timeout="auto" unmountOnExit>
            {choicesList.map(
              (talent: Talent): JSX.Element =>
                talent.name === "Attributes Increase" ? (
                  <AttributeAccordion talent={talent} />
                ) : (
                  <ChoiceAccordion talent={talent} choicesRemains={true} />
                )
            )}
          </Collapse>
          <Button onClick={() => toggleTalentsOpen()}>
            <Typography variant="h6">{`Talents(${others.length})`}</Typography>
            {talentsOpen ? <ExpandLess /> : <ExpandMore />}
          </Button>
          <Collapse in={!talentsOpen} timeout="auto" unmountOnExit>
            {others.map(
              (talent: Talent): JSX.Element => (
                <ContentAccordion
                  defaultExpanded={false}
                  header={talent.name}
                  details={talent.description}
                />
              )
            )}
          </Collapse>
          {futureLevels.length !== 0 && (
            <>
              <Button onClick={() => toggleFutureTalentsOpen()}>
                <Typography variant="h6">{`Future Talents(${futureLevels.length})`}</Typography>
                {futureTalentsOpen ? <ExpandLess /> : <ExpandMore />}
              </Button>
              <Collapse in={futureTalentsOpen} timeout="auto" unmountOnExit>
                {futureLevels.map((talent: Talent) => (
                  <ContentAccordion
                    defaultExpanded={false}
                    header={talent.name}
                    details={talent.description}
                  />
                ))}
              </Collapse>
            </>
          )}
        </>
      )}
    </Grid>
  );
}
