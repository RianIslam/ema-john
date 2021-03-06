import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
    processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem";
import happyImage from "../../images/giphy.gif"
import { useHistory } from "react-router-dom";

const Review = () => {

    const [oederplaced, setOrderPlaced] = useState(false);
    const history = useHistory()
    const handleProceedCheckout = () =>{
        history.push('/shipment')
    }


  const [cart, setCart] = useState([]);

  const removeProduct = (productKey) => {
    console.log("removing", productKey);

    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch('https://pure-harbor-99045.herokuapp.com/productsByKeys',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))





    // const cartProducts = productKeys.map((key) => {
    //   const product = fakeData.find((pd) => pd.key === key);
    //   product.quantity = savedCart[key];
    //   return product;
    // });
    // setCart(cartProducts);
  }, []);

  let thankYou ;
  if(oederplaced) {
    thankYou = <img src={happyImage} alt=""/>
  }


  return (
    <div className="shop-container">
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItem
            key={pd.key}
            removeProduct={removeProduct}
            product={pd}
          ></ReviewItem>
        ))}
        {thankYou}
      </div>
      <div className="cart-cont">
          <Cart cart={cart}>
              <button onClick={handleProceedCheckout} className="main-btn">Proceed Checkout</button>

          </Cart>
      </div>
    </div>
  );
};

export default Review;
