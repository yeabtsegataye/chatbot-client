import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Chatpage from "./pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" Component={HomePage} />
        <Route extact path="/Chatpage" Component={Chatpage} />
      </Routes>
    </div>
  );
}

export default App;
