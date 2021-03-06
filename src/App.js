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
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({})



  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
    <Header/>
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
      <PrivateRoute path="/shipment">
        <Shipment/>
      </PrivateRoute>
      <Route path="*">
        <NotFound/>
      </Route>
    </Switch>
    
    </Router>
      
    </UserContext.Provider>
  );
}

export default App;
