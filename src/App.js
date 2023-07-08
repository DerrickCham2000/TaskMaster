import { BrowserRouter, Route, Routes } from "react-router-dom";
//import { Switch } from "react-router"
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import Base from './Base';
import './App.css';

function App() {
  return (
  <div className="App">
    <Base>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Base>
  </div>
  );
}

export default App;
