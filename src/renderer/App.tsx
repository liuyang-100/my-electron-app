import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from '../page/Home';
import Schema from '../page/SchemaNode';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/schema" Component={Schema} />
      </Routes>
    </Router>
  );
}
