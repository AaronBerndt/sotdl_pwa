import { Button, Collapse, Grid, Typography } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React, { useState } from "react";
import { sumArray } from "../../../../utils/arrayUtils";
import { Talent } from "../../../CharacterSheetPage/CharacterSheetPageTypes";
import useToggle from "../../../hooks/useToggle";
import AttributeAccordion from "../../Atoms/AttributeAccordion/AttributeAccordion";
import ChoiceAccordion from "../../Atoms/ChoiceAccordion/ChoiceAccordion";
import ContentAccordion from "../../Atoms/ContentAccordion/ContentAccordion";
import LevelSelector from "../../Atoms/LevelSelector/LevelSelector";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
import { PathType } from "../../CreateCharacterSheetPageTypes";
import useCharacteristicList from "../../hooks/useCharacteristicsList";
import useTalentList from "../../hooks/useTalentList";
import AncestryList from "../../Molecules/AncestryList/AncestryList";
import AttributeAdjuster from "../../Molecules/AttributeAdjuster/AttributeAdjuster";
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

  const { ancestry } = useCharacterBuilderContext();
  const characteristicsList = useCharacteristicList();
  const { talentList, futureLevels } = useTalentList();
  const { open: talentsOpen, toggleOpen: toggleTalentsOpen } = useToggle();
  const {
    open: futureTalentsOpen,
    toggleOpen: toggleFutureTalentsOpen,
  } = useToggle();

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
          {ancestry && (
            <>
              <Grid justify="space-around">
                {[
                  "Strength",
                  "Agility",
                  "Will",
                  "Intellect",
                  "Speed",
                  "Corruption",
                  "Insanity",
                  "Power",
                  "Size",
                ].map((attribute: string) => (
                  <AttributeAdjuster label={attribute} />
                ))}
              </Grid>
            </>
          )}

          <Button onClick={() => toggleTalentsOpen()}>
            <Typography variant="h6">{`Talents(${talentList.length})`}</Typography>
            {talentsOpen ? <ExpandLess /> : <ExpandMore />}
          </Button>
          <Collapse in={!talentsOpen} timeout="auto" unmountOnExit>
            {talentList.map(
              (talent: Talent): JSX.Element =>
                talent.name === "Attributes Increase" ? (
                  <AttributeAccordion talent={talent} />
                ) : talent.choices !== undefined ? (
                  <ChoiceAccordion talent={talent} choicesRemains={true} />
                ) : talent.level === 4 ? (
                  <ChoiceAccordion talent={talent} choicesRemains={true} />
                ) : (
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
