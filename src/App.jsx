import { Routes, Route } from 'react-router-dom';
import GaleneStore from './components/GaleneStore';
import AdminPage from './admin/AdminPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GaleneStore />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
