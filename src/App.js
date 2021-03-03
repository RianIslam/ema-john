import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Header/Shop/Shop';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div>
      <Header/>
      <Shop/>
    </div>
  );
}

export default App;
