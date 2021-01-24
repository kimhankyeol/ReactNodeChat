import './App.css';
import './custom.css';
import "antd/dist/antd.css";
import JoinRoom from "./components/JoinRoom/JoinRoom";
import Chat from "./components/Chat/Chat";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = ()=>{
  return(
    <Router>
      <Route path="/JoinRoom" exact component={JoinRoom} />
      <Route path="/JoinRoom/Chat" component={Chat} />
    </Router>
  )
  
}
export default App;
