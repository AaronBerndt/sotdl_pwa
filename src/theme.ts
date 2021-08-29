import { createMuiTheme } from "@material-ui/core";

import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";

export const themeOptions: ThemeOptions = {
  palette: {
    type: "dark",
  },
};

const theme = createMuiTheme(themeOptions);

export default theme;
