import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './page/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
    </Router>
  );
}
