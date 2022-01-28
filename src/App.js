import logo from './logo.svg';
import Match from './components/match';
import Layout from './components/layout';
import Error
 from './components/error/error';
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import './App.css';

function App() {
  return <BrowserRouter>
   <Layout>
       <Routes>
          {/* <Navigate exact={true} from={"/"} to={"/home"}/> */}
          <Route path="/match" element={<Match />}/>
          <Route path="*" element={<Error />} />
       </Routes>
   </Layout>
 </BrowserRouter>
};

export default App;
