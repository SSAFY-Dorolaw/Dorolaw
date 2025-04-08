import { useEffect } from 'react';
import { initAOS } from './providers/aos';

const App = () => {
  useEffect(() => {
    initAOS();
  }, []);

  // return ();
};

export default App;
