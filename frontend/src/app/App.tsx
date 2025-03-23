import Header from '../widgets/Header';
import NavBar from '../widgets/NavBar';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Header></Header>
        <NavBar></NavBar>
      </div>
    </QueryClientProvider>
  );
}

export default App;
