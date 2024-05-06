import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import Main from "./component/Main";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <Navbar />
          <Main />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;