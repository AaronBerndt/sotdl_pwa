import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import { useCharacterBuilderContext } from "../../context/CharacterBuilderContext";
export type Props = {
  sample: string;
};
export default function ProfessionsForm() {
  const { professions, setProfessions } = useCharacterBuilderContext();

  return (
    <Grid style={{ paddingTop: "5px" }}>
      {professions.map(
        (profession: { name: string; type: string }, i: number) => (
          <div key={i}>
            <Grid container style={{ paddingTop: "5px" }} xs={12}>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel htmlFor="age-native-simple">
                    Profession Type
                  </InputLabel>
                  <NativeSelect
                    value={profession.type}
                    onChange={(e) =>
                      setProfessions((prev: any[]) =>
                        prev.map((profession, professionIndex) => {
                          if (professionIndex === i) {
                            const { type, ...rest } = profession;
                            return { type: e.target.value, ...rest };
                          }
                          return profession;
                        })
                      )
                    }
                  >
                    {[
                      "",
                      "Academic",
                      "Common",
                      "Criminal",
                      "Martial",
                      "Religious",
                      "Wilderness",
                    ].map(
                      (professionName, key): JSX.Element => (
                        <option value={professionName} key={key}>
                          {professionName}
                        </option>
                      )
                    )}
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  name="Name"
                  label="Value"
                  defaultValue={profession.name}
                  value={profession.name}
                  onChange={(e) =>
                    setProfessions((prev: any[]) =>
                      prev.map((profession, professionIndex) => {
                        if (professionIndex === i) {
                          const { name, ...rest } = profession;
                          return { name: e.target.value, ...rest };
                        }
                        return profession;
                      })
                    )
                  }
                />
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant="contained"
                  onClick={() =>
                    setProfessions((prev: any[]) =>
                      prev.filter((_, professionIndex) => professionIndex === i)
                    )
                  }
                >
                  -
                </Button>
              </Grid>
            </Grid>
          </div>
        )
      )}
      <Button
        variant="contained"
        type="button"
        onClick={() =>
          setProfessions((prev: any[]) => [...prev, { name: "", type: "" }])
        }
      >
        Add a Profession
      </Button>
    </Grid>
  );
}
