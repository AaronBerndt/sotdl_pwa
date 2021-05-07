import {
  QueryClient,
  ReactQueryDevtools,
  QueryClientProvider,
} from "react-query";
import worker from "../src/mocks/index";
worker.start();

const queryClient = new QueryClient();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <Story />
      <ReactQueryDevtools />
    </QueryClientProvider>
  ),
];
