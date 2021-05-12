import { QueryClient, QueryClientProvider } from "react-query";

import worker from "../src/mocks/index";
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
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  ),
];

