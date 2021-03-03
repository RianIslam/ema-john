import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Header/Shop/Shop';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';


function App() {
  return (
    <div>
    <Header/>
    <Router>
    <Switch>
      <Route path="/shop">
      <Shop/>
      </Route>
      <Route path="/review">
        <Review/>
      </Route>
    </Switch>
    
    </Router>
      
    </div>
  );
}

export default App;
