import logo from './logo.svg';
import Layout from './components/layout';
import Error
  from './components/error/error';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import {Smatch}from './components/match/match'
import { EachMatch } from './components/match/eachMatch';
import { Splayer } from './components/player/player';
import { EachPlayer } from './components/player/eachPlayer';
import { SPointsTable} from './components/pointstable/pointstable';
import { EachYear} from './components/pointstable/eachYear';

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path="/matches" element={<Smatch />}>
          <Route path=":matchId" element={<EachMatch />} />
        </Route>
        <Route path="/players" element={<Splayer />}>
          <Route path=":playerId" element={<EachPlayer />} />
        </Route>
        <Route path="/pointstable" element={<SPointsTable/>}>
          <Route path=":year" element={<EachYear />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  </BrowserRouter>
};

export default App;
