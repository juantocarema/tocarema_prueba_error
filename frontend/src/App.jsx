import { Outlet } from 'react-router-dom';
import BarraNav from './BarraNav/BarraNav';

function App() {
  return (
    <div>
      <BarraNav />

      <main className="container mt-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
