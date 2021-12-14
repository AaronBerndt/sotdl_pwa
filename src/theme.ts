import { createTheme, ThemeOptions } from "@material-ui/core";

export const themeOptions: ThemeOptions = {
  palette: {
    type: "dark",
  },
};

const theme = createTheme(themeOptions);

export default theme;
