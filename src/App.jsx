import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AuthProvider from "./context/AuthContext";

export const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <AuthProvider>
        <Home />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
