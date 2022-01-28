import logo from './logo.svg';
import Match from './components/match';
import Layout from './components/layout';
import Error
  from './components/error/error';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path="/matches" element={<Match />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  </BrowserRouter>
};

export default App;
