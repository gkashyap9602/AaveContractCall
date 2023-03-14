// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContext from "./context/MainContext";
import { Main } from "./Components/Main";
import { Ui } from "./Components/Ui Samples/Ui";
import { Uicopy } from "./Components/Ui Samples/Uicopy";
import { MainProvider } from "./context/MainContext";
import Redirect from "./Components/Redirect/Redirect";
import { CalculateApy } from "./Components/calculate Apy/CalculateApy";
function App() {
  return (
    <div className="App">
      <MainProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={[<Main />]} />
            {/* <Route path='/wire' element={[<Header  />,<WirePayment />,<Footer/>]} /> */}
            <Route path="/ui" element={<Ui />} />
            <Route path="/uicopy" element={<Uicopy />} />
            <Route path="/redirect" element={<Redirect />}></Route>
            <Route path="/pooldata" element={<CalculateApy />}></Route>
          </Routes>
        </Router>
      </MainProvider>
    </div>
  );
}

export default App;
