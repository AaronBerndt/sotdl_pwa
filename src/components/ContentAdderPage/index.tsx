import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import FormTypeSelector from "./Atoms/FormTypeSelector/FormTypeSelector";
import AncestryForm from "./Organisms/AncestryForm/AncestryForm";

export default function ContentAdderPage() {
  const [formType, setFormType] = useState("ancestry");

  const formToRender: any = {
    ancestry: () => <AncestryForm />,
    path: () => <AncestryForm />,
    item: () => <AncestryForm />,
    spell: () => <AncestryForm />,
    default: () => null,
  };

  return (
    <Grid>
      <Grid item>
        <FormTypeSelector selectFormType={setFormType} />
      </Grid>
    </Grid>
  );
}
