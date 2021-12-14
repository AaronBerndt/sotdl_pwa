import { createMuiTheme, ThemeOptions } from "@material-ui/core";

export const themeOptions: ThemeOptions = {
  palette: {
    type: "dark",
  },
};

const theme = createMuiTheme(themeOptions);

export default theme;
