import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import worker from "../src/mocks/index";
import { mockCharacter1 } from "../src/components/CharacterSheetPage/CharacterSheetPageMocks";
import { CharacterAttributesProvider } from "../src/components/CharacterSheetPage/context/CharacterAttributesContext";

import Hydrator from "../src/Hydrator";
import theme from "../src/theme";
worker.start();

const queryClient = new QueryClient();

const customViewports = {
  tablet: {
    name: "Kindle Fire 2",
    styles: {
      width: "600px",
      height: "963px",
    },
  },
  phone: {
    name: "Galaxy S9",
    styles: {
      width: "360px",
      height: "740px",
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: customViewports,

    defaultViewport: "Galaxy S9",
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Hydrator>
              <CharacterAttributesProvider character={mockCharacter1}>
                <div
                  style={{
                    background: "#303030",
                    color: "#fff",
                    height: "100%",
                  }}
                >
                  <Story />
                </div>
              </CharacterAttributesProvider>
            </Hydrator>
          </QueryClientProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  ),
];
