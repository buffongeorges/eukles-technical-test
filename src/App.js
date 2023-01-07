import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./components/Home";
import { Photos } from "./components/Photos";
import { Albums } from "./components/Albums";

function App() {
  return (
    <Router>
      <div className="App" style={{marginTop: '2rem', marginLeft: '2rem', marginRight: '2rem'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/albums/photos" element={<Photos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
