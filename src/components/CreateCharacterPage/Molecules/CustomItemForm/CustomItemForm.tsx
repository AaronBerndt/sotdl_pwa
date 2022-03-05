import { useState } from "react";
import { Button, NativeSelect, TextField } from "@material-ui/core";

import { Field, Form, Formik } from "formik";

export default function CustomItemForm() {
  const [currentItemType, setCurrentItemType] = useState("Other");

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: "",
        description: "",
        itemType: "Other",
        price: "5 ss",
        availability: "C",
      }}
      onSubmit={(values: any) => {
        console.log(values);
      }}
    >
      {(props: any) => (
        <Form>
          <Field
            component={TextField}
            name={`props.name`}
            label="Name"
            variant="standard"
            fullWidth
          />
          <Field
            component={TextField}
            name={`props.description`}
            label="Description"
            variant="standard"
            fullWidth
          />

          <Field
            name="itemType"
            placeholder="weapon"
            component={NativeSelect}
            onChange={(e: any) => {
              console.log(e.target.value);
            }}
          >
            {["Weapon", "Armor", "Other"].map(
              (name, key): JSX.Element => (
                <option value={name} key={key}>
                  {name}
                </option>
              )
            )}
          </Field>
          <Button type="submit">Add item</Button>
        </Form>
      )}
    </Formik>
  );
}
