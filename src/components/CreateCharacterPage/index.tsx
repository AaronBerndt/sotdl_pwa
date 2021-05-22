import { AppBar, Grid } from "@material-ui/core";
import React from "react";
import Routes from "./CreateCharacterSheetPageRoutes";
import StepperFooter from "./Molecules/StepperFooter/StepperFooter";

export default function CreateCharacterPage() {
  return (
    <Grid>
      <AppBar>Hello</AppBar>
      <Routes />
      <StepperFooter />
    </Grid>
  );
}
