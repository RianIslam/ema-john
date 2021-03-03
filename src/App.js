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
import Inventory from './Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';


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
      <Route path="/inventory">
        <Inventory/>
      </Route>
      <Route exact path="/">
        <Shop/>
      </Route>
      <Route path="/:productKey">
        <ProductDetails/>
      </Route>
      <Route path="*">
        <NotFound/>
      </Route>
    </Switch>
    
    </Router>
      
    </div>
  );
}

export default App;
