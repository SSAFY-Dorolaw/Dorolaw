import Footer from '../widgets/Footer';
import Header from '../widgets/Header';
import NavBar from '../widgets/NavBar';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-p1">
        <Header></Header>
        <NavBar></NavBar>
        <main className="grow">Main content...</main>
        <Footer></Footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
