import { DataGrid } from "../components/DataGrid/DataGrid";
import { PageContainer } from "../components/PageContainer/PageContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageContainer>
        <DataGrid />
      </PageContainer>
    </QueryClientProvider>
  );
};

export default App;
