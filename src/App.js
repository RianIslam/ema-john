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
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';

export const UserContext = createContext();

function App(props) {

  const [loggedInUser, setLoggedInUser] = useState({})



  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
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
      <Route path="/product/:productKey">
        <ProductDetails/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/shipment">
        <Shipment/>
      </Route>
      <Route path="*">
        <NotFound/>
      </Route>
    </Switch>
    
    </Router>
      
    </UserContext.Provider>
  );
}

export default App;
